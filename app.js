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
  const generateRandomCards = (count, exclude = []) => {
    const allCards = Array.from({ length: 78 }, (_, i) => i + 1);
    return allCards.filter((card) => !exclude.includes(card)).sort(() => Math.random() - 0.5).slice(0, count);
  };

  const createCardElement = (cardNumber) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.innerHTML = `<img src="cards/${cardNumber}.jpeg" alt="Card ${cardNumber}">`;

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener("click", () => {
      cardInner.classList.toggle("flipped");
    });

    return card;
  };

  const displayCards = (container, cards) => {
    cards.forEach((card) => {
      const cardElement = createCardElement(card);
      container.appendChild(cardElement);
    });
  };

  soulReadingBtn.addEventListener("click", () => {
    soulCards.innerHTML = ""; // 清空灵魂解读区
    const cards = generateRandomCards(3);
    usedCards = [...usedCards, ...cards];
    displayCards(soulCards, cards);
    questionReadingBtn.classList.remove("hidden");
  });

  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
  });

  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const currentUsedCards = [...usedCards];
      const newCards = generateRandomCards(3, currentUsedCards);
      usedCards = [...usedCards, ...newCards];

      const container = document.createElement("div");
      container.classList.add("cards");
      displayCards(container, newCards);

      const separator = document.createElement("div");
      separator.style.borderTop = "1px solid #b85c38";
      separator.style.margin = "20px 0";

      questionCards.appendChild(container);
      questionCards.appendChild(separator);

      blessing2025Btn.classList.remove("hidden");
    }
  });

  blessing2025Btn.addEventListener("click", () => {
    const blessingCardNumber = generateRandomCards(1, usedCards)[0];
    usedCards.push(blessingCardNumber);

    blessingCardDisplay.innerHTML = `
      <div class="card-inner flipped">
        <div class="card-front">
          <img src="cards/${blessingCardNumber}.jpeg" alt="Blessing Card">
        </div>
        <div class="card-back"></div>
      </div>
    `;
    blessingCard.classList.remove("hidden");
  });
});
