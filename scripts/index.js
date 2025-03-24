const elements = document.querySelector(".elements");

const likeBtns = elements.querySelectorAll(".elements__card-btn");

const likeToggle = (likebtn) => {
  const heartImage = likebtn.querySelector(".elements__card-like");

  if (heartImage.src.includes("like-disabled")) {
    heartImage.src = "./images/like-active.png";
  } else {
    heartImage.src = "./images/like-disabled.png";
  }
};

likeBtns.forEach((likebtn) => {
  likebtn.addEventListener("click", () => {
    likeToggle(likebtn);
  });
});

const modal = document.querySelector(".modal");

const openmodalbtn = document.querySelector(".profile__info-btn");
const closemodalbtn = modal.querySelector(".modal__btn-sair");

const toggleModal = () => {
  modal.classList.toggle("modal__active");
};

openmodalbtn.addEventListener("click", toggleModal);
closemodalbtn.addEventListener("click", toggleModal);
