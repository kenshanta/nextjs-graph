import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("flex-box")
export class FlexBox extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: 19px;
    }
  `;

  render() {
    return html` <div class="flex-row">
      <i>*The graph's components are interactive*</i>
    </div>`;
  }
}
