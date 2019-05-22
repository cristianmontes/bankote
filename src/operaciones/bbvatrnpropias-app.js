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

class TransfPropiasElement extends PolymerElement {
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
        <h2>Tranferencias de cuentas propias</h2>
        
            <paper-card>
                <div class="card-content">

                <paper-dropdown-menu label="Cuenta Origen" vertical-offset="60"
                    selected-item-changed="evalua" disabled=[[modoAprueba]]
                    auto-validate error-message="Es obligatorio" >
                    <paper-listbox slot="dropdown-content" class="dropdown-content"
                    attr-for-selected="value" selected='{{transaccion.origen}}'>
                    <dom-repeat items="{{accounts}}">
                        <template>  
                            <paper-item value="{{item}}">
                              {{item.numero}}{{item.identificador}} - {{item.moneda}} {{item.saldo}}
                            </paper-item>
                        </template>
                    </dom-repeat>
                    </paper-listbox>
                </paper-dropdown-menu>

                

                <paper-dropdown-menu label="Moneda" vertical-offset="60"
                disabled=[[modoAprueba]]
                  selected-item-changed="evalua">
                  <paper-listbox slot="dropdown-content" class="dropdown-content"
                    attr-for-selected="value" selected='{{transaccion.moneda}}'>
                    <paper-item value="S/.">Soles</paper-item>
                  </paper-listbox>
                </paper-dropdown-menu>

                <paper-input label="Monto" value="{{transaccion.monto}}" required
                    id="txtMonto" maxlength="10" disabled=[[modoAprueba]]
                    auto-validate></paper-input>

                <paper-dropdown-menu label="Cuenta Destino" vertical-offset="60"
                    selected-item-changed="evaluaD" disabled=[[modoAprueba]]
                    auto-validate error-message="Es obligatorio" >
                    <paper-listbox slot="dropdown-content" class="dropdown-content"
                    attr-for-selected="value" selected='{{transaccion.destino}}'>
                    <dom-repeat items="{{accounts}}">
                        <template>  
                            <paper-item value="{{item}}">
                              {{item.numero}}{{item.identificador}} - {{item.moneda}} {{item.saldo}}
                            </paper-item>
                        </template>
                    </dom-repeat>
                    </paper-listbox>
                </paper-dropdown-menu>
                <br/>
                <paper-input label="Token de Confirmacion" value="{{tokenconfirmacion}}"
                    id="txttokenconfirmacion" error-message="{{errormessage}}" 
                    type="password"
                    maxlength="10" disabled=[[!modoAprueba]]></paper-input>

            </div>
            </paper-card>
        </div>
        <div class="buttons">            
            <paper-button autofocus on-click="aceptaOperacion">Aceptar</paper-button>
            <paper-button dialog-confirm autofocus on-click="cierraregistro">Cerrar</paper-button>        
        </paper-dialog>
        
        <iron-ajax
            id="preconfirma"
            url= [[urlpreconfirma]] 
            handle-as="json"
            loading="{{cargando}}"
            method="POST"
            content-type="application/json"
            on-response="preconfirmaCorrecta"
            debounce-duration="500">
        </iron-ajax>

        <iron-ajax
            id="getAccounts"
            url= [[urlconsulta]] 
            handle-as="json"
            method="GET"
            on-response="renderAccounts"
            content-type="application/json"
            debounce-duration="500">
        </iron-ajax>

        <iron-ajax
            id="confirmatx"
            url= [[urlconfirmatx]] 
            handle-as="json"
            loading="{{cargando}}"
            method="POST"
            content-type="application/json"
            on-response="altaCorrecta"
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
      urlpreconfirma: {
        type: String,
        value: Globals.urlbaseback + "account/enviartoken"
      },
      urlconsulta: {
        type: String,
        value: Globals.urlbaseback + "account/"
      },
      accounts: {
        type: Array
      },
      transaccion: {
        type: Object,
        value: {
          "origen": "",
          "moneda": "S/.",
          "monto": "0.00",
          "destino": "",
          "tipooperacion": "Transf. Ctas Propias"
        }
      },
      tokenPorSMS: {
        type: Object
      },
      tokenconfirmacion: {
        type: String,
        value: ""
      },
      errormessage: {
        type: String,
        value: ""
      },
      modoAprueba: {
        type: Boolean,
        value: false
      },
      registronuevo: {
        type: Boolean,
        value: true,
        notify: true
      },
      urlconfirmatx: {
        type: String,
        value: Globals.urlbaseback + "transaction/"
      }
    };
  }

  ready() {
    super.ready();
    this.obtenerCuentas();
  }

  renderAccounts(event, request) {
    this.accounts = JSON.parse(event.detail.response.mensaje);
  }

  obtenerCuentas() {
    if (sessionStorage.getItem("user-bbva-session")) {
      var usersession = JSON.parse(sessionStorage.getItem("user-bbva-session"));

      if (!this.urlconsulta.endsWith(usersession._id.$oid)) {
        this.urlconsulta = this.urlconsulta + usersession._id.$oid;
      }

      var headers = this.$.getAccounts.headers;
      headers.token = usersession.token;
      this.$.getAccounts.headers = headers;
      this.$.getAccounts.generateRequest();
    }
  }

  aceptaOperacion() {
    console.log("acepta operacion");
    this.shadowRoot.getElementById('txttokenconfirmacion').invalid = false;

    if (!this.modoAprueba) {
      this.preconfirmar();
    } else {
      if (this.tokenPorSMS.tkOperacion != this.tokenconfirmacion) {
        this.shadowRoot.getElementById('txttokenconfirmacion').invalid = true;
        this.errormessage = "El token ingresado no es válido";
      } else {
        //procesar transaccion
        this.grabarTransaccion();
      }
    }
  }

  preconfirmar() {
    var token = this.getToken();
    var headers = this.$.preconfirma.headers;
    headers.token = token;
    this.$.preconfirma.headers = headers;
    this.$.preconfirma.body = this.transaccion;
    this.$.preconfirma.generateRequest();
  }

  preconfirmaCorrecta(event, error) {
    this.cargando = false;
    this.tokenPorSMS = JSON.parse(event.detail.response.mensaje);
    this.modoAprueba = true;
  }

  grabarTransaccion() {
    this.cargando = true;
    var token = this.getToken();
    var headers = this.$.confirmatx.headers;
    headers.token = token;
    this.$.confirmatx.headers = headers;
    this.$.confirmatx.body = this.transaccion;
    this.$.confirmatx.generateRequest();
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
    this.errormessage = "";
    this.registronuevo = false;
    this.tokenconfirmacion = "";
    this.modoAprueba = false;
    this.transaccion = {
      "origen": "",
      "moneda": "S/.",
      "monto": "0.00",
      "destino": ""
    };
  }

  getToken() {
    if (sessionStorage.getItem("user-bbva-session")) {
      var usersession = JSON.parse(sessionStorage.getItem("user-bbva-session"));
      return usersession.token;
    }

    return "";
  }

}

window.customElements.define('transpropias-element', TransfPropiasElement);