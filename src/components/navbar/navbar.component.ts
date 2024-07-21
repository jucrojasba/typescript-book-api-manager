import "./navbar.component.css";
import { encrypt, decrypt } from "../../services/guard";
import { navigateTo } from "../../router";

//Decrypt auth info by user
const email:string|null = decrypt(`${localStorage.getItem(encrypt('email'))}`);
const role:string|null = decrypt(`${localStorage.getItem(encrypt('role'))}`);

//Menu-items depends on Role
function menuItems(role:string):string{
  let menuItem = `
    <li><button id="books-navbar"><img id="book-navbar-icon">My Books</button></li>
    <li><button id='logout'><img id="logout-icon">Logout</button></li>`

  if(role=='admin'){
    menuItem = `
    <li><button id="setAdmin"><img id="set-admin-icon">Set Admin</button></li>
    <li><button id="createBook"><img id="create-book-icon">Create Book</button></li>
    <li><button id="books-navbar"><img id="book-navbar-icon">My Books</button></li>
    <li><button id='logout'><img id="logout-icon">Logout</button></li>
    `
  }
  return menuItem;
}

// Page Content - cambiar a role
const navbar = `
<div class="upper-bar">
<div id="authInfo">
<img id="user-navbar">
<div class="auth-message">
<p>${email}</p>
<p>${role}</p>
</div>
</div>
<nav>
  <ul>
    ${menuItems(role)}
  </ul>
</nav>
</div>
`;

export function navBar() {
  //Insert navBar component to any view
  const $root = document.getElementById('root') as HTMLElement;
  if ($root) {
    $root.insertAdjacentHTML('afterbegin', navbar);
  } else {
    throw new Error('El elemento con id "root" no se encuentra en el DOM');
  }

  //Logic of Logout
  const $logout = document.getElementById('logout') as HTMLButtonElement;
  $logout.addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.clear();
    navigateTo('/login');
  })

  
  if(role=='admin'){
    //Logic of set admin
    const $setAdmin = document.getElementById('setAdmin') as HTMLButtonElement;
    $setAdmin.addEventListener('click',(e)=>{
    e.preventDefault();
    navigateTo('/set-admin');
  })
    //Logic of Create Book


  }
  
  //Logic of My Books
  const $myBooks = document.getElementById('books-navbar') as HTMLButtonElement;
  $myBooks.addEventListener('click',(e)=>{
    e.preventDefault();
    navigateTo('/home');
  })

}