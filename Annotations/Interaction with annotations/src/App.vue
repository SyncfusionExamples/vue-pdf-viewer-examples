
{/*Template to render PDF viewer*/}
<template>
 <div id="app">
  <button id="set">DeleteAnnotation</button>
  <button id="set1">SelectAnnotation</button>
  <ejs-pdfviewer 
    id="pdfViewer" 
    ref="pdfviewer" 
    :documentPath="documentPath" 
    :documentLoad="documentLoad"
    :resourceUrl="resourceUrl"> 
  </ejs-pdfviewer>
  </div>
</template>
<script>
import { 
  PdfViewerComponent, 
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
  FormDesigner, 
  FormFields } from '@syncfusion/ej2-vue-pdfviewer';
var viewer;
export default {
  name: "App",
  components: {
    "ejs-pdfviewer": PdfViewerComponent
  },
  data() {
    return {
      // To set up the **server-backed PDF Viewer** in the app.vue file, include the following serviceUrl. Within the `template`, configure the PDF Viewer by adding the `:serviceUrl="serviceUrl"` attribute inside the <div> element
      //serviceUrl:"https://services.syncfusion.com/vue/production/api/pdfviewer",
      //Sets the PDF document path for initial loading.
      documentPath:'https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf',
      resourceUrl: 'https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib'
    };
  },
  provide: {
    PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields]
  },
  methods: {
    documentLoad: function () {
                   viewer = this.$refs.pdfviewer.ej2Instances;
    //Document loaded with annotation.    
    viewer.annotation.addAnnotation("Volume", {
            offset: { x: 200, y: 810 },
            pageNumber: 1,
            vertexPoints: [{ x: 200, y: 810 }, { x: 200, y: 919 }, { x: 320, y: 919 }, { x: 320, y: 809 }, { x: 200, y: 810 }]
        });
        //Method to delete the annotation          
        document.getElementById('set').addEventListener('click', ()=> {
        viewer.annotationModule.deleteAnnotation();
        });
        //Method to select the annotation
        document.getElementById('set1').addEventListener('click', ()=> {
        viewer.annotationModule.selectAnnotation(viewer.annotationCollection[0].annotationId);     
      });
    }
    
  }
};
</script>
<style>
  @import '../node_modules/@syncfusion/ej2-base/styles/material.css';
  @import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
  @import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';  
  @import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';  
  @import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
  @import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
  @import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
  @import '../node_modules/@syncfusion/ej2-lists/styles/material.css';
  @import '../node_modules/@syncfusion/ej2-vue-pdfviewer/styles/material.css';
  #pdfViewer {
    height: 640px;
  }
</style>
