<script>
import { 
  PdfViewerComponent, 
  Toolbar, 
  Magnification, 
  Navigation, 
  LinkAnnotation, 
  BookmarkView, 
  ThumbnailView, 
  Print, 
  TextSelection, 
  TextSearch, 
  Annotation, 
  FormDesigner, 
  FormFields } from '@syncfusion/ej2-vue-pdfviewer';
var viewer;
export default {
  name: "App",
  components: {
    "ejs-pdfviewer": PdfViewerComponent
  },
  data() {
    return {
        //Sets the PDF document path for initial loading.
        serviceUrl:"https://ej2services.syncfusion.com/production/web-services/api/pdfviewer",
        documentPath:'PDF_Succinctly.pdf',
    };
  },
  provide: {
    PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields]
  }
};
</script>

{/*Template to render PDF viewer*/}
<template>
  <h3>PDF Viewer</h3>
  <ejs-pdfviewer id="pdfViewer" ref="pdfviewer" :serviceUrl="serviceUrl" :documentPath="documentPath" :documentLoad="documentLoad"> </ejs-pdfviewer>
</template>

{/*Material theme used for this sample*/}
<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
@import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-lists/styles/material.css';
@import '../node_modules/@syncfusion/ej2-vue-pdfviewer/styles/material.css';

@import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css";

.e-tab .e-content .e-item {
  padding: 10px;
  text-align: justify;
  font-size: 12px;
}
</style>
