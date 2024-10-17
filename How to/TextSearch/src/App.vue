<template>
  <div id="app">
    <button v-on:click="findTextBounds">FindTextBounds</button>
      <ejs-pdfviewer
        id="pdfViewer"
        ref="pdfviewer"
        :documentPath="documentPath"
        :resourceUrl="resourceUrl">
      </ejs-pdfviewer>
  </div>
</template>

<script>

import { PdfViewerComponent, Toolbar, Magnification, Navigation, 
         LinkAnnotation, BookmarkView, Annotation, ThumbnailView, 
         Print, TextSelection, TextSearch, FormFields, FormDesigner,PageOrganizer  } from '@syncfusion/ej2-vue-pdfviewer';


export default {
  name: 'App',
  components: {
    "ejs-pdfviewer": PdfViewerComponent
  },
  data () {
    return {
      resourceUrl:"https://cdn.syncfusion.com/ej2/27.1.48/dist/ej2-pdfviewer-lib",
      documentPath:"https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf"
    };
  },
  provide: {
    PdfViewer: [ Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, Annotation, 
                 ThumbnailView, Print, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer ]},

  methods: {
    findTextBounds: function () {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      // Find and get the bounds of a text
      console.log(viewer.textSearch.findText('adobe', false));
      // Find and get the bounds of a text on the desired page
      console.log(viewer.textSearch.findText('adobe', false, 7));
      // Find and get the bounds of the list of text
      console.log(viewer.textSearch.findText(['adobe', 'pdf'], false));
      // Find and get the bounds of the list of text on desired page
      console.log(viewer.textSearch.findText(['adobe', 'pdf'], false, 7));
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
