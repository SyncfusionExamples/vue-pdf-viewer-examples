<template>
  <div id="app">
  <button v-on:click="extractPage">Extract Page</button>
      <ejs-pdfviewer
          id="pdfViewer"
          ref="pdfviewer"
          :resourceUrl="resourceUrl"
          :documentPath="documentPath"
          :pageOrganizerSettings="pageOrganizerSettings">
      </ejs-pdfviewer>
  </div>
</template>
<script>
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation,
          BookmarkView, Annotation, ThumbnailView, Print, TextSelection,
          TextSearch, FormFields, FormDesigner, PageOrganizer } from '@syncfusion/ej2-vue-pdfviewer';
export default {
  name: 'app',
  components: {
      "ejs-pdfviewer": PdfViewerComponent
    },
  data () {
    return {
      resourceUrl:"https://cdn.syncfusion.com/ej2/31.1.23/dist/ej2-pdfviewer-lib",
      documentPath:"https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
      pageOrganizerSettings: {canExtractPages: true}
    };
  },
  methods: {
    extractPage: function() {
     const viewer = this.$refs.pdfviewer.ej2Instances;
     //Extract Pages 1 and 2
      const array = viewer.extractPages('1,2');
      //Load extracted Pages
      viewer.load(array,'');
      //Print Base64 to ensure pages are extracted
      console.log(array);
    }
  },

  provide: {
    PdfViewer: [ Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView,
                 Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer ]},

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
