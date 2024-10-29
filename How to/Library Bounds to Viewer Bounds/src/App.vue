<template>
  <div id="app">
    <ejs-pdfviewer
      id="pdfViewer"
      ref="pdfviewer"
      :documentPath="documentPath"
      :serviceUrl="serviceUrl"
      style="height: 640px;"
      @ajaxRequestSuccess="handleAjaxRequestSuccess"
      @exportSuccess="handleExportSuccess"
    >
    </ejs-pdfviewer>
  </div>
</template>

<script>
import { PdfViewerComponent, Toolbar, Magnification, Navigation, 
         Annotation, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer } from '@syncfusion/ej2-vue-pdfviewer';

export default {
  name: 'App',
  components: {
    'ejs-pdfviewer': PdfViewerComponent
  },
  data() {
    return {
      documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
      serviceUrl: "https://services.syncfusion.com/js/production/api/pdfviewer",
      pageSizes: []
    };
  },
  provide: {
    PdfViewer: [Toolbar, Magnification, Navigation, Annotation, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer]
  },
  methods: {
    handleAjaxRequestSuccess(args) {
      if (args.action === 'Load') {
        const objLength = Object.keys(args.data.pageSizes).length;
        for (let x = 0; x < objLength; x++) {
          const pageSize = args.data.pageSizes[x];
          this.pageSizes.push(pageSize);
        }
      }
    },
    handleExportSuccess(args) {
      const blobURL = args.exportData;
      // Converting the exported blob into an object
      this.convertBlobURLToObject(blobURL)
        .then((objectData) => {
          console.log(objectData);
          const shapeAnnotationData = objectData.pdfAnnotation[0].shapeAnnotation;
          shapeAnnotationData.forEach(data => {
            if (data && data.rect && parseInt(data.rect.width)) {
              const pageHeight = this.pageSizes[parseInt(data.page)].Height;

              // Converting PDF Library values into PDF Viewer values.
              const rect = {
                x: (parseInt(data.rect.x) * 96) / 72,
                y: (parseInt(pageHeight) * 72 / 96 - parseInt(data.rect.height)) * 96 / 72,
                width: (parseInt(data.rect.width) - parseInt(data.rect.x)) * 96 / 72,
                height: (parseInt(data.rect.height) - parseInt(data.rect.y)) * 96 / 72,
              };

              console.log(data.name);
              console.log(rect);
              console.log("-------------------------");
            }
          });
        })
        .catch((error) => {
          console.error('Error converting Blob URL to object:', error);
        });
    },
    convertBlobURLToObject(blobURL) {
      return fetch(blobURL)
        .then((response) => response.blob())
        .then((blobData) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(JSON.parse(reader.result));
            };
            reader.onerror = reject;
            reader.readAsText(blobData);
          });
        });
    }
  }
}
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
