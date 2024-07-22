import "./confirmations.component.css";

export function showConfirmation(message: string): Promise<boolean> {
  // Page Content
  const modalHTML = `
    <div id="modal-container" class="modal-container" style="display: none;">
        <div class="modal-content">
            <span class="close-button" id="close-button">&times;</span>
            <div id="modal-message">
            </div>
        </div>
    </div>
    `;

  // Inject Modal in Any View
  function injectModal() {
    const $root = document.getElementById("root") as HTMLElement;
    $root.insertAdjacentHTML("beforeend", modalHTML);
  }

  injectModal();

  // Get Elements from Modals
  const $modalContainer = document.getElementById("modal-container") as HTMLElement;
  const $modalMessage = document.getElementById("modal-message") as HTMLElement;
  const $closeButton = document.getElementById("close-button") as HTMLElement;
  
  // Return a Promise
  return new Promise<boolean>((resolve) => {
    if ($modalContainer && $modalMessage && $closeButton) {
      $modalMessage.innerHTML = `
      ${message}
      <button id='yes'>Yes</button>
      <button id='no'>No</button>
      `;
      const $yesButton = document.getElementById('yes') as HTMLButtonElement;
      const $noButton = document.getElementById('no') as HTMLButtonElement;

      $modalContainer.style.display = "flex";

      $yesButton.onclick = () => {
        $modalContainer.style.display = "none";
        resolve(true);
      };

      $noButton.onclick = () => {
        $modalContainer.style.display = "none";
        resolve(false);
      };

      $closeButton.onclick = () => {
        $modalContainer.style.display = "none";
        resolve(false);
      };

      window.onclick = (event) => {
        if (event.target === $modalContainer) {
          $modalContainer.style.display = "none";
          resolve(false);
        }
      };
    }
  });
}
