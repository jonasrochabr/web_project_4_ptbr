
let initialCards = [
  {
    name: "Thinking",
    link: "images/photos/(5).jpg",
  },
  {
    name: "Eyes Shut Up!",
    link: "images/photos/(9).jpg",
  },
  {
    name: "Sunlight",
    link: "images/photos/(10).jpg",
  },
  {
    name: "Close",
    link: "images/photos/(13).jpg",
  },
  {
    name: "Heart and Soul",
    link: "images/photos/(16).jpg",
  },
  {
    name: "Bokeh",
    link: "images/photos/(19).jpg",
  },
];

const cardsParent = document.querySelector(".cards");
const cardTemplate = document.querySelector(".card-template").content;
const date = document.querySelector(".date")
date.innerHTML = new Date().getFullYear() + " | "
//Criação


function createCardElement(cardData) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector(".card__title").textContent = cardData.name;
  newCard.querySelector(".card__image").src = cardData.link;
  newCard.querySelector(".card__popup-wrapper>p").textContent = cardData.name;
  newCard.querySelector(".card__popup-wrapper>.card__image-big").src =
    cardData.link;
  return newCard;
}

initialCards.forEach((item) => {
  const newCard = createCardElement(item);
  cardsParent.append(newCard);
});

//POPUP
const profileEditButton = document.querySelector(".profile__edit");
const newCardButton = document.querySelector(".adicionar-button");
const popups = document.querySelectorAll(".popup");
const profileIndex = 0;
const newCardIndex = 1;

const popupIn = (popup) => {
  popup.classList.add("popup_active");
  disableButton(popup);
  clickOutsideToClose(popup);
  window.addEventListener("keydown", escToClose);
  //create closeButton for card
  const closeButtonEl = popup.querySelector(".popup__close-button");
  closeButtonEl.addEventListener("click", () => {
    closePopup(popup);
  });
};

//CLOSE
const closePopup = (popup) => {
  popup.classList.remove("popup_active");
};


//ESC 
const escToClose = (evt) => {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
};

//PROFILE BUTTON
profileEditButton.addEventListener("click", () => {
  popupIn(popups[profileIndex]);
  //create saveButton for card
  saveProfile(popups[profileIndex]);
});

//ADD NEW CARD BUTTON
newCardButton.addEventListener("click", () => {
  popupIn(popups[newCardIndex]);
  createCard(popups[newCardIndex]);
});

//SAVE PROFILE BUTTON FUNCTION
const saveProfile = (popup) => {
  const saveProfileButton = popup.querySelector("button");
  const inputs = popup.querySelectorAll("input");
  const inputNameIndex = 0;
  const inputProfessionIndex = 1;
  const profileName = document.querySelector(".profile__name");
  const profileProfession = document.querySelector(".profile__title");
  //Update Profile
  saveProfileButton.addEventListener("click", () => {
    profileName.textContent = inputs[inputNameIndex].value;
    profileProfession.textContent = inputs[inputProfessionIndex].value;
    closePopup(popup);
  });
};

//CREATE CARD BUTTON FUNCTION
const createCard = (popup) => {
  const createCardButton = popup.querySelector("button");
  const inputs = popup.querySelectorAll("input");
  const inputTitleIndex = 0;
  const inputLinkIndex = 1;
  //Update Profile
  createCardButton.addEventListener("click", updateCardAndClose);
  //
  function updateCardAndClose() {
    const cardAddedObj = {
      name: `${inputs[inputTitleIndex].value}`,
      link: `${inputs[inputLinkIndex].value}`,
    };
    addNewCard(cardAddedObj);
    createCardButton.removeEventListener("click", updateCardAndClose);
    closePopup(popup);
  }
};



//CREATE NEW CARD FUNCTION
function addNewCard(cardAddedObj) {
  initialCards.unshift(cardAddedObj);
  const cardAdded = cardTemplate.cloneNode(true);
  cardAdded.querySelector(".card__title").textContent = cardAddedObj.name;
  cardAdded.querySelector(".card__image").src = cardAddedObj.link;
  cardsParent.prepend(cardAdded);
}

// ---------------LIKE BUTTON FUNCTION------------------

//NAME OBJECTS (HEARTS)
let like = Array.from(document.querySelectorAll(".like-button_inactive"));
let dislike = Array.from(document.querySelectorAll(".like-button_active"));

//LIKE FUNCTION
like.forEach(function (item, index) {
  item.addEventListener("click", () => {
    item.classList.add("like-button_hidden");
    dislike[index].classList.remove("like-button_hidden");
  });
  dislike[index].addEventListener("click", () => {
    dislike[index].classList.add("like-button_hidden");
    item.classList.remove("like-button_hidden");
  });
});

//DELETE CARD BUTTON
//NAME OBJECTS
const cardDeleteButtonEl = document.querySelectorAll(".card__delete-button");
const cardEl = document.querySelectorAll(".card");
//DELETE CARD
cardDeleteButtonEl.forEach(function (item, index) {
  item.addEventListener("click", () => {
    item.parentElement.remove();
    initialCards.splice(index, 1);
  });
});

//IMAGE POPUP
//NAME OBJECTS
const cardImageEl = document.querySelectorAll(".card__image");
const cardPopupEl = document.querySelectorAll(".card__image-popup");
const cardPopupCloseBtnEl = document.querySelectorAll(".card__close-button");

cardImageEl.forEach(function (item, index) {
  item.addEventListener("click", () => {
    cardPopupEl[index].classList.add("card__image-popup_active");
  });
});

cardPopupCloseBtnEl.forEach(function (item, index) {
  item.addEventListener("click", function () {
    cardPopupEl[index].classList.remove("card__image-popup_active");
  });
});

cardPopupEl.forEach((card) => {
  card.addEventListener("click", (evt) => {
    if (evt.target === card) {
      card.classList.remove("card__image-popup_active");
    }
  });
});
