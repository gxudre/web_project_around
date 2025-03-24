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
