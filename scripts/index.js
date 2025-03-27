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

// Lógica para alteração de nome e job

//seleciona o form
const formElement = document.querySelector(".modal__form");

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  //seleciona os inputs
  const nameInput = formElement.querySelector(".modal__input-name");
  const jobInput = formElement.querySelector(".modal__input-ocupation");

  //seleciona os textos de nome e job do perfil
  const profileName = document.querySelector(".profile__info-name");
  const profileJob = document.querySelector(".profile__info-ocupation");

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

formElement.addEventListener("submit", handleProfileFormSubmit);
// fecha o popup ao dar o submit
formElement.addEventListener("submit", toggleModal);
