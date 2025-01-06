<template>
  <div id="app">
    <button v-on:click="ExportAsJson">ExportAsJson</button>
    <button v-on:click="ExportAsXfdf">ExportAsXfdf</button>
    <button v-on:click="ExportAsObject">ExportAsObject</button>
    <button v-on:click="Import">Import</button>
    <ejs-pdfviewer
      id="pdfViewer"
      ref="pdfviewer"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl"
    >
    </ejs-pdfviewer>
  </div>
</template>

<script>
import { PdfViewerComponent, Toolbar, Magnification, Navigation, 
         LinkAnnotation, BookmarkView, Annotation, ThumbnailView, 
         Print, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer  } 
from '@syncfusion/ej2-vue-pdfviewer';
var exportObject;
export default {
  name: 'App',
  components: {
    "ejs-pdfviewer": PdfViewerComponent
  },

  data () {
    return {
      resourceUrl: "https://cdn.syncfusion.com/ej2/28.1.33/dist/ej2-pdfviewer-lib",
      documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
    };
  },
  
  provide: {
    PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, Annotation, 
                ThumbnailView, Print, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer ]
  },

  methods: {
    // export the annotation in JSON format.
    ExportAsJson: function() {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      viewer.exportAnnotation('Json');
    },

    // export the annotation in XFDF format.
    ExportAsXfdf: function() {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      viewer.exportAnnotation('Xfdf');
    },

    // export the annotation as object.
    ExportAsObject: function() {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      return viewer.exportAnnotationsAsObject().then((value) => {
        exportObject = value;
      });
    },

    //Import annotation that are exported as object.
    Import: function() {
      var viewer = this.$refs.pdfviewer.ej2Instances;
        viewer.importAnnotation(JSON.parse(exportObject));
    }

  }
}
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
