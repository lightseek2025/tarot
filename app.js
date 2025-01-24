document.addEventListener("DOMContentLoaded", () => {
  const soulReadingBtn = document.getElementById("soulReadingBtn");
  const soulCards = document.getElementById("soulCards");
  const questionReadingBtn = document.getElementById("questionReadingBtn");
  const questionOptions = document.getElementById("questionOptions");
  const questionCards = document.getElementById("questionCards");

  let usedCards = [];

  const generateRandomCards = (count, exclude = []) => {
    const deck = Array.from({ length: 78 }, (_, i) => i + 1);
    return deck.filter((card) => !exclude.includes(card)).sort(() => Math.random() - 0.5).slice(0, count);
  };

  const displayCards = (container, cards) => {
    container.innerHTML = ""; // 清空容器
    cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      const cardInner = document.createElement("div");
      cardInner.classList.add("card-inner");

      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");
      cardFront.innerHTML = `<img src="cards/${card}.jpeg" alt="Card ${card}" style="width: 100%; height: 100%; object-fit: cover;">`;

      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardElement.appendChild(cardInner);

      cardElement.addEventListener("click", () => {
        cardElement.classList.toggle("flipped");
      });

      container.appendChild(cardElement);
    });
  };

  soulReadingBtn.addEventListener("click", () => {
    const cards = generateRandomCards(3, usedCards);
    usedCards.push(...cards);
    displayCards(soulCards, cards);
    soulReadingBtn.classList.add("hidden");
    questionReadingBtn.classList.remove("hidden");
  });

  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
  });

  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const cards = generateRandomCards(3, usedCards);
      usedCards.push(...cards);
      displayCards(questionCards, cards);
    }
  });
});
