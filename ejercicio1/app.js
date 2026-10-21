const commentInput = document.querySelector("#comment");
const counter = document.querySelector("#counter");
const publishButton = document.querySelector("#publish-button");
const commentForm = document.querySelector("#comment-form");
const formMessage = document.querySelector("#form-message");
const characterLimit = 280;
const warningThreshold = 250;

function updateCommentState() {
  const characterCount = commentInput.value.length;

  counter.textContent = `${characterCount}/${characterLimit}`;
  counter.classList.toggle("counter--warning", characterCount >= warningThreshold && characterCount < characterLimit);
  counter.classList.toggle("counter--limit", characterCount === characterLimit);
  publishButton.disabled = characterCount === characterLimit;
  formMessage.textContent = "";
}

commentInput.addEventListener("input", updateCommentState);

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  commentForm.reset();
  updateCommentState();
  formMessage.textContent = "Tu comentario se publicó correctamente.";
});