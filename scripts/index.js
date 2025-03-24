//Lógica para a curtida do post
const elements = document.querySelector(".elements");

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

likeBtns.forEach((likebtn) => {
  likebtn.addEventListener("click", () => {
    likeToggle(likebtn);
  });
});

//Lógica para abrir e fechar o popup
const modal = document.querySelector(".modal");

const openmodalbtn = document.querySelector(".profile__info-btn");
const closemodalbtn = modal.querySelector(".modal__btn-sair");

const toggleModal = () => {
  modal.classList.toggle("modal__active");
};

openmodalbtn.addEventListener("click", toggleModal);
closemodalbtn.addEventListener("click", toggleModal);

// Lógica para alteração de nome e job assim como placeholder dos inputs
let formElement = document.querySelector(".modal__form");

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  let nameInput = formElement.querySelector(".modal__input-name");
  let jobInput = formElement.querySelector(".modal__input-ocupation");

  let profileName = document.querySelector(".profile__info-name");
  let profileJob = document.querySelector(".profile__info-ocupation");

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  nameInput.placeholder = nameInput.value;
  jobInput.placeholder = jobInput.value;

  jobInput.value = "";
  nameInput.value = "";
};

formElement.addEventListener("submit", handleProfileFormSubmit);
