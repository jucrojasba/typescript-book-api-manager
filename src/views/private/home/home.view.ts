import { navBar } from "../../../components/navbar/navbar.component";
export function homeView() {
  //Page Content Home View

  const $root = document.getElementById("root") as HTMLElement;
  $root.innerHTML = `
    <h1>Hola desde Home</h1>
    `;
    navBar();
}
