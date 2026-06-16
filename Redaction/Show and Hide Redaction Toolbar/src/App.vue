<template>
  <div class="content-wrapper">
    <div style="margin-bottom: 8px; display: flex; gap: 8px;">
      <button type="button" @click="showRedactionToolbar">Show Redaction Toolbar</button>
      <button type="button" @click="hideRedactionToolbar">Hide Redaction Toolbar</button>
    </div>
    <ejs-pdfviewer
      ref="pdfviewer"
      id="container"
      :resourceUrl="resourceUrl"
      :documentPath="documentPath"
      :toolbarSettings="toolbarSettings"
      style="height: 640px; display: block;"
    />
  </div>
</template>
<script>
import {
  PdfViewerComponent,
  Toolbar,
  Magnification,
  Navigation,
  Annotation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  TextSearch,
  FormFields,
  FormDesigner,
  PageOrganizer
} from '@syncfusion/ej2-vue-pdfviewer';

export default {
  name: 'App',
  components: { 'ejs-pdfviewer': PdfViewerComponent },
  data() {
    return {
      resourceUrl: 'https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib',
      documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
      toolbarSettings: {
        toolbarItems: [
          'OpenOption',
          'UndoRedoTool',
          'PageNavigationTool',
          'MagnificationTool',
          'PanTool',
          'SelectionTool',
          'CommentTool',
          'SubmitForm',
          'AnnotationEditTool',
          'RedactionEditTool',
          'FormDesignerEditTool',
          'SearchOption',
          'PrintOption',
          'DownloadOption'
        ]
      }
    };
  },
  provide: {
    PdfViewer: [
      Toolbar,
      Magnification,
      Navigation,
      Annotation,
      LinkAnnotation,
      BookmarkView,
      ThumbnailView,
      Print,
      TextSelection,
      TextSearch,
      FormFields,
      FormDesigner,
      PageOrganizer
    ]
  },
  methods: {
    showRedactionToolbar() {
      const inst = this.$refs.pdfviewer?.ej2Instances;
      if (!inst) return;
      inst.toolbar.showRedactionToolbar(true);
    },
    hideRedactionToolbar() {
      const inst = this.$refs.pdfviewer?.ej2Instances;
      if (!inst) return;
      inst.toolbar.showRedactionToolbar(false);
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