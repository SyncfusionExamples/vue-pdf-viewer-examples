<template>
  <div id="app">
    <ul>
      <ejs-checkbox label='Hide Default Context Menu' id="enable" @change="contextmenuHelper" checked="false"></ejs-checkbox>
      <ejs-checkbox label='Add Custom option at bottom' id="position" @change="contextmenuHelper" checked="false"></ejs-checkbox>
    </ul>
    <ejs-pdfviewer 
      id="pdfViewer" 
      :resourceUrl="resourceUrl" 
      :documentPath="documentPath"
      :documentLoad="documentLoad"
      :customContextMenuBeforeOpen="customContextMenuBeforeOpen"
      :customContextMenuSelect="customContextMenuSelect" > 
    </ejs-pdfviewer>
  </div>
</template>

<script>
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, 
         BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, 
         Annotation, FormDesigner, FormFields, PageOrganizer } from '@syncfusion/ej2-vue-pdfviewer';
import { CheckBoxComponent } from "@syncfusion/ej2-vue-buttons";

export default {
  components: {
    'ejs-pdfviewer': PdfViewerComponent,
    'ejs-checkbox': CheckBoxComponent,
  },
  name: 'app',
  data () {
    return {
      documentPath:"https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
      resourceUrl:"https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib",
      menuItems: [{
        text: 'Search In Google',
        id: 'search_in_google',
        iconCss: 'e-icons e-search'
        },
        {
            text: 'Lock Annotation',
            iconCss: 'e-icons e-lock',
            id: 'lock_annotation'
        },
        {
            text: 'Unlock Annotation',
            iconCss: 'e-icons e-unlock',
            id: 'unlock_annotation'
        },
        {
            text: 'Lock Form Fields',
            iconCss: 'e-icons e-lock',
            id: 'read_only_true'
        },
        {
            text: 'Unlock Form Fields',
            iconCss: 'e-icons e-unlock',
            id: 'read_only_false'
        },
      ]
    };
  },

  provide: {
    PdfViewer: [ Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView,
                 Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer ]
  },
  methods: {
    documentLoad: function () {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      viewer.addCustomMenu(this.menuItems, false, false);
    },
    customContextMenuSelect: function (args) {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      switch (args.id) {
        case 'search_in_google':
          for (var i = 0; i < viewer.textSelectionModule.selectionRangeArray.length; i++) {
            var content = viewer.textSelectionModule.selectionRangeArray[i].textContent;
            if ((viewer.textSelectionModule.isTextSelection) && (/\S/.test(content))) {
              window.open('http://google.com/search?q=' + content);
            }
          }
          break;
        case 'lock_annotation':
          this.lockAnnotations(args);
          break;
        case 'unlock_annotation':
          this.unlockAnnotations(args);
          break;
        case 'read_only_true':
          this.setReadOnlyTrue(args);
          break;
        case 'read_only_false':
          this.setReadOnlyFalse(args);
          break;
        default:
          break;
      }
    },

    customContextMenuBeforeOpen: function (args) {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      for (var i = 0; i < args.ids.length; i++) {
        var search = document.getElementById(args.ids[i]);
        if (search) {
          search.style.display = 'none';
          if (args.ids[i] === 'search_in_google' && (viewer.textSelectionModule) && viewer.textSelectionModule.isTextSelection) {
            search.style.display = 'block';
          } else if (args.ids[i] === "lock_annotation" || args.ids[i] === "unlock_annotation") {
            var isLockOption = args.ids[i] === "lock_annotation";
            for (var j = 0; j < viewer.selectedItems.annotations.length; j++) {
              var selectedAnnotation = viewer.selectedItems.annotations[j];
              if (selectedAnnotation && selectedAnnotation.annotationSettings) {
                var shouldDisplay = (isLockOption && !selectedAnnotation.annotationSettings.isLock) ||
                  (!isLockOption && selectedAnnotation.annotationSettings.isLock);
                search.style.display = shouldDisplay ? 'block' : 'none';
              }
            }
          } else if ((args.ids[i] === "read_only_true" || args.ids[i] === "read_only_false") && viewer.selectedItems.formFields.length !== 0) {
            var isReadOnlyOption = args.ids[i] === "read_only_true";
            for (var k = 0; k < viewer.selectedItems.formFields.length; k++) {
              var selectedFormFields = viewer.selectedItems.formFields[k];
              if (selectedFormFields) {
                var selectedFormField = viewer.selectedItems.formFields[k].isReadonly;
                var displayMenu = (isReadOnlyOption && !selectedFormField) || (!isReadOnlyOption && selectedFormField);
                search.style.display = displayMenu ? 'block' : 'none';
              }
            }
          } else if (args.ids[i] === 'formfield properties' && viewer.selectedItems.formFields.length !== 0) {
            search.style.display = 'block';
          }
        }
      }
    },

    lockAnnotations: function (args) {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      for (var i = 0; i < viewer.annotationCollection.length; i++) {
        if (viewer.annotationCollection[i].uniqueKey === viewer.selectedItems.annotations[0].id) {
          viewer.annotationCollection[i].annotationSettings.isLock = true;
          viewer.annotationCollection[i].isCommentLock = true;
          viewer.annotation.editAnnotation(viewer.annotationCollection[i]);
        }
        args.cancel = false;
      }
    },

    unlockAnnotations: function (args) {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      for (var i = 0; i < viewer.annotationCollection.length; i++) {
        if (viewer.annotationCollection[i].uniqueKey === viewer.selectedItems.annotations[0].id) {
          viewer.annotationCollection[i].annotationSettings.isLock = false;
          viewer.annotationCollection[i].isCommentLock = false;
          viewer.annotation.editAnnotation(viewer.annotationCollection[i]);
        }
        args.cancel = false;
      }
    },

    setReadOnlyTrue: function (args) {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      var selectedFormFields = viewer.selectedItems.formFields;
      for (var i = 0; i < selectedFormFields.length; i++) {
        var selectedFormField = selectedFormFields[i];
        if (selectedFormField) {
          viewer.formDesignerModule.updateFormField(selectedFormField, {
            isReadOnly: true,
          });
        }
        args.cancel = false;
      }
    },

    setReadOnlyFalse: function (args) {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      var selectedFormFields = viewer.selectedItems.formFields;
      for (var i = 0; i < selectedFormFields.length; i++) {
        var selectedFormField = selectedFormFields[i];
        if (selectedFormField) {
          viewer.formDesignerModule.updateFormField(selectedFormField, {
            isReadOnly: false,
          });
        }
        args.cancel = false;
      }
    },

    contextmenuHelper: function () {
      var viewer = this.$refs.pdfviewer.ej2Instances;
      viewer.addCustomMenu(this.menuItems, enable.checked, position.checked);
    },
  }
}
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


