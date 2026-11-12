<template>
  <div class="pdf-viewer-container">
    <div class="toolbar-actions">

      <!-- Programmatic creation -->
      <div class="action-group">
        <h4>Add barcode field programmatically</h4>

        <button type="button" @click="addBarcodeField('PDF417')">
          Add PDF417
        </button>

        <button type="button" @click="addBarcodeField('QRCode')">
          Add QR Code
        </button>

        <button type="button" @click="addBarcodeField('DataMatrix')">
          Add Data Matrix
        </button>

        <button type="button" @click="enableBarcodeMode">
          Set Barcode Field Mode
        </button>
      </div>

      <!-- Editing -->
      <div class="action-group">
        <h4>Edit barcode field</h4>

        <label>
          Field
        </label>

        <select v-model="selectedFieldId">
          <option
            v-for="field in barcodeFields"
            :key="field.id"
            :value="field.id"
          >
            {{ field.name }} ({{ field.symbology }})
          </option>

          <option
            v-if="barcodeFields.length === 0"
            value=""
          >
            No barcode field
          </option>
        </select>

        <button
          type="button"
          :disabled="!selectedFieldId"
          @click="updateSymbology('PDF417')"
        >
          Set PDF417
        </button>

        <button
          type="button"
          :disabled="!selectedFieldId"
          @click="updateSymbology('QRCode')"
        >
          Set QR Code
        </button>

        <button
          type="button"
          :disabled="!selectedFieldId"
          @click="updateSymbology('DataMatrix')"
        >
          Set Data Matrix
        </button>

        <button
          type="button"
          :disabled="!selectedFieldId"
          @click="deleteSelectedField"
        >
          Delete Field
        </button>
      </div>
    </div>

    <ejs-pdfviewer
      id="container"
      ref="pdfviewer"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl"
      :documentLoad="refreshBarcodeFields"
      :formFieldAdd="refreshBarcodeFields"
      :formFieldRemove="refreshBarcodeFields"
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
  FormDesigner,
  PageOrganizer
} from '@syncfusion/ej2-vue-pdfviewer';

const pdfviewer = ref(null);

const documentPath =
  'https://cdn.syncfusion.com/content/pdf/form-filling-document.pdf';

const resourceUrl =
  'https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib';

const barcodeFields = ref([]);
const selectedFieldId = ref('');

provide('PdfViewer', [
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
]);

function getViewer() {
  return pdfviewer.value?.ej2Instances;
}

function refreshBarcodeFields() {
  const viewer = getViewer();

  if (!viewer) {
    return;
  }

  const fields = Array.isArray(viewer.formFieldCollections)
    ? viewer.formFieldCollections
    : [];

  const barcodes = fields
    .filter(field => field.type === 'Barcode')
    .map(field => ({
      id: field.id,
      name: field.name,
      symbology: field.symbology
    }));

  barcodeFields.value = barcodes;

  if (
    !barcodes.some(field => field.id === selectedFieldId.value)
  ) {
    selectedFieldId.value =
      barcodes.length > 0 ? barcodes[0].id : '';
  }
}

function addBarcodeField(symbology) {
  const viewer = getViewer();

  if (!viewer) {
    return;
  }

  viewer.formDesignerModule.addFormField('Barcode', {
    name: 'Barcode' + (barcodeFields.value.length + 1),
    bounds: {
      X: 100,
      Y: 150,
      Width: 200,
      Height: 80
    },
    pageNumber: 1,
    symbology: symbology
  });

  refreshBarcodeFields();
}

function enableBarcodeMode() {
  const viewer = getViewer();

  if (!viewer) {
    return;
  }

  viewer.formDesignerModule.setFormFieldMode('Barcode');
}

function getSelectedField() {
  const viewer = getViewer();

  if (!viewer || !selectedFieldId.value) {
    return null;
  }

  const fields = Array.isArray(viewer.formFieldCollections)
    ? viewer.formFieldCollections
    : [];

  const field = fields.find(
    item => item.id === selectedFieldId.value
  );

  return field || selectedFieldId.value;
}

function updateSymbology(symbology) {
  const viewer = getViewer();
  const field = getSelectedField();

  if (!viewer || !field) {
    return;
  }

  viewer.formDesignerModule.updateFormField(field, {
    symbology: symbology
  });

  refreshBarcodeFields();
}

function deleteSelectedField() {
  const viewer = getViewer();
  const field = getSelectedField();

  if (!viewer || !field) {
    return;
  }

  viewer.formDesignerModule.deleteFormField(field);

  selectedFieldId.value = '';

  refreshBarcodeFields();
}
</script>

<style scoped>
.pdf-viewer-container {
  margin: 30px;
}

.toolbar-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.action-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #d6d6d6;
  padding: 12px;
  border-radius: 4px;
}

.action-group h4 {
  margin: 0 0 8px;
  font-size: 14px;
}

.action-group button {
  padding: 6px 12px;
  cursor: pointer;
}

.action-group select {
  padding: 6px;
}

.action-group button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>