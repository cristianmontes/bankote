import { PolymerElement, html } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "../../node_modules/@polymer/app-layout/app-layout.js";
import { Switch } from "../../node_modules/@material/mwc-switch/mwc-switch.js";
import './bbva-menu-item.js';
import './bbva-quiero.js';
import './bbva-milista.js';
import './bbva-test.js';

class DrawerElement extends PolymerElement {
  static get template() {
    return html`
      <style>
          :host{
            background: #0066ff;
          }
          /*
          app-drawer-layout {
            --app-drawer-layout-content-transition: margin 0.2s;            
          }
          app-drawer {
            --app-drawer-content-container: {
              background-color: #0066ff;
            }
          }*/
          .select-account{
            opacity: 0.65;
          }
          .drawer-content {
            background: #0066ff;            
            width: 280px;
            height: 100%;
            padding-left:10px;
            margin-top: 80px;
          }
          .title-drawer{
            color: white;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .item-adicional{
            float: right;
            margin-right: 10px;
            margin-top: 20px;
          }
          .item-compon{
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
            color: white;
          }
          .item-interno{
            /*position: absolute;
            right: .5em;
            top: 50%;
            transform: translate(0,-50%);*/
          }
          
      </style>
      <!--app-header-layout>
        <app-drawer-layout id="drawerLayout">
          <app-drawer slot="drawer"-->
            <div id="drawer" class="drawer-content">
              <div class="title-drawer">Mis Cuentas</div>
              <dom-repeat items="{{accounts}}">
                <template>
                  <menu-item-element account={{item}}></menu-item-element>
                </template>
              </dom-repeat>
              <!--menu-item-element></menu-item-element>
              <menu-item-element></menu-item-element-->
              <div class="item-adicional">
                <div class="item-compon">Ocultar Saldos</div>
                <mwc-switch checked=[[verSaldo]] class="item-compon"></mwc-switch>
              </div>
            </div>
          <!--/app-drawer-->
          <!--quiero-element></quiero-element>
          <milista-element></milista-element-->

        <!--/app-drawer-layout>
      </app-header-layout-->

      
    `;
  }

  static get properties() {
    return {
      verSaldo: {
        type: Boolean,
        value: true,
        observer: 'verSaldoChange'
      },
      accounts: {
        type: Array
      }
    };
  }

  verSaldoChange(newValue, oldValue) {
    console.log(newValue);
  }

  ready() {
    super.ready(); //this.addEventListener('conexionOk', this.conexionOk);    
  }

}

customElements.define('drawer-element', DrawerElement);