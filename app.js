document.addEventListener("DOMContentLoaded", () => {
  const soulReadingBtn = document.getElementById("soulReadingBtn");
  const soulCards = document.getElementById("soulCards");
  const questionReadingBtn = document.getElementById("questionReadingBtn");
  const questionOptions = document.getElementById("questionOptions");
  const questionCards = document.getElementById("questionCards");
  const blessing2025Btn = document.getElementById("blessing2025Btn");
  const blessingCard = document.getElementById("blessingCard");
  const blessingCardDisplay = document.getElementById("blessingCardDisplay");

  let usedCards = [];
  const generateRandomCards = (count) => {
    const allCards = Array.from({ length: 78 }, (_, i) => i + 1);
    return allCards.filter((card) => !usedCards.includes(card)).slice(0, count);
  };

  const displayCards = (container, cards) => {
    cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.textContent = `Card ${card}`;
      container.appendChild(cardElement);
    });
  };

  soulReadingBtn.addEventListener("click", () => {
    const cards = generateRandomCards(3);
    usedCards.push(...cards);
    displayCards(soulCards, cards);
    questionReadingBtn.classList.remove("hidden");
  });

  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
  });

  blessing2025Btn.addEventListener("click", () => {
    const cards = generateRandomCards(1);
    blessingCardDisplay.textContent = `Card ${cards[0]}`;
    blessingCard.classList.remove("hidden");
  });
});
