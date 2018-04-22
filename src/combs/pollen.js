const bees = require("../bees");
const { generateID, POLLEN_TYPES } = bees;

class Pollen {
  constructor({ type = "div", attributes = {} }) {
    this.type = type.toLowerCase();
    this.attributes = attributes || {};
    this.children = [];
    this.setContent = this._setContent.bind(this);
    this.setAttribute = this._setAttribute.bind(this);
    this.getAttribute = this._getAttribute.bind(this);
    this.appendChild = this._appendChild.bind(this);
    this.generateId = this._generateId.bind(this);
    this.getId = this._getId.bind(this);
    this.toString = this._toString.bind(this);
    this.render = this._render.bind(this);
  }

  _setContent(content) {
    this.content = content;
  }

  _setAttribute(attribute = "title", value = "example") {
    this.attributes[attribute] = value;
  }

  _getAttribute(attribute = "title", defaultValue = false) {
    return this.attributes[attribute] || defaultValue;
  }

  _appendChild(node) {
    this.children.push(node);
  }

  _generateId() {
    this.id = generateId(10);
    this.setAttribute("id", this.id);
    return this.id;
  }

  _getId() {
    return this.id || this.generateId();
  }

  _toString() {
    let openTag = `<${this.type}`;

    for (let key in this.attributes) {
      openTag += ` ${key}="${this.attributes[key]}"`;
    }

    const selfClose = POLLEN_TYPES.includes(this.type) && !this.children[0];
    openTag += selfClose ? "/>" : ">";

    this.children.forEach(child => {
      openTag += typeof child === "string" ? child : child.toString();
    });

    openTag += selfClose ? "" : `</${this.type}>`;
    return openTag;
  }

  _render() {
    return this.toString();
  }
}

module.exports = Pollen;
