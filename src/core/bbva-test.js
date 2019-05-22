import { PolymerElement } from "../../node_modules/@polymer/polymer/polymer-element.js";
import { html } from "../../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import "../../node_modules/@polymer/paper-tabs/paper-tabs.js";
import "../../node_modules/@polymer/paper-tabs/paper-tab.js";

class ExampleElement extends PolymerElement {
  static get template() {
    return html`
      <paper-tabs selected="0" scrollable>
        <paper-tab>Tab 0</paper-tab>
        <paper-tab>Tab 1</paper-tab>
        <paper-tab>Tab 2</paper-tab>
        <paper-tab>Tab 3</paper-tab>
      </paper-tabs>
    `;
  }

}

customElements.define('example-element', ExampleElement);