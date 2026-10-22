<template>
  <div class="pdf-viewer-container">
    <div class="control-section">
      <button type="button" @click="enableCalloutMode">Enable Callout Mode</button>
      <button type="button" @click="exitCalloutMode">Exit Callout Mode</button>
      <button type="button" @click="addCalloutProgrammatically">Add Callout Programmatically</button>
      <button type="button" @click="editCalloutProgrammatically">Edit Callout Programmatically</button>
    </div>
    <ejs-pdfviewer
      id="container"
      ref="pdfviewer"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl"
      :style="{ height: '640px', display: 'block' }"
    />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';

import {
  PdfViewerComponent as EjsPdfviewer,
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  Annotation,
  TextSearch,
  FormFields,
  FormDesigner,
  PageOrganizer
} from '@syncfusion/ej2-vue-pdfviewer';

const pdfviewer = ref(null);
const documentPath = ref('https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf');
const resourceUrl = ref('https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2-pdfviewer-lib');

provide('PdfViewer', [
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  Annotation,
  TextSearch,
  FormFields,
  FormDesigner,
  PageOrganizer
]);

// Enable Callout Annotation mode
const enableCalloutMode = () => {
  const viewer = pdfviewer.value?.ej2Instances;
  if (!viewer) return;
  viewer.annotation.setAnnotationMode('Callout');
};

// Exit Callout Annotation mode
const exitCalloutMode = () => {
  const viewer = pdfviewer.value?.ej2Instances;
  if (!viewer) return;
  viewer.annotation.setAnnotationMode('None');
};

// Add Callout Annotation programmatically
const addCalloutProgrammatically = () => {
  const viewer = pdfviewer.value?.ej2Instances;
  if (!viewer) return;
  viewer.annotation.addAnnotation('Callout', {
    offset: { x: 200, y: 200 },
    pageNumber: 1,
    opacity: 1,
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    author: 'Guest',
    calloutLines: [
      { x: 50, y: 50 },
      { x: 100, y: 100 },
      { x: 200, y: 250 }
    ],
    lineEndingStyle: 'Open'
  });
};

// Edit Callout Annotation programmatically
const editCalloutProgrammatically = () => {
  const viewer = pdfviewer.value?.ej2Instances;
  if (!viewer || !viewer.annotationCollection) return;
  for (const annotation of viewer.annotationCollection) {
    if (annotation.subject === 'Callout') {
      annotation.bounds = { x: 300, y: 300, width: 200, height: 40, top: 300, left: 300 };
      annotation.dynamicText = 'Callout edited';
      annotation.author = 'Syncfusion';
      annotation.strokeColor = 'red';
      annotation.fillColor = 'yellow';
      annotation.textAlign = 'Center';
      viewer.annotation.editAnnotation(annotation);
      break;
    }
  }
};
</script>

<style scoped>
.pdf-viewer-container {
  margin: 50px 90px;
}

.control-section {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.control-section button {
  padding: 6px 12px;
  font-size: 13px;
  color: #1b1b1b;
  background: #ffffff;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  cursor: pointer;
}

.control-section button:hover {
  background: #f5f5f5;
  border-color: #1976d2;
}

.control-section button:focus-visible {
  outline: 2px solid #1976d2;
  outline-offset: 1px;
}
</style>