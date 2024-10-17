<template>
  <ejs-pdfviewer
    id="pdfViewer"
    :documentPath="documentPath"
    :serviceUrl="serviceUrl"
    :printScaleFactor="printScaleFactor"
    >
  </ejs-pdfviewer>
</template>

<script>
import { PdfViewerComponent, Toolbar, Magnification, Navigation, 
         Annotation, LinkAnnotation, BookmarkView, ThumbnailView, 
         Print, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer } from '@syncfusion/ej2-vue-pdfviewer';

  export default {
    name: 'App',

    components: {
      "ejs-pdfviewer": PdfViewerComponent
    },
    data() {
      return {
        serviceUrl: "https://localhost:44396/pdfviewer",
        documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
        //By Changing the printScaleFactor value we can adjust the quality of the PDF file.
        printScaleFactor: 0.5,
      };
    },

    provide: {
    PdfViewer: [ Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, 
                 Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields, PageOrganizer ]},  
   
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
