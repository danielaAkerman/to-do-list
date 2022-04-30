import { state } from "../state";
const firulete = require("url:../img/firulete.png");

export function initPage(container) {
  const div = document.createElement("div");
  div.innerHTML = `
<h1 class="titulo">MIS PENDIENTES</h1>
<form class="form">
<input placeholder="Nuevo pendiente" type="text name="pendiente" class="input">
<br />
<button class="button">+</button>
</form>
<div class="firulete-div">
<img src=${firulete} alt="firulete-icon" class="firulete-icon">
</div>
<ul class="lista"></ul>
<footer-comp></footer-comp>
`;

  const listaEl = div.querySelector(".lista");

  const tasks = state.getEnabledTasks();

  function createTasks(items) {
    listaEl.innerHTML = "";
    for (const i of items.reverse()) {
      const todoItemEl = document.createElement("item-comp");
      todoItemEl.setAttribute("title", i.title);
      todoItemEl.setAttribute("id", i.id);
      if (i.completed) {
        todoItemEl.setAttribute("checked", "true");
      }
      if (i.deleted) {
        todoItemEl.setAttribute("deleted", "true");
      }

      todoItemEl.addEventListener("change", (e: any) => {
        state.changeItemState(e.detail.id, e.detail.value);
      });
      todoItemEl.addEventListener("delete", (e: any) => {
        state.deleteItem(e.detail.id, true);
      });
      listaEl.appendChild(todoItemEl);
    }
  }

  state.subscribe(() => {
    createTasks(state.getEnabledTasks());
  });

  createTasks(tasks);

  const form = div.querySelector("form");
  const input = div.querySelector("input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = input.value[0].toUpperCase()+input.value.slice(1);
    state.addTask(newTask);
    input.value = "";
  });

  div.classList.add("root");

  const style = document.createElement("style");
  style.textContent = `
              .root{
                margin: 0px;
                width: 100%;
              }
              .titulo{
                text-align: center;
                font-size: 44px;
                color: #01521c;
              }
              .form{
                display: flex;
                justify-content: center;
                gap: 5px;
                margin: 10px;
              }
              .input{
                max-width: 1000px;
                flex-grow: 1;
                border-radius: 41% 48% 43% 10% / 17% 0% 13% 10% ;
                height: 40px;
                font-size: 20px;
                text-align: center;
                border: none;
                background-color: #f4a261;
                cursor: pointer;
              }
              .input:active, .input:focus{
                outline: none;
                background-color: #e2904c;
                transition: 0.5s;
              }
              
              .button{
                height: 40px;
                width: 40px;
                border: none;
                background-color: #f4a261;
                font-size: 24px;     
                border-radius: 41% 48% 43% 39% / 7% 0% 5% 10%; 
                color: #fcffb0;     
                cursor: pointer;     
              }
              .button:active, .button:focus{
                background-color: #e2904c;
                transition: 0.5s;
              }
              .firulete-div{
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .firulete-icon{
                width: 120px;
                margin: 20px auto;
              }
              .lista{
                width: 100%;
                padding: 0;
                gap: 5px;
              }
              *::selection{
                background-color: #e9ae9c;
              }
              @media(min-width:700px){
                .lista{
                  display: grid;
                  grid-template-columns: 1fr 1fr; 
                }
                .firulete-icon{
                  width: 200px;
                }
              }
              @media(min-width:1020px){
                .lista{
                  display: grid;
                  grid-template-columns: 1fr 1fr 1fr; 
                }
                
              }
              `;

  container.appendChild(div);
  container.appendChild(style);
}
