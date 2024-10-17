<template>
    <div id="app">
        <ejs-pdfviewer
            id="pdfViewer"
            ref="pdfviewer"
            :documentPath="documentPath"
            :documentLoad="documentLoad"
            :resourceUrl="resourceUrl"
            :toolbarClick="toolbarClick"
            :toolbarSettings="toolbarSettings">
        </ejs-pdfviewer>
    </div>
</template>
<script>

import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, 
         BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, 
         Annotation, FormDesigner, FormFields, PageOrganizer } from '@syncfusion/ej2-vue-pdfviewer';     
var viewer;
export default {
  name: 'App',
   components: {
      "ejs-pdfviewer": PdfViewerComponent
    },
  data () {
    // Move the toolItem declaration inside the data function
    var toolItem1 = {
    prefixIcon: 'e-icons e-save',
    id: 'download',
    text: 'Save',
    tooltipText: 'Save Button',
    align: 'left'
    };
    return {
      documentPath: "https://cdn.syncfusion.com/content/pdf/form-designer.pdf",
      resourceUrl: "https://cdn.syncfusion.com/ej2/24.1.41/dist/ej2-pdfviewer-lib",
      toolbarSettings: {
        toolbarItems: ['OpenOption', toolItem1, 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'SearchOption', 'PrintOption', 'UndoRedoTool', 'AnnotationEditTool', 'FormDesignerEditTool', 'CommentTool', 'SubmitForm']
      }
    };
  },

  provide: {
    PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, 
                Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields, PageOrganizer ]
  },

  methods: {
    documentLoad: function () {
      viewer = this.$refs.pdfviewer.ej2Instances;
    },
    toolbarClick: function (args) {
        if (args.item && args.item.id === 'download') {
          viewer.download();
        }
    },
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
