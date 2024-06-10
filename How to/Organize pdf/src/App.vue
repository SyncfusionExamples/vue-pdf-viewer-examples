<template>

<div id="app">
  <button v-on:click="openPageOrganizer">Open PageOrganizer Pane</button>
  <button v-on:click="closePageOrganizer">Close PageOrganizer Pane</button>
    <ejs-pdfviewer id="pdfViewer" ref="pdfviewer" :documentPath="documentPath" :documentLoad="documentLoad" :enablePageOrganizer=false :isPageOrganizerOpen=false :pageOrganizerSettings="pageOrganizerSettings" :resourceUrl="resourceUrl">
    </ejs-pdfviewer>
</div>
</template>

<script>
import Vue from 'vue';
import {
    PdfViewerPlugin,
    Toolbar,
    Magnification,
    Navigation,
    LinkAnnotation,
    BookmarkView,
    Annotation,
    ThumbnailView,
    Print,
    TextSelection,
    TextSearch,
    FormFields,
    FormDesigner,
    PageOrganizer
} from '@syncfusion/ej2-vue-pdfviewer';
Vue.use(PdfViewerPlugin);
var isInitialLoading = true;

export default {
    name: 'app',
    data() {
        return {
            resourceUrl: "https://cdn.syncfusion.com/ej2/24.1.41/dist/ej2-pdfviewer-lib",
            documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf",
            pageOrganizerSettings: {
                canDelete: true,
                canInsert: true,
                canRotate: true,
                canCopy: true,
                canRearrange: true
            }
        };
    },
    provide: {
        PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, Annotation,
            ThumbnailView, Print, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer
        ]
    },

    methods: {
        documentLoad: function () {
            var viewer = this.$refs.pdfviewer.ej2Instances;
            if (isInitialLoading) {
                viewer.isPageOrganizerOpen = true;
                isInitialLoading = false;
            } else {
                viewer.isPageOrganizerOpen = false;
            }
        },
        openPageOrganizer: function () {
            var viewer = this.$refs.pdfviewer.ej2Instances;
            // Open Page Organizer panel.
            viewer.pageOrganizer.openPageOrganizer();
        },
        closePageOrganizer: function () {
            var viewer = this.$refs.pdfviewer.ej2Instances;
            // Close Page Organizer panel.
            viewer.pageOrganizer.closePageOrganizer();
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
