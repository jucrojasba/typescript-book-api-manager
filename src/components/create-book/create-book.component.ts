import { ResponseBook } from "../../models/book.model";
import { BookController } from "../../controllers/book.controller";
import { decrypt, encrypt } from "../../services/guard";
import "./create-book.component.css";

export function createBook() {
  // Page Content
  const modalHTML = `
    <div id="modal-container" class="modal-container" style="display: none;">
        <div class="modal-content">
            <span class="close-button" id="close-button">&times;</span>
            <div id="modal-message">
            </div>
        </div>
    </div>
    `;

  // Inject Modal in Any View
  function injectModal() {
    const $root = document.getElementById("root") as HTMLElement;
    $root.insertAdjacentHTML("beforeend", modalHTML);
  }

  injectModal();

  // Get Elements from Modals
  const $modalContainer = document.getElementById("modal-container") as HTMLElement;
  const $modalMessage = document.getElementById("modal-message") as HTMLElement;
  const $closeButton = document.getElementById("close-button") as HTMLElement;
  
  //Logic to post book
  //Instantiate Book
  const endpointBooks:string = 'api/v1/books';
  const book:BookController=new BookController(endpointBooks);

  //Get token
  const token:string = decrypt(`${localStorage.getItem(encrypt('token'))}`);
  
  //Get values to create book
    if ($modalContainer && $modalMessage && $closeButton) {
      $modalMessage.innerHTML = `
      <form id="register-form">
      <h1>Create Book</h1>
      <input type="text" name="title" id="titleCreate" placeholder="Enter new book title" maxlength="80">
      <input type="text" name="author" id="authorCreate" placeholder="Enter author name" maxlength="80">
      <input type="text" name="description" id="descriptionCreate" placeholder="Enter a description" maxlength="80">
      <input type="text" name="summary" id="summaryCreate" placeholder="Enter a summary" maxlength="80">
      <div class="action-buttons-create">
        <button type='submit' id='create'>Create</button>
        <button id='cancel'>Cancel</button>
      </div>
      </form>
      `;
      const $createButton = document.getElementById('create') as HTMLButtonElement;
      const $cancelButton = document.getElementById('cancel') as HTMLButtonElement;

      $modalContainer.style.display = "flex";

      $createButton.onclick = () => {
        $modalContainer.style.display = "none";
      };

      $cancelButton.onclick = () => {
        $modalContainer.style.display = "none";
      };

      $closeButton.onclick = () => {
        $modalContainer.style.display = "none";
      };

      window.onclick = (event) => {
        if (event.target === $modalContainer) {
          $modalContainer.style.display = "none";
        }
      };
    }
  }
