import { html, PolymerElement } from "../../node_modules/@polymer/polymer/polymer-element.js";
import { Icon } from "../../node_modules/@material/mwc-icon/mwc-icon.js";
import "../../node_modules/@polymer/paper-input/paper-input.js";
import "../../node_modules/@polymer/paper-card/paper-card.js";
import "../../node_modules/@polymer/paper-button/paper-button.js";
import "../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu-light.js";
import "../../node_modules/@polymer/paper-item/paper-item.js";
import "../../node_modules/@polymer/paper-listbox/paper-listbox.js";
import "../../node_modules/@polymer/iron-icon/iron-icon.js";
import "../../node_modules/@polymer/iron-icons/iron-icons.js";
import "../../node_modules/@polymer/paper-spinner/paper-spinner.js";
import "../../node_modules/@polymer/iron-ajax/iron-ajax.js";
import "../../node_modules/@polymer/paper-dialog/paper-dialog.js";
import './bbvaregistro-app.js';
import { Globals } from '../core/globals.js';
/**
 * @customElement
 * @polymer
 */

class LoginElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host{
          justify-content: center;
          /*background: #d2d6de;
          display: flex;
          
          margin: 0 auto;
          margin-bottom:0px;
          background: url("src/images/fondo.png") center center fixed;
          background-size: cover;*/
        }
        
        /*
        :host {
          display: block;
        }
        paper-dropdown-menu {
          width: 100% !important;
        }
        paper-listbox{
          width: 100% !important;
        }*/
        .login {
            width: 300px; margin: 0 auto;
            top: 40px;
            border-radius:  30px 0px 30px 0px;
        }
        paper-dropdown-menu {
          width: 100% !important;
        }

        paper-button.accept {
          background-color: #0040ff;
          color: white;
          --paper-button-raised-keyboard-focus: {
            background-color: #0000ff !important;
            color: white !important;
          };
        }
        paper-button.accept:hover {
          background-color: #0000ff !important;
          color: white !important;
        }

        .imgbkground {
          position: fixed; 
          top: 0; 
          left: 0;           
          /* Preserve aspet ratio */
          min-width: 100%;
          min-height: 100%;
        }

        .centrado{
          margin: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }
        .avregistrar{
          display: block;
          margin-bottom: 10px;
          margin-top: 10px;
          margin-left: 10px;
          font-size: 14px;
          opacity: 0.85;
        }
      </style>
      <img src="src/images/fondo.png" class="imgbkground" alt="">
      <paper-card heading="Acceso al Sistema" alt="Login" class="login centrado">
      <div class="card-content">
      <paper-dropdown-menu label="Tipo de Documento" vertical-offset="60"
        value="{{tipodocumento}}" selected-item-changed="evalua">
        <paper-listbox slot="dropdown-content" class="dropdown-content"
          attr-for-selected="value" selected='L'>
          <paper-item value="L">DNI</paper-item>
          <paper-item value="R">RUC</paper-item>
          <paper-item value="P">Pasaporte</paper-item>
          <paper-item value="C">Carnet de Extranjeria</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      

        <paper-input label="Nro Documento" value="{{numerodocumento}}"></paper-input>
        <paper-input label="Password" type="password" value="{{contrasena}}"></paper-input>
      </div>
      <div class="card-actions" align="right">
      <paper-spinner alt="Procesando" active="{{cargando}}"></paper-spinner>
      <paper-button toggles raised class="accept" on-click="login">
          <iron-icon icon="check"></iron-icon>Aceptar</paper-button>
      </div>
      
      <div class="avregistrar">
      <span>Aún no eres Cliente? Registrate <a href="#" on-click="abreregistro">aquí</a></span>      
      </div>
    </paper-card>
    
    
    <paper-dialog id="errormodal" modal>
      <h2>Mensaje</h2>
      <p>{{mensaje}}</p>
      <div class="buttons">
        <paper-button dialog-confirm autofocus>Cerrar</paper-button>
      </div>
    </paper-dialog>
    
    <iron-ajax
        id="loginajax"
        url= [[urlreq]] 
        handle-as="json"
        loading="{{cargando}}"
        method="POST"
        content-type="application/json"
        on-response="loginCorrecto"
        on-error="loginInCorrecto"
        debounce-duration="500">
    </iron-ajax>
    <registrousuario-element registronuevo={{registronuevo}}></registrousuario-element>
    `;
  }

  static get properties() {
    return {
      cargando: {
        type: Boolean,
        value: false
      },
      tipodocumento: {
        type: Object
      },
      numerodocumento: {
        type: String,
        value: "45454555555"
      },
      contrasena: {
        type: String,
        value: "123450"
      },
      mensaje: {
        type: String,
        value: ""
      },
      autenticado: {
        type: Boolean
      },
      urlreq: {
        type: String,
        value: Globals.urlbaseback + "usuario/login"
      },
      registronuevo: {
        type: Boolean,
        value: false
      }
    };
  }
  /*
    registronuevo-changed(){
      console.log('cambio...... ' + this.registronuevo);
    }*/


  evalua(event) {
    console.log(event);
  }

  login() {
    this.cargando = true;
    var jrequest = {
      "tipodocumento": "L",
      //this.tipodocumento,
      "numerodocumento": this.numerodocumento,
      "clave": this.contrasena
    };
    this.$.loginajax.body = jrequest;
    this.$.loginajax.generateRequest();
  }

  loginCorrecto(event, request) {
    //this.autenticado = true;
    console.log(event.detail.response.mensaje);
    this.dispatchEvent(new CustomEvent('conexionOk', {
      bubbles: true,
      composed: true,
      detail: event.detail.response.mensaje
    }));
  }

  loginInCorrecto(event, error) {
    if (event.detail.request.xhr.response) {
      this.mensaje = event.detail.request.xhr.response.mensaje;
    } else {
      this.mensaje = "Error Interno";
    }

    this.$.errormodal.opened = true; //errormodal.open();
  }

  abreregistro() {
    this.registronuevo = true;
  }

}

window.customElements.define('login-element', LoginElement);