# Callout Annotation in Vue PDF Viewer

This sample demonstrates how to enable, add, customize, and manage **Callout annotations** in the Vue PDF Viewer using the Syncfusion EJ2 PDF Viewer component. Callout annotations let users place an editable text box on a PDF page and connect it to a target point with one or more callout leader lines — ideal for review notes, labels, and call-outs that reference specific areas of a document without altering the original content.

## What is covered

- Enabling Callout annotations in the PDF Viewer (injecting `Annotation` and `Toolbar` modules).
- Switching to Callout Annotation mode programmatically (`setAnnotationMode('Callout')`).
- Exiting Callout Annotation mode (`setAnnotationMode('None')`).
- Adding a Callout annotation programmatically with `addAnnotation('Callout', { ... })`, including:
  - `offset`, `pageNumber`
  - `calloutLines` (the ordered leader-line path)
  - `lineEndingStyle`, `borderColor`, `borderWidth`, `borderStyle`
  - `opacity`, `author`

## Run the sample

```bash
npm install
npm run dev
```

## Learn more

Refer to the Syncfusion UG documentation for the Vue PDF Viewer Callout Annotation feature:

`https://help.syncfusion.com/document-processing/pdf/pdf-viewer/vue/getting-started` (UG section: Callout Annotation in Vue PDF Viewer)