<template>
  <div id="app">
    <button id="hideBtn" v-on:click="hideAnnotations">Hide Annotations</button>
    <button id="unhideBtn" v-on:click="unhideAnnotations">Show Annotations</button>
    <ejs-pdfviewer
      id="pdfViewer"
      ref="pdfviewer"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl">
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
      documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
      resourceUrl: "https://cdn.syncfusion.com/ej2/30.1.37/dist/ej2-pdfviewer-lib",
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
    async hideAnnotations() {
      const viewer = this.$refs.pdfviewer.ej2Instances;
      
      try {
        const value = await viewer.exportAnnotationsAsObject();
        this.exportObject = JSON.stringify(value); // Convert object to string for later use
        viewer.deleteAnnotations();
      } catch (error) {
        console.error('Error hiding annotations:', error);
      }
    },
    
    unhideAnnotations() {
      const viewer = this.$refs.pdfviewer.ej2Instances;
      
      if (this.exportObject) {
        const parsedObject = JSON.parse(this.exportObject);
        viewer.importAnnotation(JSON.parse(parsedObject));
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