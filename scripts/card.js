import { openModal } from "./utils.js";

const elements = document.querySelector(".elements");
const modalImage = document.querySelector(".modal__image"); // Seleciona o modal de imagem
const templateCard = document.querySelector(".elements__template-card").content;
const modalAdd = document.querySelector(".modal__add-card");

// ------------------------------------------------------------------ LOGICA PARA ELEMENT CARDS ------------------------------------------------------------------------

export class Card {
  constructor(cardData, templateSelector, modalImage) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._modalImage = modalImage;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return template;
  }

  _setEventListeners(cardElement) {
    const likeBtn = cardElement.querySelector(".elements__card-btn");
    const removeBtn = cardElement.querySelector(".elements__btn-remove");
    const cardImage = cardElement.querySelector(".elements__card-image");

    likeBtn.addEventListener("click", () => {
      const heartImage = likeBtn.querySelector(".elements__card-like");
      heartImage.src = heartImage.src.includes("like-disabled")
        ? "./images/like-active.png"
        : "./images/like-disabled.png";

      heartImage.alt =
        heartImage.alt === "imagem coração prenchido"
          ? "imagem coração sem preenchimento"
          : "imagem coração prenchido";
    });

    removeBtn.addEventListener("click", () => {
      cardElement.remove();
    });

    cardImage.addEventListener("click", () => {
      const modalImg = this._modalImage.querySelector(".modal__card-image");
      const modalDesc = this._modalImage.querySelector(
        ".modal__card-description"
      );

      modalImg.src = this._link;
      modalImg.alt = this._name;
      modalDesc.textContent = this._name;

      openModal(this._modalImage);
    });
  }

  generateCard() {
    const cardElement = this._getTemplate();

    const cardImage = cardElement.querySelector(".elements__card-image");
    const cardTitle = cardElement.querySelector(".elements__card-title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}
