import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "../app/page.module.scss";
interface Option {
  label: string;
  value: string;
}

@customElement("filter-option-area")
export class FilterOptionArea extends LitElement {
  @property({ type: Array })
  options: Option[] = [{ label: "All", value: "" }];

  @property({ type: String })
  selectedValue: string = "";

  static styles = css`
    .box {
      border: 5px dotted #ddd;
      padding: 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    select {
      padding: 3px;
      font-size: 16px;
    }
  `;

  handleSelectChange(e: Event) {
    const selectElement = e.target as HTMLSelectElement;
    this.selectedValue = selectElement.value;
    this.dispatchEvent(
      new CustomEvent("selection-changed", {
        detail: { value: this.selectedValue },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="box">
        <select @change="${this.handleSelectChange}">
          ${this.options.map(
            (option) => html`
              <option
                value=${option.value}
                ?selected=${this.selectedValue === option.value}
              >
                ${option.label}
              </option>
            `
          )}
        </select>
      </div>
    `;
  }
}
