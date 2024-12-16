<template>
  <div id="app">
    <!-- Buttons for search controls -->
    <div style="margin-top: 20px;">
      <button @click="handleSearch">Search PDF</button>
      <button @click="handleSearchNext">Search Next</button>
      <button @click="handleCancelSearch">Cancel Search</button>
    </div>
    <!-- PDF Viewer Component -->
      <ejs-pdfviewer
        id="pdfViewer"
        ref="pdfviewer"
        :documentPath="documentPath"
        :resourceUrl="resourceUrl"
        @textSearchHighlight="handleTextSearchHighlight"
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
  LinkAnnotation,
  BookmarkView,
  Annotation,
  ThumbnailView,
  Print,
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
      resourceUrl: 'https://cdn.syncfusion.com/ej2/28.1.33/dist/ej2-pdfviewer-lib',
      documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
    };
  },
  provide: {
    // Inject necessary modules
    PdfViewer: [
      Toolbar,
      Magnification,
      Navigation,
      LinkAnnotation,
      BookmarkView,
      Annotation,
      ThumbnailView,
      Print,
      TextSelection,
      TextSearch,
      FormFields,
      FormDesigner,
      PageOrganizer,
    ],
  },
  methods: {
    // Method to initiate a text search for the term 'PDF'
    handleSearch() {
      this.$refs.pdfviewer.ej2Instances.textSearchModule.searchText('PDF', false);
    },
    // Method to go to the next instance of the search term
    handleSearchNext() {
      this.$refs.pdfviewer.ej2Instances.textSearchModule.searchNext();
    },
    // Method to cancel the current text search operation
    handleCancelSearch() {
      this.$refs.pdfviewer.ej2Instances.textSearchModule.cancelTextSearch();
    },
    // Method to handle the text search highlight event
    handleTextSearchHighlight(args) {
      console.log(args); // Log for debugging
      const bounds=args.bounds;
      // Add a rectangle annotation on the highlighted text
      this.$refs.pdfviewer.ej2Instances.annotationModule.addAnnotation('Rectangle', {
        pageNumber: args.pageNumber,
        offset: { x: bounds.left, y: bounds.top },
        width: bounds.width,
        height: bounds.height,
      });
    },
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
