import { showConfirmation } from "../../../components/confirmations/confirmations.component";
import { showModal } from "../../../components/modals/modal.component";
import { navBar } from "../../../components/navbar/navbar.component";
import { AdminController } from "../../../controllers/admin.controller";
import { capitalizeFirstLetter } from "../../../helpers/string-helpers";
import { RequestAllUser, RequestUpdateRol, ResponseAdmin, ResponseUpdateRole } from "../../../models/admin.model";
import { decrypt, encrypt } from "../../../services/guard";
import "./set-admin.css"
export function setAdminView(){
    //Page Content Home View

  const $root = document.getElementById("root") as HTMLElement;
  $root.innerHTML = `
    <div class="admin-container">
      <h1>User Managment</h1>
      <p>
      <div id="users-container">
          <div id="buttons-admin-container">
            <button id="load-prev" style="display: none;">⮜ Previus</button>
            <button id="load-more">Next ⮞</button>
          </div>
          <div id="user-card-container"></div>
      </div>
    </div>
    `;
    navBar();

  //Logic to get all users by pagination
  //Instantiate Admin
  const endpointUsers:string = '/api/v1/users'
  const admin:AdminController = new AdminController(endpointUsers);

  //Get params to send by URL - query params
  //Initialize current page to send param and request first page
  let currentPage:number = 1; 
  const token:string = decrypt(`${localStorage.getItem(encrypt('token'))}`);

  //Get All Users by pagination
  async function loadUser():Promise<void> {
    const dataToGetUsers:RequestAllUser ={
      token,
      currentPage
    }
    const usersContainer = document.getElementById('user-card-container');
      

    try {
      const resultUsers:ResponseAdmin = await admin.getAllUsers(dataToGetUsers);

      if(usersContainer){
        usersContainer.innerHTML = ''; //Clean users of preview page
        

        resultUsers.data.forEach(user => {
          const userCard = document.createElement('div') as HTMLDivElement;
          userCard.className='user-card';

          //User name
          const userName = document.createElement('h2') as HTMLHeadingElement;
          userName.innerHTML = `${capitalizeFirstLetter(user.name)} ${capitalizeFirstLetter(user.lastName)}`;

          //User email
          const userEmail = document.createElement('h4') as HTMLHeadingElement;
          userEmail.innerHTML=`${user.email}`;

          //User Actual Role
          const userRole = document.createElement('h4') as HTMLHeadingElement;
          userRole.innerHTML=`Rol: ${user.role}`;

          //Buttons to switch role
          const switchRole = document.createElement('button') as HTMLButtonElement;
          user.role == 'user'? switchRole.className='set-admin':switchRole.className='set-user';
          user.role == 'user'? switchRole.innerHTML='Set Admin':switchRole.innerHTML='Set User';
          switchRole.setAttribute('userId',`${user.id}`);

          //Button images
          const imgButtonSwitchRole = document.createElement('img') as HTMLImageElement;
          user.role=='user'? imgButtonSwitchRole.className='set-admin-button':imgButtonSwitchRole.className='set-user-button'

          //Childs
          usersContainer.appendChild(userCard);
          userCard.appendChild(userName);
          userCard.appendChild(userEmail);
          userCard.appendChild(userRole);
          userCard.appendChild(switchRole);
          switchRole.appendChild(imgButtonSwitchRole);

        });
      }else{
        throw new Error('User container does not exist')
      }
      //Show or hidden buttonsM
      const loadPrevButton = document.getElementById('load-prev') as HTMLElement | null;
      const loadMoreButton = document.getElementById('load-more') as HTMLElement | null;

      if (loadPrevButton) {
        loadPrevButton.style.display = currentPage > 1 ? 'inline-block' : 'none';
      }

      if (loadMoreButton) {
        loadMoreButton.style.display = resultUsers.data.length < 10 ? 'none' : 'inline-block';
      }
    } catch (error) {
      showModal(`${error}`);
    }

    //Logic of switch role
    let roleToUpdate='';
    //To admin
    const $setAdminButton = document.querySelectorAll('.set-admin');
    $setAdminButton.forEach(button=>{
      button.addEventListener('click', async()=>{
        const response= await showConfirmation('Are you sure to update the role?');
        if(response.valueOf()){
          try {
            const id:string|null=button.getAttribute('userId');
            roleToUpdate='admin';
            if(id){
              const infoToUpdateRole:RequestUpdateRol={
                id,
                roleToUpdate,
                token
              }
              const responseUpdate:ResponseUpdateRole=await admin.updateRol(infoToUpdateRole);
              showModal(`User role of ${capitalizeFirstLetter(responseUpdate.data.name)} ${capitalizeFirstLetter(responseUpdate.data.lastName)} was updated successfully`);
            }
            
          } catch (error) {
            showModal(`${error}`);
          }
          
        }
      })
    });

    //To user
    const $setUserButton = document.querySelectorAll('.set-user');
    $setUserButton.forEach(button=>{
      button.addEventListener('click', async()=>{
        const response= await showConfirmation('Are you sure to update the role?');
        if(response.valueOf()){
          try {
            const id:string|null=button.getAttribute('userId');
            roleToUpdate='user';
            if(id){
              const infoToUpdateRole:RequestUpdateRol={
                id,
                roleToUpdate,
                token
              }
              const responseUpdate:ResponseUpdateRole=await admin.updateRol(infoToUpdateRole);
              showModal(`User role of ${capitalizeFirstLetter(responseUpdate.data.name)} ${capitalizeFirstLetter(responseUpdate.data.lastName)} was updated successfully`);
            }
            
          } catch (error) {
            showModal(`${error}`);
          }
          
        }
      })
    });

  }

  //Initialize by first time loadUser()
  loadUser();

  //Logic to change page
  function loadNextPage() {
    currentPage++;
    loadUser();
  }

  function loadPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadUser();
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
  

