<template>
  <div id="app">
      <ejs-pdfviewer
        id="pdfViewer"
        ref="pdfviewer"
        :documentPath="documentPath"
        :documentLoad="documentLoad"
        :resourceUrl="resourceUrl">
      </ejs-pdfviewer>
  </div>
</template>

<script>
import Vue from 'vue';
import { PdfViewerPlugin, Toolbar, Magnification, Navigation, 
         LinkAnnotation, BookmarkView, Annotation, ThumbnailView, 
         Print, TextSelection, TextSearch, FormFields, FormDesigner,PageOrganizer  } from '@syncfusion/ej2-vue-pdfviewer';
import  {Browser} from '@syncfusion/ej2-base';
Vue.use(PdfViewerPlugin);

export default {
  name: 'app',
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
      documentLoad: function () {
        var viewer = this.$refs.pdfviewer.ej2Instances;
          if (Browser.isDevice && !viewer.enableDesktopMode) {
            viewer.maxZoom = 200;
            viewer.minZoom = 10;
          }
          else{
              viewer.zoomMode = 'Default';
          }
        },
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
