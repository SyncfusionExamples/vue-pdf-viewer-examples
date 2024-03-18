<template>
  <div id="app">
    <ejs-pdfviewer
      id="pdfViewer"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl"
      :pageRenderInitiate ="pageRenderInitiate"
      :pageRenderComplete="pageRenderComplete">
    </ejs-pdfviewer>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { PdfViewerPlugin, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner } from '@syncfusion/ej2-vue-pdfviewer';
  Vue.use(PdfViewerPlugin);
  export default {
    name: 'app',
    data() {
      return {
        documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
        resourceUrl: 'https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib'
      };
    },
    provide: {
      PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner]
    },
    methods: {
    pageRenderInitiate : function (args) {
      // This method is called when the page rendering starts
      console.log(args);
    },
    pageRenderComplete: function (args) {
      // This method is called when the page rendering completes
      console.log(args);
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

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
