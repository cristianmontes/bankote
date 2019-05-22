import { PolymerElement, html } from "../../node_modules/@polymer/polymer/polymer-element.js";
import './bbva-quiero.js';
import './bbva-milista.js';

class PageIndexElement extends PolymerElement {
  static get template() {
    return html`
      <style>
          quiero-element{
            margin-left: 20px;
            display:inline-block;
            vertical-align:top;
          }
          milista-element{            
            display:inline-block;
            margin-left: 20px;
            vertical-align:top;
          }
      </style>
      <div>
        <quiero-element></quiero-element>
        <milista-element></milista-element>
        </div>
    `;
  }

}

customElements.define('pageindex-element', PageIndexElement);