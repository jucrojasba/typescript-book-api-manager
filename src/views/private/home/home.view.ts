import { navBar } from "../../../components/navbar/navbar.component";
import './home.view.css'
export function homeView() {
  //Page Content Home View
  
  const $root = document.getElementById("root") as HTMLElement;
  $root.innerHTML = `
    <div class="costumer-container">
      <h1>Books</h1>
      <div id="books-container">
          <div id="buttons-book-container">
            <button id="load-prev" style="display: none;">⮜ Previus</button>
            <button id="load-more">Next ⮞</button>
          </div>
          <div id="book-card-container"></div>
      </div>
    </div>
    `;
    navBar();


  //Logic to get All Books with pagination
  


}
