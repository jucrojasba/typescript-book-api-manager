import { showModal } from "../../../components/modals/modal.component";
import { navBar } from "../../../components/navbar/navbar.component";
import { BookController } from "../../../controllers/book.controller";
import { DeleteBook, RequestBooks, ResponseRequestBooks } from "../../../models/book.model";
import { capitalizeFirstLetter } from "../../../helpers/string-helpers";
import { decrypt, encrypt } from "../../../services/guard";
import './home.view.css'
import { updateBook } from "../../../components/update-book/update-book.component";
import { showConfirmation } from "../../../components/confirmations/confirmations.component";
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
  //Instantiate Book
  const endpointBooks:string = 'api/v1/books';
  const book:BookController=new BookController(endpointBooks);

  //Get params to send by URL - query params
  //Initialize current page to send param and request first page
  let currentPage:number = 1; 
  const token:string = decrypt(`${localStorage.getItem(encrypt('token'))}`);
  const role:string = decrypt(`${localStorage.getItem(encrypt('role'))}`);

  //Get All Books wit Pagination
  async function loaderBooks():Promise<void> {
    const dataToGetBooks:RequestBooks={
      token,
      currentPage
    };
    const $bookContainer = document.getElementById('book-card-container') as HTMLDivElement;

    try {
      const bookResponse:ResponseRequestBooks=await book.getBooks(dataToGetBooks);

      if($bookContainer){
        $bookContainer.innerHTML=''; //Clean users of preview page
       if(role=='admin'){
        $bookContainer.innerHTML=`
        ${
          bookResponse.data.map((book)=>`
          <div class="book-card">
            <h3>${capitalizeFirstLetter(book.title)}</h3>
            <p>By ${capitalizeFirstLetter(book.author)}</p>
            <p>Description: ${capitalizeFirstLetter(book.description)}</p>
            <p>Summary: ${capitalizeFirstLetter(book.summary)}</p>
            <button id="delete-book" bookId="${book.id}"><img id="delete-book-icon"></button>
            <button id="edit-book" bookId="${book.id}"><img id="edit-book-icon"></button>
            <div class="cover">
              <h3>${capitalizeFirstLetter(book.title)}</h3>
              <p>(Hover me)</p>
            </div>
          </div>
          `
        )//end card
        }
       `;//end mapping cards in container
       }else{
        $bookContainer.innerHTML=`
        ${
          bookResponse.data.map((book)=>`
          <div class="book-card">
            <h3>${capitalizeFirstLetter(book.title)}</h3>
            <p>By ${capitalizeFirstLetter(book.author)}</p>
            <p>Description: ${capitalizeFirstLetter(book.description)}</p>
            <p>Summary: ${capitalizeFirstLetter(book.summary)}</p>
            <div class="cover">
              <h3>${capitalizeFirstLetter(book.title)}</h3>
              <p>(Hover me)</p>
            </div>
          </div>
          `
        )//end card
        }
       `;//end mapping cards in container
       }

      }else{
        throw new Error('Books container does not exist');
      }

      //Show or hidden buttonsM
      const loadPrevButton = document.getElementById('load-prev') as HTMLElement | null;
      const loadMoreButton = document.getElementById('load-more') as HTMLElement | null;

      if (loadPrevButton) {
        loadPrevButton.style.display = currentPage > 1 ? 'inline-block' : 'none';
      }

      if (loadMoreButton) {
        loadMoreButton.style.display = bookResponse.data.length < 4 ? 'none' : 'inline-block';
      }

    } catch (error) {
      showModal(`${error}`);
    }

    //Update Books
    const $updateButton = document.querySelectorAll('#edit-book');
    $updateButton.forEach((button)=>{
      button.addEventListener('click',()=>{
        const id:string|null=button.getAttribute('bookId');
        if(id){
          updateBook(id);
        }else{
          throw new Error('Not Book id found');
        }
      })
    });

    //Delete Book
    const $deleteButton = document.querySelectorAll('#delete-book');
    $deleteButton.forEach((button)=>{
      button.addEventListener('click',async()=>{
        const id:string|null=button.getAttribute('bookId');
        const sureDelete= await showConfirmation('Are you sure to delete this book?')
        if(id && sureDelete.valueOf()){
          const dataToDelete:DeleteBook={
            token,
            id
          }
          book.deleteBook(dataToDelete);
          showModal('Book deleted successfully')
        }else{
          throw new Error('Not Book id found');
        }
      })
    });

  }//end Loader Function

  //Firts time initialize loaderBooks()
  loaderBooks();

   //Logic to change page
   function loadNextPage() {
    currentPage++;
    loaderBooks();
  }

  function loadPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        loaderBooks();
    }
  }

  const loadMoreButton = document.getElementById('load-more') as HTMLElement | null;
  const loadPrevButton = document.getElementById('load-prev') as HTMLElement | null;

  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', loadNextPage);
  }

  if (loadPrevButton) {
    loadPrevButton.addEventListener('click', loadPrevPage);
  }


  
}
