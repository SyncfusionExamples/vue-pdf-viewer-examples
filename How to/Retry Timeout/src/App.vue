<template>
  <div id="app">
    <ejs-pdfviewer
      id="pdfViewer"
      :documentPath="documentPath"
      :retryTimeout="retryTimeout" 
      :retryCount="retryCount" 
      :serviceUrl="serviceUrl">
    </ejs-pdfviewer>
  </div>
</template>

<script>
import Vue from 'vue';
import { PdfViewerPlugin, Toolbar, Magnification, Navigation, 
         Annotation, LinkAnnotation, BookmarkView, ThumbnailView, 
         Print, TextSelection, TextSearch, FormFields, FormDesigner } from '@syncfusion/ej2-vue-pdfviewer';
  Vue.use(PdfViewerPlugin);

  export default {
    name: 'app',
    data() {
      return {
        serviceUrl: "https://services.syncfusion.com/vue/production/api/pdfviewer",
        documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
        retryTimeout : 10,
        retryCount : 10
      };
    },

    provide: {
    PdfViewer: [ Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, 
                 Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields ]},
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
