<template>
  <div id="app">
    <ejs-pdfviewer
      id="pdfViewer"
      ref="pdfviewer"
      :documentPath="documentPath"
      :serviceUrl="serviceUrl"
      style="height: 640px;"
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
    };
  },
  provide: {
    PdfViewer: [Toolbar, Magnification, Navigation, Annotation, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer]
  },
  methods: {
    handleExportSuccess(args) {
      const blobURL = args.exportData;
      // Converting the exported blob into an object
      this.convertBlobURLToObject(blobURL)
        .then((objectData) => {
          console.log(objectData);
          const shapeAnnotationData = objectData.pdfAnnotation[0].shapeAnnotation;
          shapeAnnotationData.forEach(data => {
            if (data && data.rect && parseInt(data.rect.width)) {
              const pageHeight = this.$refs.pdfviewer.getPageInfo(parseInt(data.page)).height;
              // Converting PDF Library values into PDF Viewer values.
              const rect = {
                x: (parseInt(data.rect.x) * 96) / 72,
                y: (parseInt(pageHeight) - parseInt(data.rect.height)) * 96 / 72,
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
    //Function to convert Blob URL to object 
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
