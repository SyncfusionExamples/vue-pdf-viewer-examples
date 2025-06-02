<template>
  <div id="app">
    <button v-on:click="toggleAnnotations">
      {{ annotationsVisible ? 'Hide Annotation' : 'Show Annotation' }}
    </button>
    <ejs-pdfviewer
      id="pdfViewer"
      ref="pdfviewer"
      :documentPath="documentPath"
      :serviceUrl="serviceUrl">
    </ejs-pdfviewer>
  </div>
</template>

<script>
import {PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, 
  ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer } from '@syncfusion/ej2-vue-pdfviewer';

export default {
  name: 'app',
  components: {
    'ejs-pdfviewer': PdfViewerComponent,
  },
  data() {
    return {
      documentPath: "Annotations.pdf",
      serviceUrl: "https://localhost:44309/pdfviewer",
      exportObject: "",
      annotationsVisible: true
    };
  },
  provide: {
    PdfViewer: [
      Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
      ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer
    ]
  },
  methods: {
    async toggleAnnotations() {
      const viewer = this.$refs.pdfviewer.ej2Instances;
      
      if (this.annotationsVisible) {
        // Hide annotations by exporting and deleting them
        try {
          const value = await viewer.exportAnnotationsAsObject();
          this.exportObject = JSON.stringify(value); // Convert object to string for later use
          
          const count = viewer.annotationCollection.length;
          for (let i = 0; i < count; i++) {
            // Always delete the first item as the collection shrinks
            viewer.annotationModule.deleteAnnotationById(viewer.annotationCollection[0].annotationId);
          }
          
          this.annotationsVisible = false;
        } catch (error) {
          console.error('Error hiding annotations:', error);
        }
      } else {
        // Restore annotations
        if (this.exportObject) {
          const parsedObject = JSON.parse(this.exportObject);
          viewer.importAnnotation(JSON.parse(parsedObject));
        }
        
        this.annotationsVisible = true;
      }
    }
  }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-pdfviewer/styles/material.css";
</style>