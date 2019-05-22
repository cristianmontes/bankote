import { PolymerElement, html } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "../../node_modules/@polymer/iron-icons/iron-icons.js";
import "../../node_modules/@polymer/paper-card/paper-card.js";

class MenuItemElement extends PolymerElement {
  static get template() {
    return html`
      <style>
          .drawer-content {
            margin-top: 80px;
            height: calc(100% - 80px);
            overflow: auto;
            margin-left:10px;
          }

          .card-menu{
            border-radius: 5px;
            width: 95%;
            margin-bottom: 10px;
          }
          .card-menu:hover{
            cursor: pointer;
            opacity: 0.65;
          }
          .card-menu-compon{
            display: inline-block;
            vertical-align: middle;
          }

          .card-menu-chevron{
            /*float: right;
            margin-right: 10px;*/
            position: absolute;
            right: .5em;
            top: 50%;
            transform: translate(0,-50%);
          }
          .selected{
            border: 1px solid #000;
          }
      </style>
        <paper-card id="item" class="card-menu" on-click="seleccionar">
        <div class="card-content">
        <div class="card-menu-compon">
            <div><b>[[account.nombre]]</b></div>
            <div>[[account.moneda]] [[saldoformateado]]</div>
        </div>
        <div class="card-menu-compon card-menu-chevron">
            <iron-icon icon="icons:chevron-right" slot="item-icon"></iron-icon>
        </div>
        </div>
        </paper-card>              
    `;
  }

  static get properties() {
    return {
      account: {
        type: Object
      },
      saldoformateado: {
        type: String,
        computed: 'formatSaldo(account.saldo)'
      },
      verSaldo: {
        type: Boolean,
        value: true
      },
      selected: {
        type: Boolean,
        value: false
      }
    };
  }

  formatSaldo(saldo) {
    if (this.verSaldo) {
      var p = saldo.toFixed(2).split(".");
      return p[0].split("").reverse().reduce(function (acc, saldo, i, orig) {
        return saldo == "-" ? acc : saldo + (i && !(i % 3) ? "," : "") + acc;
      }, "") + "." + p[1]; //return saldo.toFixed(2);
    } else {
      return '******.**';
    }
  }

  seleccionar() {
    //this.shadowRoot.getElementById('item').classList.add('selected');
    this.dispatchEvent(new CustomEvent('seleccionarCuenta', {
      bubbles: true,
      composed: true,
      detail: this.account
    }));
  }

}

customElements.define('menu-item-element', MenuItemElement);