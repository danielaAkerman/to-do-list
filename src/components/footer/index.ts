const faviconb = require("url:../../img/faviconb.png");

class FooterComp extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    var shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    div.innerHTML = `
    <p class="text">
    © 2022  
    <a href="https://robledoakerman.github.io/mi-portfolio/" class="daniela">Daniela Akerman</a>     
      <img src=${faviconb} alt="faviconb" class="faviconb">
     </p>
      `;
    div.classList.add("root");

    const style = document.createElement("style");
    style.textContent = `
              .root{
                  width: 100%;
                  height: min-content;
                  margin-top: 75px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 26px;
              }
              .daniela{
                text-decoration: none;
                color: black;
                font-size: 30px;
              }
              .faviconb{
                display: inline;
                height: 44px;
              }
              *::selection{
                background-color: #e9ae9c;
              }
              @media(max-width:700px){
                .root{
                  font-size: 18px; 
                }
                .daniela{
                  font-size: 22px;
                }
              }
            `;

    shadow.appendChild(div);
    shadow.appendChild(style);
  }
}
customElements.define("footer-comp", FooterComp);
