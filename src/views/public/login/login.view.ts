import "./login.view.css";
import { UserController } from "../../../controllers/user.controller";
import { navigateTo } from "../../../router";
import { showModal } from "../../../components/modals/modal.component";
import { RequestLoginUser, ResponseUser } from "../../../models/user.model";

export function loginView() {
  //Page Content Login View
  const $root = document.getElementById("root") as HTMLElement;
  $root.innerHTML = `
    <div class="root-container">
    <h1>Login</h1>
    <form id="login-form">
        <input type="email" name="email" id="email" placeholder="Ingresa tu email" requiered>
        <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" requiered>
        <div class="action-buttons-login">
          <button type="submit">Login</button>
          <button>Register</button>
        </div>
    </form>
    <div class="alert-login"></div>
    </div>;
    
    `;

  //Logic Login View

  const $email = document.getElementById("email") as HTMLInputElement;
  const $password = document.getElementById("password") as HTMLInputElement;
  const $loginForm = document.getElementById("login-form") as HTMLFormElement;

  //Instanciar User Info para Login
  const endpointLogin = "/api/v1/auth/login";
  const userLogin: UserController = new UserController(endpointLogin);

  $loginForm?.addEventListener("submit", async (e) => {
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
        localStorage.setItem("token", resultLogin.data.token);
        navigateTo("/home");
      } catch (error) {
        showModal(`${error}`);
      }
    } else {
      showModal("Please fill in all fields to Login");
      throw new Error("Please fill in all fields to Login");
    }
  });
}
