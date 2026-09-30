<template>
  <div class="pdf-viewer-container">
    <div class="stamp-actions">
      <button type="button" @click="addTextStamp">Add text stamp</button>
      <button type="button" @click="addImageStamp">Add image stamp</button>
    </div>
    <ejs-pdfviewer
      id="container"
      ref="pdfviewer"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl"
      :customStampSettings="customStampSettings"
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
  Print,
  TextSelection,
  TextSearch,
  Annotation,
  FormFields,
  FormDesigner,
  PageOrganizer
} from '@syncfusion/ej2-vue-pdfviewer';

const pdfviewer = ref(null);
const documentPath = ref('https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf');

const resourceUrl = ref('https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2-pdfviewer-lib');
const customStampSettings = {
  fontFamilyCollection: ['Arial', 'Times New Roman', 'Courier New'],
  customTextStamps: [{
    title: 'Draft',
    subtitle: '[$author] DD/MMMM/YYYY, h:mm A',
    bold: true,
    textColor: '#000000',
    backgroundColor: '#1693f8',
    fontFamily: 'Arial'
  }]
};

provide('PdfViewer', [
  Toolbar,
  Magnification,
  Navigation,
  Print,
  TextSelection,
  TextSearch,
  Annotation,
  FormFields,
  FormDesigner,
  PageOrganizer
]);

const addTextStamp = () => {
  const viewer = pdfviewer.value?.ej2Instances;
  if (!viewer) return;

  viewer.annotation.addAnnotation('Stamp', {
    offset: { x: 100, y: 200 },
    pageNumber: 1,
    customTextStamps: [{
      title: 'Draft',
      subtitle: '[$author] DD/MMMM/YYYY, h:mm A',
      bold: true,
      textColor: '#000000',
      backgroundColor: '#1693f8',
      underline: true,
      fontFamily: 'Arial',
      strikeout: true
    }]
  });
};

let imageStampDataUrl;
const loadImageStamp = async () => {
  if (imageStampDataUrl) return imageStampDataUrl;

  const response = await fetch(`${import.meta.env.BASE_URL}custom-stamp.png`);
  if (!response.ok) throw new Error('Unable to load custom stamp image.');

  const imageBlob = await response.blob();
  imageStampDataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(imageBlob);
  });

  return imageStampDataUrl;
};

const addImageStamp = async () => {
  const viewer = pdfviewer.value?.ej2Instances;
  if (!viewer) return;

  viewer.annotation.addAnnotation('Stamp', {
    offset: { x: 100, y: 300 },
    pageNumber: 1,
    width: 160,
    height: 80,
    customStamps: [{
      customStampName: 'Image',
      customStampImageSource: await loadImageStamp()
    }]
  });
};

</script>

<style scoped>
.pdf-viewer-container {
  margin: 50px 90px;
}

.stamp-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
</style>