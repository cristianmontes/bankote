import { PolymerElement, html } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "../../node_modules/@polymer/iron-icons/iron-icons.js";
import "../../node_modules/@polymer/iron-icons/social-icons.js";
import "../../node_modules/@polymer/app-layout/app-layout.js";
import "../../node_modules/@polymer/paper-icon-button/paper-icon-button.js";
import "../../node_modules/@polymer/iron-icons/hardware-icons.js";
import './bbva-drawer.js';
import { Globals } from './globals.js';

class ToolBarElement extends PolymerElement {
  static get template() {
    return html`
      <style>
          app-header {
            display: block;
            background-color: #ffffff;
            color: #000;
            border-top: 6px solid #0066ff;
            border-bottom: 1px solid #80aaff;
          }
          app-header paper-icon-button {
            --paper-icon-button-ink-color: #fff;
          }
      </style>
      <app-header-layout>
        <app-header effects="waterfall" slot="header">
          <app-toolbar>
            
            <div class="navItem leftItem">
              <paper-icon-button id="toggle" icon="menu"></paper-icon-button>
              <paper-icon-button icon="hardware:keyboard-return" on-click="cargarIndex"></paper-icon-button>
            </div>
            <div main-title>
              LOGO
            </div>
                    
            <div class="navItem">
              <paper-icon-button icon="social:notifications" aria-label="Notificaciones"></paper-icon-button>
              <paper-icon-button icon=""></paper-icon-button>
            </div>
            <div>
              [[usersession.persona.nombre]]
              [[Globals.semillaencriptado]]
            </div>
            <paper-icon-button icon="social:person-outline" aria-label="Datos de la persona"></paper-icon-button>
          </app-toolbar>
        </app-header>
        </app-header-layout>
    `;
  }

  static get properties() {
    return {
      usersession: {
        type: Object
      }
    };
  }

  cargarIndex() {
    this.dispatchEvent(new CustomEvent('cargarindex', {
      bubbles: true,
      composed: true,
      detail: {}
    }));
  }

}

customElements.define('toolbar-element', ToolBarElement);