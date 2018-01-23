export function all(context) {
  context.document.showMessage("Select Children Layer");
  const selection = getSelection();

  if (selection.isEmpty) {
    context.document.showMessage("No layers are selected.");
  } else {
    selection.iterate(item => {
      item.iterate(ite => {
        if (ite.isGroup) {
        } else {
          ite.addToSelection();
        }
      });
      item.deselect();
    });
  }
}

export function groups(context) {
  context.document.showMessage("Select Groups");
  const selection = getSelection();

  if (selection.isEmpty) {
    context.document.showMessage("No layers are selected.");
  } else {
    selection.iterate(layer => {
      if (layer.isGroup) {
        selectChildLayers(layer, "groups");
      }
    });
  }
}

export function images(context) {
  context.document.showMessage("Select Images");
  const selection = getSelection();

  if (selection.isEmpty) {
    context.document.showMessage("No layers are selected.");
  } else {
    selection.iterate(layer => {
      if (layer.isGroup) {
        selectChildLayers(layer, "images");
      }
    });
  }
}

export function shapes(context) {
  context.document.showMessage("Select Shapes");
  const selection = getSelection();

  if (selection.isEmpty) {
    context.document.showMessage("No layers are selected.");
  } else {
    selection.iterate(layer => {
      if (layer.isGroup) {
        selectChildLayers(layer, "shapes");
      }
    });
  }
}

export function texts(context) {
  context.document.showMessage("Select Texts");
  const selection = getSelection();

  if (selection.isEmpty) {
    context.document.showMessage("No layers are selected.");
  } else {
    selection.iterate(layer => {
      if (layer.isGroup) {
        selectChildLayers(layer, "texts");
      }
    });
  }
}

// export function parent(context) {
//   context.document.showMessage("Select Parent");
//   const selection = getSelection();

//   if (selection.isEmpty) {
//     context.document.showMessage("No layers are selected.");
//   } else {
//     selection.iterate(layer => {
//       layer.container.select();
//     });
//   }
// }

function getSelection() {
  const sketch = context.api();
  const document = sketch.selectedDocument;
  const selection = document.selectedLayers;
  return selection;
}

function selectChildLayers(group, filter) {
  // const startingGroupLength = group.length;
  if (filter === "groups") {
    group.iterate(layer => {
      if (layer.isGroup) {
        layer.addToSelection();
      }
    });
  } else if (filter === "images") {
    group.iterate(layer => {
      if (layer.isImage) {
        layer.addToSelection();
      }
    });
  } else if (filter === "shapes") {
    group.iterate(layer => {
      if (layer.isShape) {
        layer.addToSelection();
      }
    });
  } else if (filter === "texts") {
    group.iterate(layer => {
      if (layer.isText) {
        layer.addToSelection();
      }
    });
  } else {
    group.iterate(layer => {
      layer.addToSelection();
    });
  }

  // const selection = getSelection();

  // if (selection.length > startingGroupLength) {
  group.deselect();
  // }
}
