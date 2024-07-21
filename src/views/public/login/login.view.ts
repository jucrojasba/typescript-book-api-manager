import "./login.view.css";
import { UserController } from "../../../controllers/user.controller";
import { navigateTo } from "../../../router";
import { showModal } from "../../../components/modals/modal.component";
import { RequestLoginUser, ResponseUser } from "../../../models/user.model";
import { encrypt } from "../../../services/guard"

export function loginView():void {
  //Page Content Login View
  const $root = document.getElementById("root") as HTMLElement;
  $root.innerHTML = `
    <div class="root-container">
    <div class="background-login">
      <form id="login-form">
      <h1>Login</h1>
      <input type="email" name="email" id="email" placeholder="Ingresa tu email" requiered>
      <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" requiered>
      <div class="action-buttons-login">
        <button type="submit">Login</button>
        <button id="register">Register</button>
      </div>
      </form>
    </div>
    </div>;
    
    `;

  //Logic Login View

  const $email = document.getElementById("email") as HTMLInputElement;
  const $password = document.getElementById("password") as HTMLInputElement;
  const $loginForm = document.getElementById("login-form") as HTMLFormElement;

  //Instantiate User Info for Login
  const endpointLogin:string = "/api/v1/auth/login";
  const userLogin: UserController = new UserController(endpointLogin);

  //Logic to Login

  $loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if ($email.value && $password.value) {
      const dataToLogin: RequestLoginUser = {
        email: `${$email.value}`,
        password: `${$password.value}`,
      };
      try {
        const resultLogin: ResponseUser = await userLogin.postLogin(
          dataToLogin
        );
        localStorage.setItem(`${encrypt('token')}`, encrypt(resultLogin.data.token));
        localStorage.setItem(`${encrypt('role')}`, encrypt(resultLogin.data.role));
        localStorage.setItem(`${encrypt('email')}`, encrypt(resultLogin.data.email));

        navigateTo("/home");
        window.location.reload();
      } catch (error) {
        showModal(`${error}`);
      }
    } else {
      showModal("Please fill in all fields to Login");
      throw new Error("Please fill in all fields to Login");
    }
  });

  //Logic to navigate to Register
  const $register = document.getElementById('register') as HTMLButtonElement;

  $register.addEventListener('click',(e)=>{
    e.preventDefault();
    navigateTo('/register');
  })
}
