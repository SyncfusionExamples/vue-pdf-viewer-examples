<template>
  <div class="pdf-viewer-container">
    <div class="toolbar-actions">
      <div class="action-group">
        <h4>Set annotation mode for newly added annotations</h4>
        <button type="button" @click="enableRectangleMode">Rectangle</button>
        <button type="button" @click="enableCircleMode">Circle</button>
        <button type="button" @click="enablePolygonMode">Polygon</button>
        <button type="button" @click="enableFreeTextMode">Free Text</button>
        <button type="button" @click="enableAreaMode">Area</button>
        <button type="button" @click="enableLineMode">Line</button>
      </div>

      <div class="action-group">
        <h4>Exit annotation mode</h4>
        <button type="button" @click="exitAnnotationMode">Exit Annotation Mode</button>
      </div>

      <div class="action-group">
        <h4>Add annotations programmatically</h4>
        <button type="button" @click="addCloudRectangle">Cloud Rectangle</button>
        <button type="button" @click="addDashedCircle">Dashed Circle</button>
        <button type="button" @click="addCloudFreeText">Cloud Free Text</button>
        <button type="button" @click="addDashedLine">Dashed Line</button>
        <button type="button" @click="addCloudArea">Cloud Area</button>
        <button type="button" @click="addDashedRadius">Dashed Radius</button>
      </div>

      <div class="action-group">
        <h4>Modify existing annotation border</h4>
        <button type="button" @click="applyCloudBorderToSelected">Apply Cloud Border</button>
        <button type="button" @click="applyDashedBorderToSelected">Apply Dashed Border</button>
        <button type="button" @click="resetBorderOfSelected">Reset To Solid</button>
      </div>
    </div>

    <ejs-pdfviewer
      id="container"
      ref="pdfviewer"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl"
      :rectangleSettings="rectangleSettings"
      :circleSettings="circleSettings"
      :freeTextSettings="freeTextSettings"
      :cloudSettings="cloudSettings"
      :lineSettings="lineSettings"
      :polygonSettings="polygonSettings"
      :areaSettings="areaSettings"
      :style="{ height: '650px', display: 'block' }"
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

// BorderStyle string values used by the Syncfusion annotation API.
// These match the values accepted by the `borderStyle` property
// (Solid / Dashed / Cloud) for shape, measurement and free text annotations.
const BorderStyle = {
  Solid: 'Solid',
  Dashed: 'Dashed',
  Cloud: 'Cloud'
};

const pdfviewer = ref(null);
const documentPath = ref(window.location.origin + '/blank.pdf');
const resourceUrl = ref('https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2-pdfviewer-lib');

const rectangleSettings = {
  strokeColor: '#d32f2f',
  fillColor: '#ffe0b2',
  borderStyle: BorderStyle.Cloud,
  cloudIntensity: 2
};

const circleSettings = {
  strokeColor: '#1976d2',
  fillColor: '#bbdefb',
  borderStyle: BorderStyle.Dashed,
  borderDashArray: [5, 5]
};

const freeTextSettings = {
  fillColor: 'red',
  borderColor: '#2e7d32',
  fontColor: '#1b5e20',
  opacity: 0.3,
  enableAutoFit: true,
  borderStyle: BorderStyle.Cloud,
  cloudIntensity: 2
};

const cloudSettings = {
  opacity: 1,
  strokeColor: '#9c27b0',
  fillColor: '#f3e5f5',
  author: 'Cloud',
  borderStyle: BorderStyle.Cloud,
  cloudIntensity: 2
};

const lineSettings = {
  strokeColor: '#f57c00',
  borderStyle: BorderStyle.Dashed,
  borderDashArray: [4, 3]
};

const polygonSettings = {
  fillColor: '#ffa5d8',
  strokeColor: '#ff6a00',
  thickness: 2,
  opacity: 0.9,
  borderStyle: BorderStyle.Cloud,
  cloudIntensity: 2
};

const areaSettings = {
  fillColor: 'yellow',
  strokeColor: 'orange',
  opacity: 0.6,
  borderStyle: BorderStyle.Cloud,
  cloudIntensity: 2
};

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

// --- Set the mode used for newly added annotations ---

const enableRectangleMode = () => {
  getViewer()?.annotation.setAnnotationMode('Rectangle');
};

const enableCircleMode = () => {
  getViewer()?.annotation.setAnnotationMode('Circle');
};

const enablePolygonMode = () => {
  getViewer()?.annotation.setAnnotationMode('Polygon');
};

const enableFreeTextMode = () => {
  getViewer()?.annotation.setAnnotationMode('FreeText');
};

const enableAreaMode = () => {
  getViewer()?.annotation.setAnnotationMode('Area');
};

const enableLineMode = () => {
  getViewer()?.annotation.setAnnotationMode('Line');
};

// --- Exit the annotation mode ---

const exitAnnotationMode = () => {
  getViewer()?.annotation.setAnnotationMode('None');
};

// --- Add annotations programmatically with cloud/dashed borders ---

const addCloudRectangle = () => {
  getViewer()?.annotation.addAnnotation('Rectangle', {
    offset: { x: 90, y: 120 },
    pageNumber: 0,
    width: 220,
    height: 110,
    borderStyle: BorderStyle.Cloud,
    cloudIntensity: 2,
    strokeColor: '#d32f2f',
    fillColor: '#ffe0b2',
    opacity: 0.4,
    author: 'Guest'
  });
};

const addDashedCircle = () => {
  getViewer()?.annotation.addAnnotation('Circle', {
    offset: { x: 360, y: 120 },
    pageNumber: 0,
    width: 140,
    height: 140,
    borderStyle: BorderStyle.Dashed,
    borderDashArray: [5, 5],
    strokeColor: '#1976d2',
    fillColor: '#bbdefb',
    opacity: 0.4,
    author: 'Guest'
  });
};

const addCloudFreeText = () => {
  getViewer()?.annotation.addAnnotation('FreeText', {
    offset: { x: 90, y: 300 },
    pageNumber: 0,
    width: 220,
    height: 70,
    borderStyle: BorderStyle.Cloud,
    cloudIntensity: 1,
    borderColor: '#2e7d32',
    fillColor: '#e8f5e9',
    fontColor: '#1b5e20',
    opacity: 0.3,
    author: 'Guest'
  });
};

const addDashedLine = () => {
  getViewer()?.annotation.addAnnotation('Line', {
    offset: { x: 360, y: 330 },
    pageNumber: 0,
    points: [{ x: 360, y: 330 }, { x: 500, y: 400 }],
    borderStyle: BorderStyle.Dashed,
    borderDashArray: [4, 3],
    strokeColor: '#f57c00',
    opacity: 1,
    author: 'Guest'
  });
};

const addCloudArea = () => {
  getViewer()?.annotation.addAnnotation('Area', {
    offset: { x: 90, y: 430 },
    pageNumber: 0,
    vertexPoints: [
      { x: 90, y: 430 },
      { x: 300, y: 430 },
      { x: 300, y: 520 },
      { x: 90, y: 520 }
    ],
    borderStyle: BorderStyle.Cloud,
    cloudIntensity: 2,
    strokeColor: '#c2185b',
    fillColor: '#fce4ec',
    opacity: 0.4,
    author: 'Guest'
  });
};

const addDashedRadius = () => {
  getViewer()?.annotation.addAnnotation('Radius', {
    offset: { x: 380, y: 470 },
    pageNumber: 0,
    points: [{ x: 380, y: 470 }, { x: 470, y: 470 }],
    borderStyle: BorderStyle.Dashed,
    borderDashArray: [6, 3],
    strokeColor: '#00838f',
    opacity: 1,
    author: 'Guest'
  });
};

// --- Modify the border style of the currently selected annotation ---
const updateSelectedBorder = (borderStyle, extra = {}) => {
  const viewer = getViewer();
  if (!viewer?.annotationCollection) return;

  const annotation =
    viewer.annotationCollection[viewer.annotationCollection.length - 1];

  if (!annotation) {
    return;
  }

  // Set border style
  annotation.borderStyle = borderStyle;

  // Apply additional properties dynamically
  Object.entries(extra).forEach(([key, value]) => {
    annotation[key] = value;
  });

  viewer.annotation.editAnnotation(annotation);
};

const applyCloudBorderToSelected = () => {
  updateSelectedBorder(BorderStyle.Cloud, {
    cloudIntensity: 2
  });
};

const applyDashedBorderToSelected = () => {
  updateSelectedBorder(BorderStyle.Dashed, {
    borderDashArray: [5, 5]
  });
};

const resetBorderOfSelected = () => {
  updateSelectedBorder(BorderStyle.Solid, {
    borderDashArray: null,
    cloudIntensity: 1
  });
};
</script>

<style scoped>
.pdf-viewer-container {
  margin: 50px 90px;
}

.toolbar-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 12px;
}

.action-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

.action-group h4 {
  width: 100%;
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 600;
  color: #424242;
}

.action-group button {
  padding: 6px 12px;
  font-size: 13px;
  color: #1b1b1b;
  background: #ffffff;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  cursor: pointer;
}

.action-group button:hover {
  background: #f5f5f5;
  border-color: #1976d2;
}

.action-group button:focus-visible {
  outline: 2px solid #1976d2;
  outline-offset: 1px;
}
</style>