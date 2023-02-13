function startModal(classModal) {
    const modal = document.querySelector("#modalContainer");
    modal.classList.add("display");
    modal.addEventListener("click", function (e) {
      if (
        e.target.id == classModal ||
        e.target.className == "modal__close" ||
        e.target.className == "modal__salvar"
      ) {
        modal.classList.remove("display");
      }
    });
  }
  
  const button = document.querySelector(".profile-photo__edit");
  button.addEventListener("click", function () {
    startModal("modalContainer");
  });
  
  const formElement = document.querySelector(".modal__form");
  
  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
  
    const nameInput = document.querySelector("#name");
    const aboutInput = document.querySelector("#about");
    const title = document.querySelector("profile-photo__title");
    const subtitle = document.querySelector("profile-photo__subtitle");
   
    const nameValue = nameInput.value;
    const aboutValue = aboutInput.value;
  
    title.textContent = nameValue;
    subtitle.textContent = aboutValue;
  }
  
  formElement.addEventListener("submit", handleProfileFormSubmit);