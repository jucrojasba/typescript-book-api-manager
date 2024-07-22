import "./modal.component.css";
export function showModal(message: string) {
  //Page Content
  const modalHTML = `
    <div id="modal-container" class="modal-container" style="display: none;">
        <div class="modal-content">
            <span class="close-button" id="close-button">&times;</span>
            <div id="modal-message"></div>
        </div>
    </div>
    `;

  //Inyect Modal in Any View
  function injectModal() {
    const $root = document.getElementById("root") as HTMLElement;
    $root.insertAdjacentHTML("beforeend", modalHTML);
  }

  injectModal();

  //Get Elements from Modals

  const $modalContainer = document.getElementById(
    "modal-container"
  ) as HTMLElement;
  const $modalMessage = document.getElementById("modal-message") as HTMLElement;
  const $closeButton = document.getElementById("close-button") as HTMLElement;

  if ($modalContainer && $modalMessage && $closeButton) {
    $modalMessage.innerHTML = message;
    $modalContainer.style.display = "flex";

    $closeButton.onclick = () => {
      $modalContainer.style.display = "none";
      window.location.reload();
    };

    window.onclick = (event) => {
      if (event.target === $modalContainer) {
        $modalContainer.style.display = "none";
        window.location.reload();
      }
    };
  }
}
