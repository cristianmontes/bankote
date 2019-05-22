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

class RegistroUsuarioElement extends PolymerElement {
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
            border-radius:  20px;
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
        <h2>Registro de Nuevo usuario</h2>
        
            <paper-card>
                <div class="card-content">
                <paper-input label="Correo Electrónico" value="{{usuario.correo}}" required 
                    id="txtCorreo" maxlength="100" type="email"
                    auto-validate error-message="Ingrese un correo válido" autofocus></paper-input>
                <paper-input label="Nombres" value="{{usuario.persona.nombre}}" required 
                    id="txtNombres" maxlength="35"
                    auto-validate error-message="Es obligatorio" autofocus></paper-input>
                <paper-input label="Apellidos" value="{{usuario.persona.apellido}}" required
                    id="txtApellidos" maxlength="35"
                    auto-validate error-message="Es obligatorio" ></paper-input>

                <paper-dropdown-menu label="Tipo de Documento" vertical-offset="60"
                    selected-item-changed="evalua"
                    auto-validate error-message="Es obligatorio" >
                    <paper-listbox slot="dropdown-content" class="dropdown-content"
                    attr-for-selected="value" selected='{{usuario.tipodocumento}}'>
                    <dom-repeat items="{{tiposdocumento}}">
                        <template>  
                            <paper-item value="{{item.value}}">{{item.label}}</paper-item>
                        </template>
                    </dom-repeat>
                    <!--paper-item value="L">DNI</paper-item>
                    <paper-item value="R">RUC</paper-item>
                    <paper-item value="P">Pasaporte</paper-item>
                    <paper-item value="C">Carnet de Extranjeria</paper-item-->
                    </paper-listbox>
                </paper-dropdown-menu>            

                <paper-input label="Nro Documento" value="{{usuario.numerodocumento}}" required
                    id="txtNumeroDocumento" maxlength="11"
                    auto-validate error-message="{{errormessageback}}"></paper-input>
                <paper-input label="Password" type="password" value="{{usuario.clave}}" required
                    id="txtpassword" maxlength="11"
                    auto-validate error-message="Es obligatorio"></paper-input>
                <paper-input label="Repita Password" type="password" value="{{repitecontrasena}}" required
                    id="txtrepitepassword" maxlength="11"
                    auto-validate error-message="{{errormessage}}"></paper-input>
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
        <paper-dialog id="mensajemodal" modal>
        <h2>Mensaje</h2>
        <p>Se procedió con el alta correctamente</p>
        <div class="buttons">
            <paper-button dialog-confirm autofocus on-click="cierraregistro">Cerrar</paper-button>
        </div>
        </paper-dialog>
    `;
  }

  static get properties() {
    return {
      cargando: {
        type: Boolean,
        value: false
      },
      usuario: {
        type: Object,
        value: {
          "tipodocumento": "L",
          "numerodocumento": "",
          "correo": "",
          "clave": "",
          "persona": {
            "nombre": "",
            "apellido": ""
          }
        }
      },
      repitecontrasena: {
        type: String,
        value: ""
      },
      urlalta: {
        type: String,
        value: Globals.urlbaseback + "usuario/"
      },
      registronuevo: {
        type: Boolean,
        value: true,
        notify: true
      },
      tiposdocumento: {
        type: Array,
        value: Globals.typedocuments
      },
      errormessage: {
        type: String,
        value: "Es obligatorio"
      },
      errormessageback: {
        type: String,
        value: "Es obligatorio"
      }
    };
  }

  altaIncorrecta(event, error) {
    this.cargando = false;

    if (event.detail.request.xhr.response) {
      this.errormessageback = event.detail.request.xhr.response.mensaje;
      this.shadowRoot.getElementById('txtNumeroDocumento').invalid = true;
    } else {
      this.errormessageback = "Error Interno";
      this.shadowRoot.getElementById('txtNumeroDocumento').invalid = true;
    }
  }

  altaCorrecta(event, error) {
    this.cargando = false;
    this.cierraregistro(); //this.$.mensajemodal.opened = true;
  }

  cierraregistro() {
    this.usuario = {
      "tipodocumento": "L",
      "numerodocumento": "",
      "correo": "",
      "clave": "",
      "persona": {
        "nombre": "",
        "apellido": ""
      }
    };
    this.registronuevo = false;
  }

  grabarRegistro() {
    if (this.usuario.persona.nombre == "" || this.usuario.persona.apellido == "" || this.usuario.numerodocumento == "" || this.usuario.clave == "" || this.repitecontrasena == "") {
      this.shadowRoot.getElementById('txtNombres').validate();
      this.shadowRoot.getElementById('txtApellidos').validate();
      this.shadowRoot.getElementById('txtNumeroDocumento').validate();
      this.shadowRoot.getElementById('txtpassword').validate();
      this.shadowRoot.getElementById('txtrepitepassword').validate();
      return;
    } else {
      if (this.usuario.clave !== this.repitecontrasena) {
        this.shadowRoot.getElementById('txtrepitepassword').invalid = true;
        this.errormessage = "Las claves no son iguales";
      } else {
        this.cargando = true;
        this.$.altaajax.body = this.usuario;
        this.$.altaajax.generateRequest();
      }
    }
  }

}

window.customElements.define('registrousuario-element', RegistroUsuarioElement);