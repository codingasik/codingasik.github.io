function openImage(src) {
  document.getElementById("modalImg").src = src;
  document.getElementById("modal").style.display = "flex";
}
function closeImage() {
  document.getElementById("modal").style.display = "none";
}