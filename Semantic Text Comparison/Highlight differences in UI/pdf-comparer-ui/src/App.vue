<template>
  <ejs-pdfcomparer
    id="container"
    height="600px"
    :originalDocumentPath="originalDocumentPath"
    :modifiedDocumentPath="modifiedDocumentPath"
    :resourceUrl="resourceUrl"
  />
</template>

<script>
import { PdfComparerComponent } from '@syncfusion/ej2-vue-pdfviewer';

export default {
  name: 'App',
  components: {
    'ejs-pdfcomparer': PdfComparerComponent
  },
  data() {
    return {
      // Specifies the URL or a Base64-encoded PDF
      originalDocumentPath: 'https://cdn.syncfusion.com/content/pdf/original-document.pdf',
      modifiedDocumentPath: 'https://cdn.syncfusion.com/content/pdf/modified-document.pdf',
      // Path to PDFium resource files required for the viewer to function
      resourceUrl: 'https://cdn.syncfusion.com/ej2/34.1.29/dist/ej2-pdfviewer-lib'
    };
  }
};
</script>

<style>
  @import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pdfviewer/index.css';
</style>
