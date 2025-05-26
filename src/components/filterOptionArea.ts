import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

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
      padding: 10px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .hero {
      font-size: 24px;
      text-align: center;

      padding: 10px;
      border: 5px solid #ddd;
      border-radius: 13px;
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
      <div class="hero">Visualize Data with Next.js</div>
      <div class="box">
        <p>Select Filter: &nbsp;</p>
        <select @change="${this.handleSelectChange}">
          ${this.options.map(
            (option) => html`
              <option value=${option.value} ?selected=${this.selectedValue === option.value}>
                ${option.label}
              </option>
            `
          )}
        </select>
      </div>
    `;
  }
}
