import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import {
  openModal,
  closeModal,
  handleProfileFormSubmit,
  handleAddFormSubmit,
} from "./utils.js";

const elementsContainer = document.querySelector(".elements");
const modalAdd = document.querySelector(".modal__add-card");
const modalImage = document.querySelector(".modal__image");
const formAdd = modalAdd.querySelector(".modal__form-add");
const modalEdit = document.querySelector(".modal__edit-profile");
const formEdit = modalEdit.querySelector(".modal__form-edit");
const addBtn = document.querySelector(".profile__add-btn");
const templateSelector = ".elements__template-card";
const modalBackground = document.querySelectorAll(".modal");
const Editbtn = document.querySelector(".profile__info-btn");

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

// Configuração do validador
const configValidation = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__form-btn",
  inactiveButtonClass: "modal__form-btn_inactive",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__message-error",
};

// Inicializa validador
const addFormValidator = new FormValidator(configValidation, formAdd);
addFormValidator.enableValidation();
const EditFormValidator = new FormValidator(configValidation, formEdit);
EditFormValidator.enableValidation();

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

// Função para renderizar cards
export const renderCard = (data) => {
  const card = new Card(data, templateSelector, modalImage);
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
};

// Renderiza os iniciais
initialCards.forEach(renderCard);

Editbtn.addEventListener("click", () =>
  openModal(modalEdit, EditFormValidator)
);

formEdit.addEventListener("submit", (evt) => {
  handleProfileFormSubmit(evt);
  closeModal(modalEdit);
});

addBtn.addEventListener("click", () => {
  openModal(modalAdd, addFormValidator);
});

// logica para modal card image
const closeModalBtnImg = modalImage.querySelector(".modal__image-close"); // Seleciona o botão de fechar do modal de Imagem
closeModalBtnImg.addEventListener("click", () => closeModal(modalImage));

formAdd.addEventListener("submit", (e) => {
  handleAddFormSubmit(e, formAdd, addFormValidator);
});
