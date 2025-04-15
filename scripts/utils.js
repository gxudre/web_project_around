import { Card } from "./card.js";

const elementsContainer = document.querySelector(".elements");
const modalAdd = document.querySelector(".modal__add-card");

const imageInputTitle = modalAdd.querySelector(".modal__input-titulo");
const imageInputLink = modalAdd.querySelector(".modal__input-link");

const formElement = document.querySelector(".modal__form");
const nameInput = formElement.querySelector(".modal__input-name");
const jobInput = formElement.querySelector(".modal__input-ocupation");
//seleciona os textos de nome e job do perfil
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-ocupation");
const inputTitle = modalAdd.querySelector(".modal__input-titulo");
const inputLink = modalAdd.querySelector(".modal__input-link");
const templateSelector = ".elements__template-card";
const modalImage = document.querySelector(".modal__image");

// -----------------------------------------------------------OPEN E CLOSE MODAL -----------------------------------------------------------------------------

const openModal = (modalElement, FormValidator) => {
  if (modalElement) {
    modalElement.classList.add("modal__active");
    if (modalElement.id != "modal__image-popup") {
      FormValidator.resetValidation();
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

//-------------------------------------------------------- Render Card -----------------------------------------------------------------------------

// Função para renderizar cards
const renderCard = (data) => {
  const card = new Card(data, templateSelector, modalImage);
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
};

//--------------------------------------------------------- Add Submit -----------------------------------------------------------------------------

const handleAddFormSubmit = (e, formValidator, formElement) => {
  e.preventDefault();

  const data = {
    name: inputTitle.value,
    link: inputLink.value,
  };

  renderCard(data);
  closeModal(modalAdd);
  formElement.reset();
  formValidator.resetValidation();
};

export {
  openModal,
  closeModal,
  handleProfileFormSubmit,
  handleAddFormSubmit,
  renderCard,
};
