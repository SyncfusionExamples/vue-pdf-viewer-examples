<template>
  <div class="pdf-viewer-container">
    <div class="control-section">
      <button type="button" @click="addFormatFields">
       Add Format Fields
      </button>
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

const documentPath = ref(
  'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf'
);

const resourceUrl = ref(
  'https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2-pdfviewer-lib'
);

const enableFreehandHighlight = ref(false);

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

const getViewer = () => pdfviewer.value?.ej2Instances;

// Dynamically enable/disable Freehand Highlight support
const addFormatFields = () => {
  const viewer = getViewer();
  if (!viewer) return;

  
  var numberField = {
    name: "NumberField",
    bounds: { X: 146, Y: 200, Width: 200, Height: 24 },
    pageNumber: 1,
    fontSize: 10,
    color: "black",
    fontFamily: "Helvetica",
    backgroundColor: "#daeaf7ff",
    borderColor: "#303030",
    alignment: "Left",
    isReadOnly: false,
    visibility: "visible",
    isRequired: false,
    isPrint: true,
    tooltip: "",
    thickness: 1,
    actions: {
      format: {
        script: 'AFNumber_Format(2, 0, 0, 0, "$", true)'
      }
    }
  };
  viewer.formDesignerModule.addFormField("Textbox", numberField);

  var percentField = {
    name: "PercentField",
    bounds: { X: 146, Y: 300, Width: 200, Height: 24 },
    pageNumber: 1,
    fontSize: 10,
    color: "black",
    fontFamily: "Helvetica",
    backgroundColor: "#daeaf7ff",
    borderColor: "#303030",
    alignment: "Left",
    isReadOnly: false,
    visibility: "visible",
    isRequired: false,
    isPrint: true,
    tooltip: "",
    thickness: 1,
    actions: {
      format: {
        script: 'AFPercent_Format(2, 0)'
      }
    }
  };
  viewer.formDesignerModule.addFormField("Textbox", percentField);

  var specialField = {
    name: "SpecialField",
    bounds: { X: 146, Y: 400, Width: 200, Height: 24 },
    pageNumber: 1,
    fontSize: 10,
    color: "black",
    fontFamily: "Helvetica",
    backgroundColor: "#daeaf7ff",
    borderColor: "#303030",
    alignment: "Left",
    isReadOnly: false,
    visibility: "visible",
    isRequired: false,
    isPrint: true,
    tooltip: "",
    thickness: 1,
    actions: {
      format: {
        script: 'AFSpecial_Format(0)'
      }
    }
  };
  viewer.formDesignerModule.addFormField("Textbox", specialField);

  var maskField = {
    name: "MaskField",
    bounds: { X: 146, Y: 500, Width: 200, Height: 24 },
    pageNumber: 1,
    fontSize: 10,
    color: "black",
    fontFamily: "Helvetica",
    backgroundColor: "#daeaf7ff",
    borderColor: "#303030",
    alignment: "Left",
    isReadOnly: false,
    visibility: "visible",
    isRequired: false,
    isPrint: true,
    tooltip: "",
    thickness: 1,
    actions: {
      keyPressed: {
        script: 'AFSpecial_KeystrokeEx("AAA-9999")'
      }
    }
  };
  viewer.formDesignerModule.addFormField("Textbox", maskField);
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