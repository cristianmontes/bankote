import { PolymerElement, html } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "../../node_modules/@polymer/app-route/app-location.js";
import "../../node_modules/@polymer/app-route/app-route.js";
import "../../node_modules/@polymer/iron-pages/iron-pages.js";
import './bbvalogin-app.js';
import './bbvaindex-app.js';

class BBVAMainApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        
      </style>
      <template is="dom-if" if="[[!authenticated]]">
        <login-element class="centrado" autenticado=[[authenticated]]></login-element>
      </template>
      <template is="dom-if" if="[[authenticated]]">
        <index-element usersession=[[usersession]]></index-element>
      </template>
      
       

    `;
  }

  static get properties() {
    return {
      authenticated: {
        type: Boolean,
        value: false
      },
      usersession: {
        type: Object
      }
    };
  }

  ready() {
    super.ready();
    this.addEventListener('conexionOk', this.conexionOk);
    console.log(sessionStorage.getItem("user-bbva-session"));

    if (sessionStorage.getItem("user-bbva-session")) {
      this.authenticated = true;
      this.usersession = JSON.parse(sessionStorage.getItem("user-bbva-session"));
    }
  }

  conexionOk(event) {
    this.authenticated = true;
    console.log(event.detail);
    sessionStorage.setItem("user-bbva-session", event.detail); //this.usersession = "OK";

    this.usersession = JSON.parse(sessionStorage.getItem("user-bbva-session"));
  }
  /*
    cargarDatos(){
      var session = sessionStorage.getItem("user-bbva-session");
  
    }*/

  /*
  initializeDefaultUserSession(){
    usersession
  }*/


}

window.customElements.define('bbvamain-app', BBVAMainApp);