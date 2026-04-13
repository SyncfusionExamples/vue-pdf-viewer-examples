<template>
  <div class="content-wrapper">
    <div style="margin-bottom: 8px; display: flex; gap: 8px; align-items: center;">
      <button id="searchTextRedact" type="button" @click="searchTextAndRedact">
        Search "syncfusion" & Mark for Redaction
      </button>
      <button id="applyRedaction" type="button" @click="applyRedaction">
        Apply Redaction
      </button>
    </div>

    <ejs-pdfviewer
      ref="pdfviewer"
      id="container"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl"
      :toolbarSettings="toolbarSettings"
      :isExtractText="true"
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
      documentPath: 'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
      resourceUrl: 'https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib',
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
    px(pt) {
      return (pt * 96) / 72; // points -> pixels
    },
    async searchTextAndRedact() {
      const inst = this.$refs.pdfviewer?.ej2Instances;
      if (!inst) return;
      const term = 'syncfusion';
      const results = await inst.textSearchModule.findTextAsync(term, false);
      if (!results || results.length === 0) {
        console.warn('No matches found.');
        return;
      }
      for (const pageResult of results) {
        if (!pageResult?.bounds?.length) continue;
        const pageNumber = (pageResult.pageIndex ?? -1) + 1; // 1-based
        if (pageNumber < 1) continue;
        for (const bound of pageResult.bounds) {
          inst.annotation.addAnnotation('Redaction', {
            bound: {
              x: this.px(bound.x),
              y: this.px(bound.y),
              width: this.px(bound.width),
              height: this.px(bound.height)
            },
            pageNumber,
            overlayText: 'Confidential',
            fillColor: '#00FF40FF',
            fontColor: '#333333',
            fontSize: 12,
            fontFamily: 'Arial',
            markerFillColor: '#FF0000',
            markerBorderColor: '#000000'
          });
        }
      }
    },
    applyRedaction() {
      const inst = this.$refs.pdfviewer?.ej2Instances;
      if (!inst) return;
      inst.annotation.redact();
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