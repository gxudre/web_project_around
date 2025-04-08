import { resetFormValidation, configValidation } from "./validate.js";

const elements = document.querySelector(".elements");

//seleciona o form
const formElement = document.querySelector(".modal__form");

//seleciona os inputs
const nameInput = formElement.querySelector(".modal__input-name");
const jobInput = formElement.querySelector(".modal__input-ocupation");

//seleciona os textos de nome e job do perfil
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-ocupation");

// ------------------------------------------------------------ ALTERAÇÃO DE NOME E JOB ---------------------------------------------------------------------

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  //altera o valor do nome e job no perfil
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  //logica para alterar o placeholder para os valores informados
  nameInput.placeholder = nameInput.value;
  jobInput.placeholder = jobInput.value;

  //limpa os inputs
  jobInput.value = "";
  nameInput.value = "";
};

// ---------------------------------------------------------- ABRIR E FECHAR O POPUP -------------------------------------------------------------------------
const modalBackground = document.querySelectorAll(".modal");
const modalEdit = document.querySelector(".modal__edit-profile"); // Seleciona o modal de edição
const modalAdd = document.querySelector(".modal__add-card"); // Seleciona o modal de adicionar
const modalImage = document.querySelector(".modal__image"); // Seleciona o modal de imagem

const Editbtn = document.querySelector(".profile__info-btn");
const closemodalbtnEdit = modalEdit.querySelector(".modal__btn-sair"); // Seleciona o botão de fechar do modal de edição

const addBtn = document.querySelector(".profile__add-btn");
const closeModalbtnAdd = modalAdd.querySelector("#modal-close-add-btn"); // Seleciona o botão de fechar do modal de adicionar

const templateCard = document.querySelector(".elements__template-card").content;
const imageInputTitle = modalAdd.querySelector(".modal__input-titulo");
const imageInputLink = modalAdd.querySelector(".modal__input-link");

const openModal = (modalElement) => {
  if (modalElement) {
    modalElement.classList.add("modal__active");
    if (modalElement.id != "modal__image-popup") {
      resetFormValidation(modalElement, configValidation);
    }
  }
};

const closeModal = (modalElement) => {
  if (modalElement) {
    modalElement.classList.remove("modal__active");

    // reset dos valores dos inputs ao fechar os modais
    jobInput.value = "";
    nameInput.value = "";
    imageInputLink.value = "";
    imageInputTitle.value = "";
  }
};

// ----------------------------------------------------------------- LOGICA EDIT BTN ---------------------------------------------------------------------------

Editbtn.addEventListener("click", () => openModal(modalEdit));

formElement.addEventListener("submit", (evt) => {
  handleProfileFormSubmit(evt);
  closeModal(modalEdit);
});

// ------------------------------------------------------------------- LOGICA ADD BTN -------------------------------------------------------------------------------

addBtn.addEventListener("click", () => openModal(modalAdd));

// ----------------------------------------------------------------- LOGICA GLOBAL PARA FECHAR PELO BACKGROUND E PELO ESC --------------------------------------------------------

modalBackground.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("modal") ||
      event.target.classList.contains("modal__btn-close")
    ) {
      closeModal(modal);
    }
  });
});

modalBackground.forEach((modal) => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal(modal);
    }
  });
});

// ------------------------------------------------------------------ LOGICA PARA ELEMENT CARDS ------------------------------------------------------------------------

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const createCard = (card) => {
  const cardElement = templateCard.cloneNode(true);

  // Captação de imagem e titulo
  const cardImage = cardElement.querySelector(".elements__card-image");
  const cardTitle = cardElement.querySelector(".elements__card-title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  // Logica para Like de Card

  const likeBtns = elements.querySelectorAll(".elements__card-btn");

  const likeToggle = (likebtn) => {
    const heartImage = likebtn.querySelector(".elements__card-like");

    if (heartImage.src.includes("like-disabled")) {
      heartImage.src = "./images/like-active.png";
      heartImage.alt = "imagem coração prenchido";
    } else {
      heartImage.src = "./images/like-disabled.png";
      heartImage.alt = "imagem coração sem preenchimento";
    }
  };

  const likeBtn = cardElement.querySelector(".elements__card-btn");
  likeBtn.addEventListener("click", () => {
    likeToggle(likeBtn);
  });

  // Logica para remover card

  const removeCard = (cardElement) => {
    cardElement.remove();
  };

  const removeBtn = cardElement.querySelector(".elements__btn-remove");
  removeBtn.addEventListener("click", () => {
    removeCard(removeBtn.closest(".elements__card"));
  });

  // logica para modal card image

  const closeModalBtnImg = modalImage.querySelector(".modal__image-close"); // Seleciona o botão de fechar do modal de Imagem
  closeModalBtnImg.addEventListener("click", () => closeModal(modalImage));

  const modalImageCard = modalImage.querySelector(".modal__card-image");
  const modalImageDescription = modalImage.querySelector(
    ".modal__card-description"
  );

  cardImage.addEventListener("click", () => {
    openModal(modalImage);
    modalImageCard.src = cardImage.src;
    modalImageDescription.textContent = cardTitle.textContent;
  }); // Seleciona a imagem do card e define imagem e descrição do modal com ouvinte para abrir modal

  return cardElement;
};

for (let i = 0; initialCards.length > i; i++) {
  const newCard = createCard(initialCards[i]);
  elements.appendChild(newCard);
}

const addForm = modalAdd.querySelector(".modal__form-add");

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newCardData = {
    name: imageInputTitle.value,
    link: imageInputLink.value,
  };

  const newCard = createCard(newCardData);
  elements.prepend(newCard);
  closeModal(modalAdd);

  imageInputTitle.value = "";
  imageInputLink.value = "";
});
