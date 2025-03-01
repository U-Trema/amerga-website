export const serializer = (type: any, node: any, text: any, children: any, key: any) => {
  switch (type) {
    case "paragraph": {
      if (node.spans.length === 0) return { element: "p", text };
      return { element: "p", text, label: node.spans[0].data.label };
    }
  }
};
