/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import './key';

/**
 * Input-Panel : keyboard that send OSC events when key pressed
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('input-panel')
export class InputPanel extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      max-width: 800px;
      flex-direction: column;
      background-color: black;
    }
    .row {
      display: flex;
      flex-direction: row;
    }
  `;


  ws: WebSocket | null = null;

  override connectedCallback() {
    super.connectedCallback();

    this.ws = new WebSocket("ws://localhost:8080");
  }


  override render() {
    return html`
      <div class="row">
        <panel-key @key-pressed=${this._onClick} action="clear" text="Clear"></panel-key>
      </div>
      <div class="row">
        <panel-key @key-pressed=${this._onClick} action="1" text="1"></panel-key>
        <panel-key @key-pressed=${this._onClick} action="2" text="2"></panel-key>
        <panel-key @key-pressed=${this._onClick} action="3" text="3"></panel-key>
        <panel-key @key-pressed=${this._onClick} action="+" text="+"></panel-key>
      </div>
      <div class="row">
        <panel-key @key-pressed=${this._onClick} action="4" text="4"></panel-key>
        <panel-key @key-pressed=${this._onClick} action="5" text="5"></panel-key>
        <panel-key @key-pressed=${this._onClick} action="6" text="6"></panel-key>
        <panel-key @key-pressed=${this._onClick} action="-" text="-"></panel-key>
      </div>
      <div class="row">
        <panel-key @key-pressed=${this._onClick} action="7" text="7"></panel-key>
        <panel-key @key-pressed=${this._onClick} action="8" text="8"></panel-key>
        <panel-key @key-pressed=${this._onClick} action="9" text="9"></panel-key>
        <panel-key @key-pressed=${this._onClick} action="thru" text="..."></panel-key>
      </div>
      <div class="row">
        <panel-key @key-pressed=${this._onClick} action="enter" text="Enter"></panel-key>
        <panel-key @key-pressed=${this._onClick} action="backspace" text="<-"></panel-key>
      </div>
      <slot></slot>
    `;
  }

  private _onClick(e:CustomEvent) {
    this.ws?.send(e.detail);
    console.log(e);
  }

 
}

declare global {
  interface HTMLElementTagNameMap {
    'input-panel': InputPanel;
  }
}
