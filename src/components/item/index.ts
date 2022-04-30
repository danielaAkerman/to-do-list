const tachito = require("url:../../img/tachito.png");
const flor = require("url:../../img/flor.png");

customElements.define(
  "item-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    checked: boolean = false;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.title = this.getAttribute("title");
      this.checked = this.hasAttribute("checked");
      this.id = this.getAttribute("id");
      this.render();
    }
    addListeners() {
      const checkElement = this.shadow.querySelector(".input-checkbox");
      checkElement.addEventListener("click", (e) => {
        const target = e.target as any;
        const event = new CustomEvent("change", {
          detail: {
            id: this.id,
            value: target.checked,
          },
        });

        this.dispatchEvent(event);
      });

      const deleteElement = this.shadow.querySelector(".delete-icon");
      deleteElement.addEventListener("click", (e) => {
        const target = e.target as any;
        const event = new CustomEvent("delete", {
          detail: {
            id: this.id,
            value: (target.deleted = true),
          },
        });

        this.dispatchEvent(event);
      });
    }

    render() {
      const div = document.createElement("div");

      div.innerHTML = `
      
      <div class="content">
      <img src=${flor} alt="flor-icon" class="flor-icon">
      <h4 class="text ${this.checked ? "checked" : ""}">${this.title}</h4>
      </div>
      <div class="icons">
      <input class="input-checkbox" type="checkbox" ${
        this.checked ? "checked" : ""
      } />
      <img src=${tachito} alt="delete-icon" class="delete-icon">
      
      </div>
      `;

      div.classList.add("root");

      const style = document.createElement("style");
      style.textContent = `
              .root{
                width: 90%;
                height: min-content;
                max-height: 400px;
                display: flex;
                flex-direction: row;
                gap:5px;
                align-items: center;
                padding: 10px;
                justify-content: space-between;
                margin: 10px;               
                background-color: #f4a261;
                overflow: auto;
                border-radius: 
                ${Math.trunc(Math.random() * 25)}% 
                ${Math.trunc(Math.random() * 25)}% 
                ${Math.trunc(Math.random() * 25)}% 
                ${Math.trunc(Math.random() * 25)}% / 
                ${Math.trunc(Math.random() * 25)}% 
                ${Math.trunc(Math.random() * 25)}% 
                ${Math.trunc(Math.random() * 25)}% 
                ${Math.trunc(Math.random() * 25)}% 
              }
              .flor-icon{
                margin: auto;
                width: 40px;
              }
              .content{
                width: 90%;
                display: flex;
                flex-direction: row;
                padding: 10px;
                justify-content: space-between;
                gap: 10px;
              }
              .icons{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 10px;
              }
              .input-checkbox{
                width: 25px;
                height: 25px;
                display: block;
                cursor: pointer;
              }
              .delete-icon{
                display: block;
                visibility: ${this.checked ? "visible" : "hidden"};
                width: auto;
                height: 30px;
                cursor: pointer;
              }
              .checked{
                text-decoration: line-through;
              }
              .text{
                flex-grow: 1;
                font-weight: 500;
                font-size: 22px;
                text-align: center;
              }
              *::selection{
                background-color: #e9ae9c;
              }
              @media(min-width:700px){
                .root{
                  height: 200px; 
                }
              }
            `;

      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
      this.addListeners();
    }
  }
);
