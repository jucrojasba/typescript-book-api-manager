import { navBar } from "../../../components/navbar/navbar.component";
export function setAdminView(){
    //Page Content Home View

  const $root = document.getElementById("root") as HTMLElement;
  $root.innerHTML = `
    <h1>Hola desde Admin</h1>
    `;
    navBar();
}