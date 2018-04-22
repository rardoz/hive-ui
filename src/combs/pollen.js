const bees = require("../bees");
const { generateID, POLLEN_TYPES } = bees;

class Pollen {
  constructor({ type = "div", attributes = {} }) {
    this.type = type.toLowerCase();
    this.attributes = attributes || {};
    this.children = [];
  }

  setContent(content) {
    this.content = content;
  }

  setAttribute(attribute = "title", value = "example") {
    this.attributes[attribute] = value;
  }

  getAttribute(attribute = "title", defaultValue = false) {
    return this.attributes[attribute] || defaultValue;
  }

  appendChild(node) {
    this.children.push(node);
  }

  generateId() {
    this.id = generateId(10);
    this.setAttribute("id", this.id);
    return this.id;
  }

  getId() {
    return this.id || this.generateID();
  }

  toString() {
    let openTag = `<${this.type}`;

    for (let key in this.attributes) {
      openTag += ` ${key}="${this.attributes[key]}"`;
    }

    const selfClose = POLLEN_TYPES.includes(this.type) && !this.children[0];
    openTag += selfClose ? "/>" : ">";

    this.children.forEach(child => {
      openTag += child.toString();
    });

    openTag += selfClose ? "" : `</${this.type}>`;
  }

  render() {
    return this.toString();
  }
}

module.exports = Pollen;
