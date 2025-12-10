<template>
  <div class="content-wrapper">
    <div style="margin-bottom: 8px; display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <button id="addRedactAnnot" type="button" @click="addRedaction">Add Redaction</button>
      <button id="deleteById" type="button" @click="deleteAnnotationById">Delete Annotation By Id</button>
      <button id="editRedactAnnotation" type="button" @click="editRedactAnnotation">Edit Redaction</button>
      <button id="addPageRedactions" type="button" @click="addPageRedactions">Add Page Redactions</button>
      <button id="applyRedaction" type="button" @click="applyRedaction">Apply Redaction</button>
    </div>

    <ejs-pdfviewer
      ref="pdfviewer"
      id="container"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl"
      :toolbarSettings="toolbarSettings"
      style="height: 640px; display: block;"
      :annotationAdd="onAnnotationAdd"
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
  mounted() {
    // Set default redaction properties
    const inst = this.$refs.pdfviewer?.ej2Instances;
    if (!inst) return;
    inst.redactionSettings = {
      overlayText: 'Confidential',
      markerFillColor: '#FF0000',
      markerBorderColor: '#000000',
      isRepeat: false,
      fillColor: '#F8F8F8',
      fontColor: '#333333',
      fontSize: 14,
      fontFamily: 'Symbol',
      textAlign: 'Right'
    };
  },
  methods: {
    onAnnotationAdd(args) {
      console.log('Annotation added:', args);
    },
    addRedaction() {
      const inst = this.$refs.pdfviewer?.ej2Instances;
      if (!inst) return;
      inst.annotation.addAnnotation('Redaction', {
        bound: { x: 200, y: 480, width: 150, height: 75 },
        pageNumber: 1,
        markerFillColor: '#0000FF',
        markerBorderColor: 'white',
        fillColor: 'red',
        overlayText: 'Confidential',
        fontColor: 'yellow',
        fontFamily: 'Times New Roman',
        fontSize: 8,
        beforeRedactionsApplied: false
      });
    },
    deleteAnnotationById() {
      const inst = this.$refs.pdfviewer?.ej2Instances;
      if (!inst) return;
      const id = inst.annotationCollection?.[0]?.annotationId;
      if (id) inst.annotationModule.deleteAnnotationById(id);
    },
    editRedactAnnotation() {
      const inst = this.$refs.pdfviewer?.ej2Instances;
      if (!inst) return;
      const collection = inst.annotationCollection || [];
      for (let i = 0; i < collection.length; i++) {
        if (collection[i].subject === 'Redaction') {
          collection[i].overlayText = 'EditedAnnotation';
          collection[i].markerFillColor = '#22FF00';
          collection[i].markerBorderColor = '#000000';
          collection[i].isRepeat = true;
          collection[i].fillColor = '#F8F8F8';
          collection[i].fontColor = '#333333';
          collection[i].fontSize = 14;
          collection[i].fontFamily = 'Symbol';
          collection[i].textAlign = 'Right';
          collection[i].beforeRedactionsApplied = false;
          inst.annotation.editAnnotation(collection[i]);
        }
      }
    },
    addPageRedactions() {
      const inst = this.$refs.pdfviewer?.ej2Instances;
      if (!inst) return;
      inst.annotation.addPageRedactions([1, 3, 5, 7]);
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