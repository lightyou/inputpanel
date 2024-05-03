/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('panel-key')
export class PanelKey extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      padding: 6px;
      max-width: 100px;
      max-height: 100px;
    }
    button {
      padding:16px;
    }
  `;

  /**
   * The number of times the button has been clicked.
   */
  @property()
  text = "";

  @property()
  action = "";

  override render() {
    return html`
      <button @click=${this._onClick} part="button">
        ${this.text}
      </button>
      <slot></slot>
    `;
  }

  private _onClick() {
    this.dispatchEvent(new CustomEvent('key-pressed', {
      detail: {
        action: this.action,
      }
    }));
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'panel-key': PanelKey;
  }
}
