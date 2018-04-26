const generateID = length => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const renderInDom = (Node, DomNode) => {
  if (typeof window !== "undefined") {
    DomNode.innerHTML = Node.render();
  }
};

module.exports = {
  generateID,
  renderInDom
};
