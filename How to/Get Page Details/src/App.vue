<template>
  <div id="app">
    <button @click="retrievePageInfo" style="margin-bottom: 20px;">
      GetPageInfo
    </button>
    <ejs-pdfviewer
      id="pdfViewer"
      ref="pdfviewer"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl"
      style="height: 640px;"
    >
    </ejs-pdfviewer>
  </div>
</template>

<script>
import {
  PdfViewerComponent,
  Toolbar,
  Magnification,
  Navigation,
  Annotation,
  TextSelection,
  TextSearch,
  FormFields,
  FormDesigner,
  PageOrganizer,
} from '@syncfusion/ej2-vue-pdfviewer';

export default {
  name: 'App',
  components: {
    'ejs-pdfviewer': PdfViewerComponent,
  },
  data() {
    return {
      documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
      resourceUrl: "https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib",
    };
  },
  provide: {
    PdfViewer: [
      Toolbar,
      Magnification,
      Navigation,
      Annotation,
      TextSelection,
      TextSearch,
      FormFields,
      FormDesigner,
      PageOrganizer,
    ],
  },
  methods: {
    retrievePageInfo() {
      if (this.$refs.pdfviewer) {
        const pdfviewer = this.$refs.pdfviewer.ej2Instances;
        // Set the page index for which info is required
        const pageIndex = 0; 
        // To Retrieve and log the page information
        console.log(pdfviewer.getPageInfo(pageIndex));

        // To Log the specific page information details to the console
        const pageInfo = pdfviewer.getPageInfo(pageIndex);
        if (pageInfo) {
          console.log(`Page Info for Page Index ${pageIndex}:`);
          console.log(`Height: ${pageInfo.height}`);
          console.log(`Width: ${pageInfo.width}`);
          console.log(`Rotation: ${pageInfo.rotation}`);
        } 
      }
    }
  },
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
