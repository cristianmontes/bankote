import { PolymerElement, html } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "../../node_modules/@polymer/paper-card/paper-card.js";
import "../../node_modules/@polymer/iron-icons/notification-icons.js";
import '../core/bbva-toolbar.js';
import '../core/bbva-drawer.js';
import '../core/bbva-page-index.js';
import '../core/bbva-offeronline.js';
import '../core/bbva-accountdetail.js';
import { Globals } from '../core/globals.js';

class IndexElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        .offers{
            position: fixed;
            bottom: 0;
            right: 0;
        }
        .toolbar{
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            z-index:10;
        }
        .drawer{
            z-index:1;
            position: fixed;
            display: inline-block;
            left: 0;
            top: 0;
            bottom: 0;            
        }
        .pageindex{
            display: inline-block;
            margin-left: 280px;
            margin-top: 80px;
        }
        accountdetail-element{
            display: inline-block;
            margin-left: 300px;
            margin-top: 80px;
        }
      </style>
        
        <toolbar-element class="toolbar" usersession=[[usersession]]></toolbar-element>
        <drawer-element class="drawer" accounts=[[accounts]]></drawer-element>
        <template is="dom-if" if="[[pageindex]]">
            <pageindex-element class="pageindex"></pageindex-element>
            <offeronline-element class="offers"></offeronline-element>
        </template>
        <template is="dom-if" if="[[accountdetail]]"> 
            <accountdetail-element account=[[currentaccount]] transactions=[[transactions]]></accountdetail-element>
        </template>
        
        <iron-ajax
            id="getAccounts"
            url= [[urlreq]] 
            handle-as="json"
            method="GET"
            on-response="renderAccounts"
            content-type="application/json"
            debounce-duration="500">
        </iron-ajax>

        <iron-ajax
            id="getTransactions"
            url= [[urltxs]] 
            handle-as="json"
            method="GET"
            on-response="renderTransactions"
            content-type="application/json"
            debounce-duration="500">
        </iron-ajax>
    `;
  }

  static get properties() {
    return {
      usersession: {
        type: Object
      },
      pageindex: {
        type: Boolean,
        value: true
      },
      accountdetail: {
        type: Boolean,
        value: false
      },
      accounts: {
        type: Array
      },
      urlreq: {
        type: String,
        value: Globals.urlbaseback + "account/"
      },
      currentaccount: {
        type: Object
      },
      urltxs: {
        type: String,
        value: Globals.urlbaseback + "transaction/"
      },
      transactions: {
        type: Array
      }
    };
  }

  ready() {
    super.ready();
    this.addEventListener('actualizarCuentas', this.obtenerCuentasAct);
    this.addEventListener('seleccionarCuenta', this.seleccionarCuenta);
    this.addEventListener('cargarindex', this.cargarindex);
    this.obtenerCuentas();
  }

  renderAccounts(event, request) {
    this.accounts = JSON.parse(event.detail.response.mensaje);
  }

  obtenerCuentasAct(event) {
    this.obtenerCuentas();
  }

  obtenerCuentas() {
    if (sessionStorage.getItem("user-bbva-session")) {
      var usersession = JSON.parse(sessionStorage.getItem("user-bbva-session"));

      if (!this.urlreq.endsWith(usersession._id.$oid)) {
        this.urlreq = this.urlreq + usersession._id.$oid;
      }

      var headers = this.$.getAccounts.headers;
      headers.token = usersession.token;
      this.$.getAccounts.headers = headers;
      this.$.getAccounts.generateRequest();
    }
  }

  seleccionarCuenta(event) {
    this.pageindex = false;
    this.accountdetail = true;
    this.currentaccount = event.detail; //console.log(this.currentaccount);

    this.obtenerMovimientos(this.currentaccount.identificador);
  }

  obtenerMovimientos(idaccount) {
    if (sessionStorage.getItem("user-bbva-session")) {
      var usersession = JSON.parse(sessionStorage.getItem("user-bbva-session"));

      if (!this.urltxs.endsWith(idaccount)) {
        this.urltxs = Globals.urlbaseback + "transaction/" + idaccount;
      }

      var headers = this.$.getTransactions.headers;
      headers.token = usersession.token;
      this.$.getTransactions.headers = headers;
      this.$.getTransactions.generateRequest();
    }
  }

  renderTransactions(event, request) {
    console.log(event.detail.response.mensaje);
    this.transactions = JSON.parse(event.detail.response.mensaje);
  }

  cargarindex(event) {
    this.pageindex = true;
    this.accountdetail = false;
  }

}

customElements.define('index-element', IndexElement);