const modal = document.querySelector(".modal");

const openmodalbtn = document.querySelector(".profile__info-btn");
const closemodalbtn = modal.querySelector(".modal__btn-sair");

const toggleModal = () => {
  modal.classList.toggle("modal__active");
};

openmodalbtn.addEventListener("click", toggleModal);
closemodalbtn.addEventListener("click", toggleModal);
