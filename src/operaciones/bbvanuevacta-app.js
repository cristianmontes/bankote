import { html, PolymerElement } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "../../node_modules/@polymer/paper-input/paper-input.js";
import "../../node_modules/@polymer/paper-card/paper-card.js";
import "../../node_modules/@polymer/paper-button/paper-button.js";
import "../../node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "../../node_modules/@polymer/paper-item/paper-item.js";
import "../../node_modules/@polymer/paper-listbox/paper-listbox.js";
import "../../node_modules/@polymer/iron-icons/iron-icons.js";
import "../../node_modules/@polymer/paper-spinner/paper-spinner.js";
import "../../node_modules/@polymer/iron-ajax/iron-ajax.js";
import "../../node_modules/@polymer/paper-dialog/paper-dialog.js";
import { Globals } from '../core/globals.js';
/**
 * @customElement
 * @polymer
 */

class RegistroCuentaElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host{
          justify-content: center;
        }
        

        paper-dropdown-menu {
          width: 100% !important;
        }
        paper-dialog{
            width: 400px;
            margin: 0px;
            border-radius:  5px;
        }
        paper-card{
            width: 100%;
            box-shadow: none;
            margin-top: 0px;
        }
        paper-spinner{
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            z-index:100;
        }
      </style>
        
        <paper-dialog id="crearcuenta" modal opened=[[registronuevo]]>
        <paper-spinner alt="Procesando" active="{{cargando}}"></paper-spinner>
        <h2>Registro de Nueva cuenta</h2>
        
            <paper-card>
                <div class="card-content">

                <paper-dropdown-menu label="Tipo de Cuenta" vertical-offset="60"
                    value="{{nombrecuenta}}"
                    auto-validate error-message="Es obligatorio" >
                    <paper-listbox slot="dropdown-content" selected="0" class="dropdown-content">
                    <paper-item>Cuenta Fácil</paper-item>
                    <paper-item>Cuenta de Ahorros</paper-item>
                    <paper-item>Cuenta Ganadora</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu>
            </div>
            </paper-card>
        </div>
        <div class="buttons">            
            <paper-button autofocus on-click="grabarRegistro">Aceptar</paper-button>
            <paper-button dialog-confirm autofocus on-click="cierraregistro">Cerrar</paper-button>        
        </paper-dialog>
        
        <iron-ajax
            id="altaajax"
            url= [[urlalta]] 
            handle-as="json"
            loading="{{cargando}}"
            method="POST"
            content-type="application/json"
            on-response="altaCorrecta"
            on-error="altaIncorrecta"
            debounce-duration="500">
        </iron-ajax>
    `;
  }

  static get properties() {
    return {
      cargando: {
        type: Boolean,
        value: false
      },
      nombrecuenta: {
        type: String,
        value: "Cuenta Fácil"
      },
      urlalta: {
        type: String,
        value: Globals.urlbaseback + "account/"
      },
      registronuevo: {
        type: Boolean,
        value: true,
        notify: true
      },
      tiposcuenta: {
        type: Array,
        value: Globals.typeaccounts
      }
    };
  }

  altaIncorrecta(event, error) {
    this.cargando = false;
  }

  altaCorrecta(event, error) {
    this.cargando = false;
    this.cierraregistro();
    this.dispatchEvent(new CustomEvent('actualizarCuentas', {
      bubbles: true,
      composed: true,
      detail: ""
    }));
  }

  cierraregistro() {
    this.nombrecuenta = "Cuenta Fácil";
    this.registronuevo = false;
  }

  grabarRegistro() {
    this.cargando = true;
    var account = {
      nombrecuenta: this.nombrecuenta
    };
    this.$.altaajax.body = account;

    if (sessionStorage.getItem("user-bbva-session")) {
      var usersession = JSON.parse(sessionStorage.getItem("user-bbva-session"));
      this.urlreq = this.urlreq + usersession._id.$oid;
      var headers = this.$.altaajax.headers;
      headers.token = usersession.token;
      this.$.altaajax.headers = headers;
      this.$.altaajax.generateRequest();
    }
  }

}

window.customElements.define('registrocta-element', RegistroCuentaElement);