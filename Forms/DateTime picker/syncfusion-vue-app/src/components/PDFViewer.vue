<template>
  <div class="pdf-viewer-container">
    <div class="control-section">
      <button type="button" @click="addDateField">Add Date Picker</button>
      <button type="button" @click="addTimeField">Add Time Picker</button>
    </div>
    <ejs-pdfviewer
      id="container"
      ref="pdfviewer"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl"
      :style="{ height: '680px', display: 'block' }"
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
  FormDesigner
} from '@syncfusion/ej2-vue-pdfviewer';

const pdfviewer = ref(null);
const documentPath = ref('https://cdn.syncfusion.com/content/pdf/form-filling-document.pdf');
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
  FormDesigner
]);

const addDateField = () => {
  const viewer = pdfviewer.value?.ej2Instances;
  if (!viewer) return;

  // Add a Date field
  viewer.formDesignerModule?.addFormField('Textbox', {
    name: 'DateField1',
    bounds: { X: 146, Y: 200, Width: 200, Height: 24 },
    pageNumber: 1,
    isDateField: true,
    fontSize: 10,
    color: 'black',
    fontFamily: 'Helvetica',
    backgroundColor: '#daeaf7ff',
    borderColor: '#303030',
    alignment: 'Left',
    isReadOnly: false,
    visibility: 'visible',
    isRequired: false,
    isPrint: true,
    tooltip: '',
    thickness: 1,
    actions: {
      format: { script: 'AFDate_FormatEx("m/d/yy")' }
    }
  });
};

const addTimeField = () => {
  const viewer = pdfviewer.value?.ej2Instances;
  if (!viewer) return;

  // Add a Time field
  viewer.formDesignerModule?.addFormField('Textbox', {
    name: 'TimeField1',
    bounds: { X: 146, Y: 250, Width: 200, Height: 24 },
    pageNumber: 1,
    isDateField: true,
    fontSize: 10,
    color: 'black',
    fontFamily: 'Helvetica',
    backgroundColor: '#daeaf7ff',
    borderColor: '#303030',
    alignment: 'Left',
    isReadOnly: false,
    visibility: 'visible',
    isRequired: false,
    isPrint: true,
    tooltip: '',
    thickness: 1,
    actions: {
      format: { script: 'AFTime_FormatEx("HH:MM")' }
    }
  });
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