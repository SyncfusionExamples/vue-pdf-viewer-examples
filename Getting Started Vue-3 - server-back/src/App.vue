<template>
  <ejs-pdfviewer 
    id="pdfViewer" 
    :documentPath="documentPath"
    :style="{ height: '800px', width: '1200px' }"
    :serviceUrl="serviceUrl">
  </ejs-pdfviewer>
</template>

<script>
  import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, 
           ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields, PageOrganizer } from '@syncfusion/ej2-vue-pdfviewer';

  export default {
    name: 'App',
    // Declaring component and its directives
    components: {
      "ejs-pdfviewer": PdfViewerComponent
    },

    data() {
      return {
        documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
        serviceUrl: "https://services.syncfusion.com/vue/production/api/pdfviewer"

      };
    },
    provide: {
      PdfViewer: [ Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView,
                   Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields, PageOrganizer ]
    }
  }
</script>

<style>
  @import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pdfviewer/index.css';
</style>