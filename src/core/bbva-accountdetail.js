import { PolymerElement, html } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "../../node_modules/@polymer/iron-icons/social-icons.js";
import "../../node_modules/@polymer/iron-icons/maps-icons.js";
import "../../node_modules/@polymer/paper-card/paper-card.js";
import "../../node_modules/@polymer/paper-icon-button/paper-icon-button.js";
import "../../node_modules/@polymer/paper-button/paper-button.js";

class AccountDetailElement extends PolymerElement {
  static get template() {
    return html`
      <style>
          .dnrocuenta{
              margin-top: 40px;
          }
          .card-logo-izq{
            /*float: right;
            margin-right: 10px;*/
            position: absolute;
            right: .5em;
            top: 50%;
            transform: translate(0,-50%);
            display: inline-block;
            vertical-align: middle;
          }
          .card-detail{
              display: inline-block;
              width: 300px;
              height: 200px;
              vertical-align:top;
              margin-left: 20px;
          }

          .pagos{
              margin-top: 40px;
          }

          .prestamo-content{
              vertical-align:top;
              display: inline-block;
          }
          paper-button.accept {
            background-color: #0040ff;
            color: white;
            margin-top:35px;
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
          .card-desc{
            margin-left: 10px;
            display: inline-block;
            width: 75%;
          }
          .movimientos{
            margin-top: 30px;
            margin-left: 20px;
            width: 70%;
          }
          .card-menu-compon{
            margin-left:15px;
            display: inline-block;
            vertical-align: middle;
            padding-top:0px;
            padding-bottom:0px;
          }
          .card-menu-chevron{
            position: absolute;
            right: .5em;
            top: 50%;
            transform: translate(0,-50%);
          }
          .card-menu{
             margin-top:10px;
             width:100%;
         }
         .mov-content{
             margin-top: -20px;
             padding-top: 0px;
         }
      </style>
      <div>
          <div>
            <paper-card class="card-detail">
                <div class="card-content">
                <div>
                    <div>Saldo disponible</div>
                    <div><b>[[account.moneda]] [[saldoformateado]]</b></div>

                    <div class="dnrocuenta">Número de cuenta:</div>
                    <div>BBVA: [[account.numero]][[account.identificador]]</div>
                    <div>CCI: 009-170-[[account.numero]][[account.identificador]]</div>
                </div>                
                <div class="card-logo-izq">
                    <paper-icon-button icon="social:share" aria-label="Compartir"></paper-icon-button>
                </div>
                </div>
            </paper-card>

            <paper-card class="card-detail">
                <div class="card-content">
                <div>
                    <div>El mes pasado utilizaste</div>
                    <div><b>S/. 352.25</b></div>
                    <div>Del 01 abril al 31 Abril</div>

                    <div class="pagos">60% pagos</div>
                    <div>40% retiros</div>
                </div>                
                <div class="card-logo-izq">
                    <paper-icon-button icon="maps:local-atm" aria-label="Compartir"></paper-icon-button>
                </div>
                </div>
            </paper-card>

            <paper-card class="card-detail">
                <div class="card-content">
                <div>
                    <div class="prestamo-content">
                        <paper-icon-button icon="maps:local-atm" aria-label="Compartir"></paper-icon-button>
                    </div>
                    <div class="prestamo-content card-desc">
                        <span>Tienes un préstamo de hasta <b>S/. 25,500.00</b> aprobado</span>
                    </div>
                </div>
                <paper-button toggles raised class="accept">
                <iron-icon icon="check"></iron-icon>Me interesa</paper-button>
                
                
                </div>
            </paper-card>
          </div>
          <paper-card heading="Movimientos" class="movimientos">
            <div class="card-content mov-content">
                <dom-repeat items="{{transactions}}">
                <template>
                    <paper-card class="card-menu">
                        <div class="card-content">
                        <div class="card-menu-compon">
                            <iron-icon icon="editor:monetization-on" slot="item-icon"></iron-icon>
                        </div>
                        <div class="card-menu-compon">
                            <div>[[item.tipooperacion]]</div>
                            <div>[[item.fecha]]</div>
                        </div>
                        <div class="card-menu-compon card-menu-chevron">
                            [[item.moneda]] [[item.monto]]
                        </div>
                        </div>
                    </paper-card>
                </template>
              </dom-repeat>

                

                <!--paper-card class="card-menu">
                    <div class="card-content">
                    <div class="card-menu-compon">
                        <iron-icon icon="editor:monetization-on" slot="item-icon"></iron-icon>
                    </div>
                    <div class="card-menu-compon">
                        <div>Disposición de efectivo</div>
                        <div>24 Abril, 11:25 am</div>
                    </div>
                    <div class="card-menu-compon card-menu-chevron">
                        S/. 250.00
                    </div>
                    </div>
                </paper-card-->

             </div>
          </paper-card>
      </div>
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
      transactions: {
        type: Array
      }
    };
  }

  formatSaldo(saldo) {
    var p = saldo.toFixed(2).split(".");
    return p[0].split("").reverse().reduce(function (acc, saldo, i, orig) {
      return saldo == "-" ? acc : saldo + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
  }

}

customElements.define('accountdetail-element', AccountDetailElement);