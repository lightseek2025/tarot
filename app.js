document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card"); // 選取所有卡片

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped"); // 切換flipped類名，實現翻轉效果
    });
  });
});
