import { ResponseBook, UpdateBook } from "../../models/book.model";
import { BookController } from "../../controllers/book.controller";
import { decrypt, encrypt } from "../../services/guard";
import { showModal } from "../../components/modals/modal.component";
import "./update-book.component.css";
import { capitalizeFirstLetter } from "../../helpers/string-helpers";

export function updateBook(id:string) {
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
  
  //Logic to update book
  //Get values to create book
    if ($modalContainer && $modalMessage && $closeButton) {
      $modalMessage.innerHTML = `
      <form id="update-form">
      <h1>Update Book</h1>
      <input type="text" name="title" id="titleCreate" placeholder="Enter a new book title" maxlength="80">
      <input type="text" name="author" id="authorCreate" placeholder="Enter a new author name" maxlength="80">
      <input type="text" name="description" id="descriptionCreate" placeholder="Enter a new description" maxlength="80">
      <input type="text" name="summary" id="summaryCreate" placeholder="Enter a new summary" maxlength="80">
      <div class="action-buttons-create">
        <button type='submit' id='create'>Update</button>
        <button id='cancel' type='button'>Cancel</button>
      </div>
      </form>
      `;

      //Get values from form
      const $updateForm = document.getElementById('update-form') as HTMLFormElement;
      const $cancelButton = document.getElementById('cancel') as HTMLButtonElement;
      const $title = document.getElementById('titleCreate') as HTMLInputElement;
      const $author = document.getElementById('authorCreate') as HTMLInputElement;
      const $description = document.getElementById('descriptionCreate') as HTMLInputElement;
      const $summary = document.getElementById('summaryCreate') as HTMLInputElement;

      //Get date
      const date=new Date();
      const publicationDate=`${date.toISOString()}`;

      $modalContainer.style.display = "flex";

      //Instantiate Book
      const endpointBooks:string = 'api/v1/books';
      const book:BookController=new BookController(endpointBooks);

      //Get token
      const token:string = decrypt(`${localStorage.getItem(encrypt('token'))}`);


      $updateForm.addEventListener('submit',async(e) => {
        e.preventDefault();
        if($title.value && $author.value && $description.value && $summary.value){
          const dataToUpdateBook:UpdateBook={
            token,
            id,
            data:{
              title:`${$title.value}`,
              author: `${$author.value}`,
              description: `${$description.value}`,
              summary: `${$summary.value}`,
              publicationDate: `${publicationDate}`
            }
          }
          try {
            const responsePost:ResponseBook = await book.updateBook(dataToUpdateBook);
            if(responsePost){
              showModal(`${capitalizeFirstLetter(responsePost.message)}: Book updated successfully`);
            }
          } catch (error) {
            showModal(`${error}`);
          }
        }else{
          showModal("Please fill in all fields to Update Book");
          throw new Error("Please fill in all fields to Update Book");
        }
      });

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
