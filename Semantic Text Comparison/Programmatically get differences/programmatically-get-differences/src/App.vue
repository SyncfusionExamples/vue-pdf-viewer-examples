<template>
  <div style="height: 100vh; width: 100%; display: flex; flex-direction: column;">
    <!-- Control Panel with Test Buttons -->
    <div
      style="
        display: flex;
        gap: 8px;
        padding: 12px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #ddd;
        flex-wrap: wrap;
        align-items: center;
      "
    >
      <!-- Main Control Buttons -->
      <button
        @click="handleCompare"
        style="
          padding: 8px 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
        "
      >
        Compare Documents
      </button>
      <button
        @click="handleToggleHighlights"
        style="
          padding: 8px 16px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
        "
      >
        {{ highlightsEnabled ? 'Disable Highlights' : 'Enable Highlights' }}
      </button>
      <button
        @click="handleToggleSync"
        style="
          padding: 8px 16px;
          background-color: #ffc107;
          color: black;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
        "
      >
        {{ synchronizationEnabled ? 'Disable Sync' : 'Enable Sync' }}
      </button>
      <button
        @click="handleClearAnnotations"
        style="
          padding: 8px 16px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
        "
      >
        Clear Annotations
      </button>

      <!-- Separator -->
      <div style="width: 1px; height: 24px; background-color: #ccc; margin: 0 8px;"></div>

      <!-- Test Buttons -->
      <button
        @click="getDifferencesByType('Added')"
        style="
          padding: 8px 16px;
          background-color: #17a2b8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
        "
      >
        Test: Get Added
      </button>
      <button
        @click="getDifferencesByType('Deleted')"
        style="
          padding: 8px 16px;
          background-color: #17a2b8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
        "
      >
        Test: Get Deleted
      </button>
      <button
        @click="getDifferencesByType('Modified')"
        style="
          padding: 8px 16px;
          background-color: #17a2b8;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
        "
      >
        Test: Get Modified
      </button>
      <button
        @click="groupDifferencesByPage"
        style="
          padding: 8px 16px;
          background-color: #6c757d;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
        "
      >
        Test: Group by Page
      </button>
      <button
        @click="generateReport"
        style="
          padding: 8px 16px;
          background-color: #6c757d;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
        "
      >
        Test: Generate Report
      </button>
    </div>

    <!-- PDF Viewers Container -->
    <div style="display: flex; flex: 1; gap: 0; overflow: hidden;">
      <!-- Viewer 1 - Original Document -->
      <div style="width: 50%; height: 100%; border-right: 1px solid #ccc;">
        <ejs-pdfviewer
          ref="viewer1Ref"
          id="pdfViewer1"
          documentPath="https://cdn.syncfusion.com/content/pdf/original-document.pdf"
          :resourceUrl="resourceUrl"
          @documentLoad="handleDocumentLoad"
          style="height: 100%; width: 100%;"
        >
        </ejs-pdfviewer>
      </div>

      <!-- Viewer 2 - Modified Document -->
      <div style="width: 50%; height: 100%;">
        <ejs-pdfviewer
          ref="viewer2Ref"
          id="pdfViewer2"
          documentPath="https://cdn.syncfusion.com/content/pdf/modified-document.pdf"
          :resourceUrl="resourceUrl"
          @documentLoad="handleDocumentLoad"
          style="height: 100%; width: 100%;"
        >
        </ejs-pdfviewer>
      </div>
    </div>
  </div>
</template>

<script>
import {
  PdfViewerComponent,
  Toolbar,
  Magnification,
  Navigation,
  Annotation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  TextSearch,
  FormFields,
  FormDesigner,
  PageOrganizer
} from '@syncfusion/ej2-vue-pdfviewer';

export default {
  name: 'App',

  components: {
    'ejs-pdfviewer': PdfViewerComponent
  },

  provide() {
    return {
      PdfViewer: [
        Toolbar,
        Magnification,
        Navigation,
        Annotation,
        LinkAnnotation,
        BookmarkView,
        ThumbnailView,
        Print,
        TextSelection,
        TextSearch,
        FormFields,
        FormDesigner,
        PageOrganizer
      ]
    };
  },

  data() {
    return {
      resourceUrl: 'https://cdn.syncfusion.com/ej2/34.2.4/dist/ej2-pdfviewer-lib',
      loadedCount: 0,
      viewersLoaded: false,
      synchronizationEnabled: true,
      highlightsEnabled: true
    };
  },

  methods: {
    getViewer1() {
      return this.$refs.viewer1Ref?.ej2Instances || null;
    },

    getViewer2() {
      return this.$refs.viewer2Ref?.ej2Instances || null;
    },

    handleDocumentLoad() {
      this.loadedCount += 1;
      if (this.loadedCount === 2) {
        const viewer1 = this.getViewer1();
        const viewer2 = this.getViewer2();
        if (viewer1 && viewer2) {
          this.viewersLoaded = true;
          viewer1.syncViewers(viewer2, this.synchronizationEnabled);
        }
      }
    },

    handleToggleSync() {
      this.synchronizationEnabled = !this.synchronizationEnabled;
      const viewer1 = this.getViewer1();
      const viewer2 = this.getViewer2();
      if (viewer1 && viewer2) {
        viewer1.syncViewers(viewer2, this.synchronizationEnabled);
      }
    },

    async handleToggleHighlights() {
      this.highlightsEnabled = !this.highlightsEnabled;
      const viewer1 = this.getViewer1();
      const viewer2 = this.getViewer2();
      // Re-apply comparison with updated highlight state
      if (this.viewersLoaded && viewer1 && viewer2) {
        const options = {
          beforeColor: '#FF0000',
          afterColor: '#00FF00',
          beforeColorOpacity: 0.4,
          afterColorOpacity: 0.4,
          enableHighlights: this.highlightsEnabled
        };
        try {
          // Clear previous comparison
          viewer1.removeSemanticTextCompare?.(viewer2);
          // Apply new comparison with updated highlights state
          const result = await viewer1.semanticTextCompare(viewer2, options);
          console.log('Highlights updated:', result);
        } catch (error) {
          console.error('Error updating highlights:', error);
        }
      }
    },

    handleClearAnnotations() {
      const viewer1 = this.getViewer1();
      const viewer2 = this.getViewer2();
      if (viewer1 && viewer2) {
        viewer1.removeSemanticTextCompare?.(viewer2);
      }
    },

    async getDifferencesByType(type) {
      const viewer1 = this.getViewer1();
      const viewer2 = this.getViewer2();
      if (!viewer1 || !viewer2) return [];
      const options = {
        beforeColor: '#FF0000',
        afterColor: '#00FF00',
        beforeColorOpacity: 0.4,
        afterColorOpacity: 0.4,
        enableHighlights: true
      };
      try {
        const result = await viewer1.semanticTextCompare(viewer2, options);
        const originalAnnotations = result?.originalDocumentAnnotations || [];
        const modifiedAnnotations = result?.modifiedDocumentAnnotations || [];
        const differences = [];

        // Extract differences by type from original annotations
        originalAnnotations.forEach((pageAnnotations) => {
          pageAnnotations.differenceAnnotations?.forEach((diff) => {
            if (diff.textDiffType === type.toLowerCase()) {
              differences.push({
                pageNumber: pageAnnotations.pageNumber,
                type: diff.textDiffType,
                text: diff.textDiffData,
                bounds: diff.annotation?.bounds,
                color: diff.annotation?.color
              });
            }
          });
        });

        // Extract differences by type from modified annotations
        modifiedAnnotations.forEach((pageAnnotations) => {
          pageAnnotations.differenceAnnotations?.forEach((diff) => {
            if (diff.textDiffType === type.toLowerCase()) {
              // Avoid duplicates by checking if already exists
              const exists = differences.find(
                (d) => d.pageNumber === pageAnnotations.pageNumber && d.text === diff.textDiffData
              );
              if (!exists) {
                differences.push({
                  pageNumber: pageAnnotations.pageNumber,
                  type: diff.textDiffType,
                  text: diff.textDiffData,
                  bounds: diff.annotation?.bounds,
                  color: diff.annotation?.color
                });
              }
            }
          });
        });

        console.log(`${type} differences (${differences.length}):`, differences);
        return differences;
      } catch (error) {
        console.error('Error filtering differences:', error);
        return [];
      }
    },

    async groupDifferencesByPage() {
      const viewer1 = this.getViewer1();
      const viewer2 = this.getViewer2();
      if (!viewer1 || !viewer2) return {};
      const options = {
        beforeColor: '#FF0000',
        afterColor: '#00FF00',
        beforeColorOpacity: 0.4,
        afterColorOpacity: 0.4,
        enableHighlights: true
      };
      try {
        const result = await viewer1.semanticTextCompare(viewer2, options);
        const originalAnnotations = result?.originalDocumentAnnotations || [];
        const modifiedAnnotations = result?.modifiedDocumentAnnotations || [];
        const grouped = {};

        // Group original document differences by page
        originalAnnotations.forEach((pageAnnotations) => {
          const pageNum = pageAnnotations.pageNumber;
          if (!grouped[pageNum]) {
            grouped[pageNum] = { original: [], modified: [] };
          }
          pageAnnotations.differenceAnnotations?.forEach((diff) => {
            grouped[pageNum].original.push({
              type: diff.textDiffType,
              text: diff.textDiffData,
              bounds: diff.annotation?.bounds,
              color: diff.annotation?.color
            });
          });
        });

        // Group modified document differences by page
        modifiedAnnotations.forEach((pageAnnotations) => {
          const pageNum = pageAnnotations.pageNumber;
          if (!grouped[pageNum]) {
            grouped[pageNum] = { original: [], modified: [] };
          }
          pageAnnotations.differenceAnnotations?.forEach((diff) => {
            grouped[pageNum].modified.push({
              type: diff.textDiffType,
              text: diff.textDiffData,
              bounds: diff.annotation?.bounds,
              color: diff.annotation?.color
            });
          });
        });

        console.log('Differences grouped by page:', grouped);
        return grouped;
      } catch (error) {
        console.error('Error grouping differences:', error);
        return {};
      }
    },

    async handleCompare() {
      const viewer1 = this.getViewer1();
      const viewer2 = this.getViewer2();
      if (!this.viewersLoaded || !viewer1 || !viewer2) {
        return;
      }
      const options = {
        beforeColor: '#FF0000', // Red for original
        afterColor: '#00FF00', // Green for modified
        beforeColorOpacity: 0.4,
        afterColorOpacity: 0.4,
        enableHighlights: this.highlightsEnabled
      };
      try {
        const result = await viewer1.semanticTextCompare(viewer2, options);
        console.log('Full Comparison Result:', result);

        // Parse the result structure properly
        const originalAnnotations = result?.originalDocumentAnnotations || [];
        const modifiedAnnotations = result?.modifiedDocumentAnnotations || [];
        const totalTextDiffCount = result?.totalTextDiffCount || 0;

        console.log('Total Text Differences:', totalTextDiffCount);
        console.log('Original Document Pages:', originalAnnotations.length);
        console.log('Modified Document Pages:', modifiedAnnotations.length);

        // Extract and categorize all differences
        let addedCount = 0;
        let deletedCount = 0;
        let modifiedCount = 0;

        // Process original document annotations (deletions and modifications)
        originalAnnotations.forEach((pageAnnotations) => {
          const pageNum = pageAnnotations.pageNumber;
          console.log(`\nOriginal Document - Page ${pageNum}:`);
          pageAnnotations.differenceAnnotations?.forEach((diff) => {
            const type = diff.textDiffType; // "deleted", "modified", "added"
            const text = diff.textDiffData;
            if (type === 'deleted') deletedCount++;
            if (type === 'modified') modifiedCount++;
            if (type === 'added') addedCount++;
            console.log(`  - ${type.toUpperCase()}: "${text?.substring(0, 50)}..."`);
          });
        });

        // Process modified document annotations (additions and modifications)
        modifiedAnnotations.forEach((pageAnnotations) => {
          const pageNum = pageAnnotations.pageNumber;
          console.log(`\nModified Document - Page ${pageNum}:`);
          pageAnnotations.differenceAnnotations?.forEach((diff) => {
            const type = diff.textDiffType; // "deleted", "modified", "added"
            const text = diff.textDiffData;
            if (type === 'added' && !addedCount) addedCount++; // Count only once
            if (type === 'modified' && !modifiedCount) modifiedCount++; // Count only once
            console.log(`  - ${type.toUpperCase()}: "${text?.substring(0, 50)}..."`);
          });
        });

        // Summary
        console.log('\n=== COMPARISON SUMMARY ===');
        console.log(`Total Differences: ${totalTextDiffCount}`);
        console.log(`Deleted: ${deletedCount}`);
        console.log(`Added: ${addedCount}`);
        console.log(`Modified: ${modifiedCount}`);
      } catch (error) {
        console.error('Error during comparison:', error);
      }
    },

    async generateReport() {
      const viewer1 = this.getViewer1();
      const viewer2 = this.getViewer2();
      if (!viewer1 || !viewer2) return;
      const options = {
        beforeColor: '#FF0000',
        afterColor: '#00FF00',
        beforeColorOpacity: 0.4,
        afterColorOpacity: 0.4,
        enableHighlights: true
      };
      try {
        const result = await viewer1.semanticTextCompare(viewer2, options);
        const originalAnnotations = result?.originalDocumentAnnotations || [];
        const modifiedAnnotations = result?.modifiedDocumentAnnotations || [];
        const totalTextDiffCount = result?.totalTextDiffCount || 0;

        let addedCount = 0;
        let deletedCount = 0;
        let modifiedCount = 0;
        const byPage = {};

        // Process all annotations
        originalAnnotations.forEach((pageAnnotations) => {
          const pageNum = pageAnnotations.pageNumber;
          if (!byPage[pageNum]) {
            byPage[pageNum] = { deleted: 0, added: 0, modified: 0, details: [] };
          }
          pageAnnotations.differenceAnnotations?.forEach((diff) => {
            const type = diff.textDiffType;
            if (type === 'deleted') {
              deletedCount++;
              byPage[pageNum].deleted++;
            } else if (type === 'added') {
              addedCount++;
              byPage[pageNum].added++;
            } else if (type === 'modified') {
              modifiedCount++;
              byPage[pageNum].modified++;
            }
            byPage[pageNum].details.push({
              type,
              text: diff.textDiffData?.substring(0, 100),
              color: diff.annotation?.color
            });
          });
        });

        modifiedAnnotations.forEach((pageAnnotations) => {
          const pageNum = pageAnnotations.pageNumber;
          if (!byPage[pageNum]) {
            byPage[pageNum] = { deleted: 0, added: 0, modified: 0, details: [] };
          }
          pageAnnotations.differenceAnnotations?.forEach((diff) => {
            const type = diff.textDiffType;
            if (type === 'deleted') {
              deletedCount++;
              byPage[pageNum].deleted++;
            } else if (type === 'added') {
              addedCount++;
              byPage[pageNum].added++;
            } else if (type === 'modified') {
              modifiedCount++;
              byPage[pageNum].modified++;
            }
            byPage[pageNum].details.push({
              type,
              text: diff.textDiffData?.substring(0, 100),
              color: diff.annotation?.color
            });
          });
        });

        const report = {
          totalDifferences: totalTextDiffCount,
          summary: {
            added: addedCount,
            deleted: deletedCount,
            modified: modifiedCount
          },
          byPage: byPage
        };

        console.log('=== DETAILED COMPARISON REPORT ===');
        console.log(`Total Text Differences: ${report.totalDifferences}`);
        console.log(`Added: ${report.summary.added}`);
        console.log(`Deleted: ${report.summary.deleted}`);
        console.log(`Modified: ${report.summary.modified}`);
        console.log('\nBreakdown by Page:');
        Object.entries(byPage).forEach(([pageNum, data]) => {
          console.log(`  Page ${pageNum}: +${data.added} -${data.deleted} ~${data.modified}`);
        });
        console.log('\nFull Report:', report);
        return report;
      } catch (error) {
        console.error('Error generating report:', error);
      }
    }
  }
};
</script>

<style>
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pdfviewer/index.css';
</style>
