const generateID = length => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const renderInDom = (Pollen, DomNode) => {
  if (typeof window !== "undefined") {
    console.log(Pollen.render(), Pollen);
    DomNode.innerHTML = Pollen.render();
  }
};

module.exports = {
  generateID,
  renderInDom
};
