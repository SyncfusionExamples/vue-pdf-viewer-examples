# Freehand Highlight Annotation in Vue PDF Viewer

This sample demonstrates how to enable, configure, and manage **Freehand Highlight annotations** in the Vue PDF Viewer using the Syncfusion EJ2 PDF Viewer component. Freehand Highlight annotations allow users to draw freehand strokes that behave as text highlights, enabling natural document review, markup, and content emphasis within PDF documents.

## What is covered

- Enabling and disabling Freehand Highlight support dynamically using the `enableFreehandHighlight` property.
- Dynamically adding and removing the **Freehand Highlight** tool from the annotation toolbar.
- Programmatically adding a Freehand Highlight annotation using `addAnnotation('Ink', { ... })`.
- Configuring an Ink annotation as a Freehand Highlight using the `enableInkHighlight` property.
- Creating Freehand Highlight annotations with custom: 
    - `offset`
    - `pageNumber`
    - `width`
    - `height`
    - `path`
- Deleting existing Freehand Highlight annotations programmatically using `deleteAnnotationById()`.
- Accessing and modifying PDF Viewer properties and annotation settings through the Vue component instance (`ej2Instances`).

## Getting Started

```Shell
npm install
```

## Running

The application uses the standard Vue development server and launches the sample in your default browser.

```Shell
npm run dev
```

## Learn more

Refer to the Syncfusion UG documentation for the Vue PDF Viewer Freehand Highlight Annotation feature:

[https://help.syncfusion.com/document\-processing/pdf/pdf\-viewer/vue/getting\-started](https://help.syncfusion.com/document-processing/pdf/pdf-viewer/vue/getting-started)

(UG section: **Freehand Highlight Annotation in Vue PDF Viewer**)