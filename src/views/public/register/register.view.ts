import "./register.view.css"
import { UserController } from "../../../controllers/user.controller";
import { navigateTo } from "../../../router";
import { showModal } from "../../../components/modals/modal.component";
import { RequestRegisterUser, ResponseUser } from "../../../models/user.model";

export function registerView():void {
  //Page Content Register View
  const $root = document.getElementById("root") as HTMLElement;
  $root.innerHTML = `
    <div class="root-container">
    <div class="background-register">
      <form id="register-form">
      <h1>Register</h1>
      <input type="text" name="username" id="username" placeholder="Ingresa tu nombre">
      <input type="text" name="userlastname" id="userLastName" placeholder="Ingresa tus apellidos">
      <input type="email" name="email" id="email" placeholder="Ingresa tu email">
      <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña">
      <div class="action-buttons-register">
        <button type="submit">Register</button>
      </div>
      </form>
    </div>
    </div>;
    
    `;

  //Logic Register View

  const $username = document.getElementById("username") as HTMLInputElement;
  const $userLastName = document.getElementById("userLastName") as HTMLInputElement;
  const $email = document.getElementById("email") as HTMLInputElement;
  const $password = document.getElementById("password") as HTMLInputElement;
  const $registerForm = document.getElementById("register-form") as HTMLFormElement;

  //Instanciar User Info para Register
  const endpointRegister = "/api/v1/users";
  const userRegister: UserController = new UserController('',endpointRegister);

  //Logic to Register

  $registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if ($username.value && $userLastName.value && $email.value && $password.value) {
      const dataToRegister: RequestRegisterUser = {
        name:`${$username.value}`,
        lastName: `${$userLastName.value}`,
        email: `${$email.value}`,
        password: `${$password.value}`,
      };
      try {
        const resultRegister: ResponseUser = await userRegister.postRegister(
          dataToRegister
        );
        console.log(`Auth status: ${resultRegister.message}`)
        navigateTo("/login");
      } catch (error) {
        showModal(`${error}`);
      }
    } else {
      showModal("Please fill in all fields to Register");
      throw new Error("Please fill in all fields to Register");
    }
  });
}