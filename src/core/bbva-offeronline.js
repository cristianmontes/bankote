import { PolymerElement, html } from "../../node_modules/@polymer/polymer/polymer-element.js";
import "../../node_modules/@polymer/iron-icons/iron-icons.js";
import "../../node_modules/@polymer/paper-card/paper-card.js";

class OfferOnlineElement extends PolymerElement {
  static get template() {
    return html`
      <style>
          .offer {
            
            width: 300px;
            height: 80px;
            border: 1px solid #73AD21;
            border-radius:  10px 10px 0px 10px;
            background: #FF337D;
            cursor: pointer;
        }
        .card-menu-compon{            
            display: inline-block;
            vertical-align: middle;
            padding-top:5px;
            padding-bottom:5px;
        }
        .card-desc{
            margin-left: 10px;
            display: inline-block;
            width: 80%;
        }
        .cerrar{
            position: absolute;
            display: inline-block;
        }
        .cerrar:hover{
            /*background: #473E46;*/
            color: white
        }
      </style>
      <paper-card class="offer">
        <div class="card-content">
            <div class="card-menu-compon">
            <iron-icon icon="notification:sms" slot="item-icon"></iron-icon>
            </div>
            <div class="card-menu-compon card-desc">
                <div class="card-frecuente-detalle">Tienes un préstamo de hasta S/. 25,500.00 aprobado</div>
            </div>
            <div class="cerrar">X</div>
        </div>
    </paper-card>
    `;
  }

}

customElements.define('offeronline-element', OfferOnlineElement);