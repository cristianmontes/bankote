import { PolymerElement } from "../../node_modules/@polymer/polymer/polymer-element.js";
import { html } from "../../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { Checkbox } from "../../node_modules/@material/mwc-checkbox/mwc-checkbox.js";
import "../../node_modules/@polymer/paper-tabs/paper-tabs.js";
import "../../node_modules/@polymer/paper-tabs/paper-tab.js";
import "../../node_modules/@polymer/iron-icons/editor-icons.js";
import "../../node_modules/@polymer/paper-card/paper-card.js";
import "../../node_modules/@polymer/iron-pages/iron-pages.js";
import "../../node_modules/@polymer/paper-button/paper-button.js";

class MiListaElement extends PolymerElement {
  static get template() {
    return html`
        <style>
        :host {
            display: inline-block;
            
            --backgroud-tab-color: blue;
            --paper-tab-ink: var(--backgroud-tab-color);
            --paper-tabs-selection-bar-color: blue;            
          }
          .quiero-header{ 
            font-size: 24px;
          }
          
          .card-quiero {
            width: 450px;              
            border-radius:  3px;
            min-height: 260px;
            
          }
         .card-menu{
             margin-top:20px;
             width:100%;
         }
         
         .card-menu-compon{            
            display: inline-block;
            vertical-align: middle;
            padding-top:5px;
            padding-bottom:5px;
          }

          .card-frecuente{
            margin-left: 10px;
            display: inline-block;
            width: 60%;
          }
          .card-frecuente-detalle{
            font-size: 14px;
          }
          
          .card-icon{
              width: 10%;
          }

          .av-automatico-card{
            margin-top:20px;
            width:95%;
            border: 1px dashed;
          }
          .card-desc{
            margin-left: 10px;
            display: inline-block;
            width: 80%;
          }

          paper-button.accept {
            background-color: #0040ff;
            color: white;
            margin-top:15px;
            margin-left:0px;
            width:100%;
            --paper-button-raised-keyboard-focus: {
                background-color: #0000ff !important;
                color: white !important;
            };
          }
          paper-button.accept:hover {
            background-color: #0000ff !important;
            color: white !important;
          }
          .content-cards{
              margin-left:10px;
              margin-right:10px;
          }
      </style>
      <paper-card class="card-quiero">
        <div class="card-content content-cards">
            <div class="quiero-header"> 
            <iron-icon icon="editor:format-list-bulleted" slot="item-icon"></iron-icon>
                Mi Lista
            </div>
            <paper-tabs selected="{{selected}}">
                <paper-tab>Frecuentes</paper-tab>
                <paper-tab>Automáticos</paper-tab>
            </paper-tabs>
            <iron-pages selected="{{selected}}">
                <div>
                <paper-card class="card-menu">
                    <div class="card-content">
                        <div class="card-menu-compon card-icon">
                            <mwc-checkbox></mwc-checkbox>
                        </div>
                        <div class="card-menu-compon card-frecuente">
                            <div><b>Teléfono Casa</b></div>
                            <div class="card-frecuente-detalle">Nro teléfono: 4325452</div>
                            <div class="card-frecuente-detalle">Vence: 08 Abril</div>
                        </div>
                        <div class="card-menu-compon">
                            <div><b>S/. 189.90</b></div>
                        </div>
                    </div>
                </paper-card>
                <paper-card class="card-menu">
                    <div class="card-content">
                        <div class="card-menu-compon card-icon">
                            <mwc-checkbox></mwc-checkbox>
                        </div>
                        <div class="card-menu-compon card-frecuente">
                            <div><b>Teléfono Casa</b></div>
                            <div class="card-frecuente-detalle">Nro teléfono: 4325452</div>
                            <div class="card-frecuente-detalle">Vence: 08 Abril</div>
                        </div>
                        <div class="card-menu-compon">
                            <div><b>S/. 189.90</b></div>
                        </div>
                    </div>
                </paper-card>

                <paper-button toggles raised class="accept">
                    <iron-icon icon="check"></iron-icon>Realizar pago</paper-button>
                </div>
                <div>
                    <paper-card class="av-automatico-card">
                        <div class="card-content">
                            <div class="card-menu-compon">
                                <iron-icon icon="social:notifications-active"
                                 style="fill:blue" slot="item-icon"></iron-icon>
                            </div>
                            <div class="card-menu-compon card-desc">                            
                                <span>¡Pronto podrás organizar tus <b>pagos automáticos</b>
                                aqui!</span>
                            </div>
                        </div>
                    </paper-card>
                </div>
            </iron-pages>
        </div>        
      </paper-card>
    `;
  }

  static get properties() {
    return {
      selected: {
        type: Number,
        value: 0
      }
    };
  }

}

customElements.define('milista-element', MiListaElement);