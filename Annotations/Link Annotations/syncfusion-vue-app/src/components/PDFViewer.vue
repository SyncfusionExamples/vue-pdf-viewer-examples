<template>
  <div class="pdf-viewer-container">
  <button v-on:click="addInternalLink">Add internal page link</button>
  <button v-on:click="addExternalLink">Add external link</button>
  <button v-on:click="editLinkAnnotation">Edit Link</button>
  <button v-on:click="deleteLinkById">Delete Link Annotation</button>
    <ejs-pdfviewer
      id="container"
      ref="pdfviewer"
      :documentPath="documentPath"
      :resourceUrl="resourceUrl"
      :style="{ height: '640px', display: 'block' }"
      :hyperlinkOpenState="hyperlinkOpenState"
    >
    </ejs-pdfviewer>
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
  TextSearch,
  Annotation,
  FormFields,
  FormDesigner,
  PageOrganizer
} from '@syncfusion/ej2-vue-pdfviewer';

const pdfviewer = ref(null);
const documentPath = ref('https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf');

const resourceUrl = ref('https://cdn.syncfusion.com/ej2/34.1.29/dist/ej2-pdfviewer-lib');
const hyperlinkOpenState = 'NewTab';

provide('PdfViewer', [
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  TextSearch,
  Annotation,
  FormFields,
  FormDesigner,
  PageOrganizer
]);

const addInternalLink = () => {
  pdfviewer.value.ej2Instances.annotation.addAnnotation('Link', {
    offset: { x: 200, y: 480 },
    pageNumber: 1,
    width: 150,
    height: 75,
    destinationPageIndex: 4,
    destinationLocation: { x: 100, y: 200 },
    zoomValue: 4,
    strokeColor: '#1433e3'
  });
};
const addExternalLink = () => {
  pdfviewer.value.ej2Instances.annotation.addAnnotation('Link', {
    offset: { x: 450, y: 480 },
    pageNumber: 1,
    width: 150,
    height: 75,
    url: 'https://www.syncfusion.com',
    strokeColor: '#FF0000'
  });
};

const editLinkAnnotation = () => {
  const viewer = pdfviewer.value.ej2Instances;
  for (const linkAnnotation of viewer.annotationCollection) {
    if (linkAnnotation.subject === 'Link') {
      linkAnnotation.strokeColor = '#1fcbd4';
      linkAnnotation.thickness = 2;
      linkAnnotation.bounds = { left: 100, top: 100, width: 100, height: 100 };
      linkAnnotation.url = 'https://www.google.com';
      linkAnnotation.destinationPageIndex = 3;
      linkAnnotation.destinationLocation = { x: 300, y: 300 };
      linkAnnotation.zoomValue = 1;
      viewer.annotation.editAnnotation(linkAnnotation);
      break;
    }
  }
};

const deleteLinkById = () => {
  const viewer = pdfviewer.value.ej2Instances;
  const linkAnnotation = viewer.annotationCollection.find((item) => item.subject === 'Link');

  if (linkAnnotation) {
    viewer.annotation.deleteAnnotationById(linkAnnotation.annotationId);
  }
};

</script>

<style scoped>
.pdf-viewer-container {
  margin: 50px 90px;
}
</style>