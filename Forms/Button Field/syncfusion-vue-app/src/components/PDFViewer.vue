<template>
  <div class="pdf-viewer-container">
    <div class="toolbar-actions">

      <!-- Programmatic creation -->
      <div class="action-group">
        <h4>Add button field programmatically</h4>

        <button type="button" @click="addButtonField">
          Add Button Field
        </button>

        <button type="button" @click="enableButtonMode">
          Enable Button Designer Mode
        </button>
      </div>

      <!-- Editing -->
      <div class="action-group">
        <h4>Edit button field</h4>

        <label>
          Field
        </label>

        <select v-model="selectedFieldId">
          <option
            v-for="field in buttonFields"
            :key="field.id"
            :value="field.id"
          >
            {{ field.name }}
          </option>

          <option
            v-if="buttonFields.length === 0"
            value=""
          >
            No button field
          </option>
        </select>

        <button
          type="button"
          :disabled="!selectedFieldId"
          @click="editButtonField"
        >
          Edit Button Field
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
      :documentLoad="refreshButtonFields"
      :formFieldAdd="refreshButtonFields"
      :formFieldRemove="refreshButtonFields"
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

import { ActionType } from '@syncfusion/ej2-pdfviewer';

const pdfviewer = ref(null);

const documentPath =
   window.location.origin + '/form_document.pdf';

const resourceUrl =
 'https://cdn.syncfusion.com/ej2/31.2.2/dist/ej2-pdfviewer-lib';

const buttonFields = ref([]);
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

function refreshButtonFields() {
  const viewer = getViewer();

  if (!viewer) {
    return;
  }

  const fields = Array.isArray(viewer.formFieldCollections)
    ? viewer.formFieldCollections
    : [];

  const buttons = fields
    .filter(field => field.type === 'ButtonField')
    .map(field => ({
      id: field.id,
      name: field.name || field.value || field.id
    }));

  buttonFields.value = buttons;

  if (
    !buttons.some(field => field.id === selectedFieldId.value)
  ) {
    selectedFieldId.value =
      buttons.length > 0 ? buttons[0].id : '';
  }
}

function addButtonField() {
  const viewer = getViewer();

  if (!viewer) {
    return;
  }

  viewer.formDesignerModule.addFormField('ButtonField', {
    name: 'Submit' + (buttonFields.value.length + 1),
    pageNumber: 1,
    bounds: {
      X: 100,
      Y: 350,
      Width: 120,
      Height: 32
    },
    value: 'Submit',
    text: 'Submit',
    tooltip: 'Click to submit',
    actions: {
      mouseUp: {
        action: ActionType.GoTo,
        destinationPageNumber: 5,
        destinationLocation: {
          x: 100,
          y: 100
        },
        zoomValue: 2
      }
    }
  });

  refreshButtonFields();
}

function enableButtonMode() {
  const viewer = getViewer();

  if (!viewer) {
    return;
  }

  viewer.formDesignerModule.setFormFieldMode('ButtonField');
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

function editButtonField() {
  const viewer = getViewer();
  const field = getSelectedField();

  if (!viewer || !field) {
    return;
  }

  viewer.formDesignerModule.updateFormField(field, {
    value: 'Submit Button',
    text: 'Submit Button',
    alignment: 'Left',
    tooltip: 'Updated Submit Button',
    actions: {
      mouseUp: {
        action: ActionType.GoTo,
        destinationPageNumber: 7,
        destinationLocation: {
          x: 100,
          y: 100
        },
        zoomValue: 1
      }
    }
  });

  refreshButtonFields();
}

function deleteSelectedField() {
  const viewer = getViewer();
  const field = getSelectedField();

  if (!viewer || !field) {
    return;
  }

  viewer.formDesignerModule.deleteFormField(field);

  selectedFieldId.value = '';

  refreshButtonFields();
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