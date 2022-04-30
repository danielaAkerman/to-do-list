import "./components/footer";
import "./components/item";
import { initPage } from "./page";
import { state } from "./state";

(function () {
  // localStorage.clear()
  if (localStorage["akerman-state"]) {
    state.init();
  }
  initPage(document.querySelector(".root"));
})();
