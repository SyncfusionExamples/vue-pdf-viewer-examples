<template>
  <div id="app">
    <button v-on:click="findText">findText</button>
    <button v-on:click="findTexts">findTexts</button>
    <ejs-pdfviewer 
      id="pdfViewer" 
      ref="pdfviewer"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl">
    </ejs-pdfviewer>
  </div>
</template>

<script>
import {PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner } from '@syncfusion/ej2-vue-pdfviewer';

export default {
  name: 'app',
  components: {
    'ejs-pdfviewer': PdfViewerComponent,
  },
  data() {
    return {
      documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
      resourceUrl: "https://cdn.syncfusion.com/ej2/29.1.33/dist/ej2-pdfviewer-lib"
    };
  },
  provide: {
    PdfViewer: [
      Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
      ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner
    ]
  },
  methods: {
    // Search for a single string 'pdf' with a case-insensitive search across all pages
    findText() {
      const viewer = this.$refs.pdfviewer.ej2Instances;
      viewer.textSearchModule.findTextAsync('pdf', false).then(res => {
        console.log(res);
      });
    },
    // Search for multiple strings ['pdf', 'the'] with a case-insensitive search across all pages
    findTexts() {
      const viewer = this.$refs.pdfviewer.ej2Instances;
      viewer.textSearchModule.findTextAsync(['pdf', 'the'], false).then(res => {
        console.log(res);
      });
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
