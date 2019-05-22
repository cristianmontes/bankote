import { PolymerElement, html } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "../../node_modules/@polymer/iron-icons/editor-icons.js";
import "../../node_modules/@polymer/paper-card/paper-card.js";
import '../operaciones/bbvanuevacta-app.js';
import '../operaciones/bbvatrnpropias-app.js';
import '../operaciones/bbvatrnterceros-app.js';

class QuieroElement extends PolymerElement {
  static get template() {
    return html`
      <style>
          :host {
            display: inline-block;
          }
          .quiero-header{ 
            font-size: 24px;
            margin: 0 auto;
          }
          .card-quiero {
            width: 450px;
            margin: 0 auto;      
            border-radius:  3px;
         }
         .card-menu{
             margin-top:20px;
             width:100%;
         }
         /*
         .card-menu:hover {
            background-color: #0066ff !important;
            color: white !important;
            cursor: pointer;
            opacity: 0.65;    
         }*/
          .card-menu-header:hover {
            background-color: #0066ff !important;
            color: white !important;
            cursor: pointer;
            opacity: 0.65;    
          }
         .card-menu-compon{
            margin-left:10px;
            display: inline-block;
            vertical-align: middle;
            padding-top:10px;
            padding-bottom:10px;
          }

          .card-menu-chevron{
            /*float: right;
            margin-right: 10px;*/
            position: absolute;
            right: .5em;
            top: 50%;
            transform: translate(0,-50%);
          }
          .content-cards{
              margin-left:10px;
              margin-right:10px;
          }
          .content-submenu{
              display: block;
              border: 1px solid #e0ebeb;
          }

          .card-menu-submenu{
            margin-left:10px;
            display: inline-block;
            vertical-align: middle;
            padding-top:5px;
            padding-bottom:5px;
          }

          .lista-submenu{
            
          }

          .oculto{
              display: none;
          }

      </style>
      <paper-card class="card-quiero">
        <div class="card-content content-cards">
            <div class="quiero-header"> 
            <iron-icon icon="editor:border-color" slot="item-icon"></iron-icon>
                Quiero</div>
            
            <paper-card class="card-menu">
                <div class="card-content card-menu-header" on-click="mostrarOpciones">
                    <div class="card-menu-compon">
                        <iron-icon icon="editor:monetization-on" slot="item-icon"></iron-icon>
                    </div>
                    <div class="card-menu-compon">
                        <div><b>Transferir</b></div>
                        <div>Envia Dinero entre tus cuentas</div>
                    </div>
                    <div class="card-menu-compon card-menu-chevron">
                        <iron-icon icon="icons:expand-more" slot="item-icon"></iron-icon>
                    </div>
                </div>
                
                <div id="ctaspropias" class="card-content content-submenu card-menu-header oculto"
                    on-click="trnPropias">
                    <div class="card-menu-submenu">
                        <iron-icon icon="icons:swap-horiz" slot="item-icon"></iron-icon>
                    </div>
                    <div class="card-menu-submenu">                    
                        <div>Entre mis cuentas</div>
                    </div>
                    <div class="card-menu-submenu card-menu-chevron">
                        <iron-icon icon="icons:chevron-right" slot="item-icon"></iron-icon>
                    </div>
                </div>

                <div id="ctasterceros" class="card-content content-submenu card-menu-header oculto"
                    on-click="trnTerceros">
                    <div class="card-menu-submenu">
                        <iron-icon icon="social:group-add" slot="item-icon"></iron-icon>
                    </div>
                    <div class="card-menu-submenu">                    
                        <div>A cuentas de Terceros</div>
                    </div>
                    <div class="card-menu-submenu card-menu-chevron">
                        <iron-icon icon="icons:chevron-right" slot="item-icon"></iron-icon>
                    </div>
                </div>

                <div id="ctasotrosbancos" class="card-content content-submenu card-menu-header oculto">
                    <div class="card-menu-submenu">
                        <iron-icon icon="places:business-center" slot="item-icon"></iron-icon>
                    </div>
                    <div class="card-menu-submenu">                    
                        <div>A cuentas de otros bancos</div>
                    </div>
                    <div class="card-menu-submenu card-menu-chevron">
                        <iron-icon icon="icons:chevron-right" slot="item-icon"></iron-icon>
                    </div>
                </div>
                
                
            </paper-card>
            
            <paper-card class="card-menu card-menu-header">
                <div class="card-content">
                <div class="card-menu-compon">
                    <iron-icon icon="editor:monetization-on" slot="item-icon"></iron-icon>
                </div>
                <div class="card-menu-compon">
                    <div><b>Pagar o Recargar</b></div>
                    <div>Servicios, empresas o tarjetas</div>
                </div>
                <div class="card-menu-compon card-menu-chevron">
                    <iron-icon icon="icons:expand-more" slot="item-icon"></iron-icon>
                </div>
                </div>
            </paper-card>

            <paper-card class="card-menu">
                <div class="card-content">
                <div class="card-menu-compon">
                    <iron-icon icon="editor:monetization-on" slot="item-icon"></iron-icon>
                </div>
                <div class="card-menu-compon">
                    <div><b>Retirar sin tarjeta</b></div>
                    <div>Para ti o para otra persona</div>
                </div>
                <div class="card-menu-compon card-menu-chevron">
                    <iron-icon icon="icons:expand-more" slot="item-icon"></iron-icon>
                </div>
                </div>
            </paper-card>

            <paper-card class="card-menu" on-click="registroCuenta">
                <div class="card-content">
                <div class="card-menu-compon">
                    <iron-icon icon="editor:monetization-on" slot="item-icon"></iron-icon>
                </div>
                <div class="card-menu-compon">
                    <div><b>Nuevos productos</b></div>
                    <div>Cuentas, Depósitos y Seguros</div>
                </div>
                <div class="card-menu-compon card-menu-chevron">
                    <iron-icon icon="icons:expand-more" slot="item-icon"></iron-icon>
                </div>
                </div>
            </paper-card>
        </div>
        
        </paper-card>
        
        <registrocta-element registronuevo={{registronuevo}}></registrocta-element>
        <transpropias-element registronuevo={{registrotrpropias}}></transpropias-element>
        <transtercerros-element registronuevo={{registrotrterceros}}></transtercerros-element>
    `;
  }

  static get properties() {
    return {
      registronuevo: {
        type: Boolean,
        value: false
      },
      registrotrpropias: {
        type: Boolean,
        value: false
      },
      opentransf: {
        type: Boolean,
        value: false
      },
      registrotrterceros: {
        type: Boolean,
        value: false
      }
    };
  }

  registroCuenta(event) {
    this.registronuevo = true;
  }

  mostrarOpciones() {
    if (!this.opentransf) {
      this.shadowRoot.getElementById('ctaspropias').classList.remove('oculto');
      this.shadowRoot.getElementById('ctasterceros').classList.remove('oculto');
      this.shadowRoot.getElementById('ctasotrosbancos').classList.remove('oculto');
    } else {
      this.shadowRoot.getElementById('ctaspropias').classList.add('oculto');
      this.shadowRoot.getElementById('ctasterceros').classList.add('oculto');
      this.shadowRoot.getElementById('ctasotrosbancos').classList.add('oculto');
    }

    this.opentransf = !this.opentransf;
  }

  trnPropias() {
    this.registrotrpropias = true;
  }

  trnTerceros() {
    this.registrotrterceros = true;
  }

}

customElements.define('quiero-element', QuieroElement);