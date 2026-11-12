# Button Form Field in Vue PDF Viewer

This sample demonstrates the **button form field** in the Syncfusion Vue PDF Viewer. It shows how to add button fields programmatically, place button fields interactively using the form designer, update button field properties and actions, and remove button fields.

## What is covered

- **Add a button field programmatically** with `formDesignerModule.addFormField('ButtonField', { ... })`.
- **Place a button field interactively** by switching the designer into button field mode with `formDesignerModule.setFormFieldMode('ButtonField')`.
- **Update button field properties** such as text, tooltip, alignment, and button actions using `formDesignerModule.updateFormField(...)`.
- **Configure navigation actions** that move to a specific page and location when the button is clicked.
- **Delete a button field** with `formDesignerModule.deleteFormField(...)`.

The fields that are placed through the PDF Viewer UI are listed in the edit panel as well, so a field can be modified or removed regardless of how it was created.

## Supported button actions

| Action | Description |
| --- | --- |
| `GoTo` | Navigates to a specified page and location in the PDF document. |

## Add a button field programmatically

```javascript
viewer.formDesignerModule.addFormField('ButtonField', {
  name: 'Submit1',
  pageNumber: 1,
  bounds: {
    X: 100,
    Y: 350,
    Width: 120,
    Height: 32
  },
  value: 'Submit',
  text: 'Submit',
  tooltip: 'Click to submit',
  actions: {
    mouseUp: {
      action: ActionType.GoTo,
      destinationPageNumber: 5,
      destinationLocation: {
        x: 100,
        y: 100
      },
      zoomValue: 2
    }
  }
});
```

## Place a button field interactively

```javascript
viewer.formDesignerModule.setFormFieldMode('ButtonField');
```

After the mode is active, click on the page to place a button field.

## Update an existing button field

```javascript
viewer.formDesignerModule.updateFormField(field, {
  value: 'Submit Button',
  text: 'Submit Button',
  alignment: 'Left',
  tooltip: 'Updated Submit Button',
  actions: {
    mouseUp: {
      action: ActionType.GoTo,
      destinationPageNumber: 7,
      destinationLocation: {
        x: 100,
        y: 100
      },
      zoomValue: 1
    }
  }
});
```

## Configure a button action

```javascript
actions: {
  mouseUp: {
    action: ActionType.GoTo,
    destinationPageNumber: 7,
    destinationLocation: {
      x: 100,
      y: 100
    },
    zoomValue: 1
  }
}
```

When the button is clicked, the PDF Viewer navigates to the specified page and location in the document.

## Remove a button field

```javascript
viewer.formDesignerModule.deleteFormField(field);
```

## Run the sample

```bash
npm install
npm run dev
```

Once the sample is running, use the **Add button field programmatically** panel to create button fields, **Enable Button Designer Mode** to place button fields interactively, and the **Edit button field** panel to update or delete existing button fields.

## Learn more

- https://help.syncfusion.com/document-processing/pdf/pdf-viewer/vue/getting-started
- https://ej2.syncfusion.com/vue/documentation/api/pdfviewer/formdesigner