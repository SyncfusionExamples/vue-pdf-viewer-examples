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
import { ComboBox } from "@syncfusion/ej2-dropdowns";
import { TextBox } from "@syncfusion/ej2-inputs";         

var viewer;
export default {
  name: 'App',
  components: {
    "ejs-pdfviewer": PdfViewerComponent
  },
  data () {
    // Move the toolItem declaration inside the data function
    var toolItem1 = {
      prefixIcon: 'e-icons e-paste',
      id: 'print',
      tooltipText: 'Custom toolbar item',
      align: 'left'
    };
    var toolItem2 = {
    id: 'download',
    text: 'Save',
    tooltipText: 'Custom toolbar item',
    align: 'right'
    };
    var LanguageList = ['Typescript', 'Javascript', 'Angular', 'C#', 'C', 'Python'];
    var toolItem3 = {
        type: 'Input',
        tooltipText: 'Language List',
        cssClass: 'percentage',
        align: 'Left',
        id: 'dropdown',
        template: new ComboBox({ width: 100, value: 'TypeScript', dataSource: LanguageList, popupWidth: 85, showClearButton: false, readonly: false })  
    };
    var toolItem4 = {
        type: 'Input',
        tooltipText: 'Text',
        align: 'Right',
        cssClass: 'find',
        id: 'textbox',
        template: new TextBox({ width: 125, placeholder: 'Type Here'})
    }
    return {
      documentPath: "https://cdn.syncfusion.com/content/pdf/form-designer.pdf",
      resourceUrl: "https://cdn.syncfusion.com/ej2/24.1.41/dist/ej2-pdfviewer-lib",
      toolbarSettings: {
        toolbarItems: [toolItem1, toolItem2, 'OpenOption', 'PageNavigationTool', 'MagnificationTool', toolItem3, 'PanTool', 'SelectionTool', 'SearchOption', 'PrintOption', 'DownloadOption', 'UndoRedoTool', 'AnnotationEditTool', 'FormDesignerEditTool', toolItem4, 'CommentTool', 'SubmitForm']
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
        if (args.item && args.item.id === 'print') {
          viewer.printModule.print();
        }
        else if (args.item && args.item.id === 'download') {
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
  @import "../node_modules/@syncfusion/ej2-pdfviewer/styles/material.css";
</style>
