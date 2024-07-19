import "./navbar.component.css";

// Page Content
const navbar = `
<div class="upper-bar">
<div id="filter">
<form>
</form>
</div>
<nav>
  <ul>
    <li><button>My Books</button></li>
    <li><button>Create Book</button></li>
    <li><button><img id="logout-icon">Logout</button></li>
  </ul>
</nav>
</div>
`;

export function navBar() {
  const $root = document.getElementById('root') as HTMLElement;
  if ($root) {
    $root.insertAdjacentHTML('afterbegin', navbar);
  } else {
    throw new Error('El elemento con id "root" no se encuentra en el DOM');
  }
}