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

  const createCardElement = (cardNumber) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.addEventListener("click", () => {
      card.classList.add("flipped");
      const img = document.createElement("img");
      img.src = `cards/${cardNumber}.jpeg`;
      img.alt = `Card ${cardNumber}`;
      card.appendChild(img);
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
    const cards = generateRandomCards(3);
    usedCards.push(...cards);
    displayCards(soulCards, cards);
    questionReadingBtn.classList.remove("hidden");
  });

  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
  });

  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const cards = generateRandomCards(3);
      usedCards.push(...cards);
      const container = document.createElement("div");
      container.classList.add("cards");
      displayCards(container, cards);
      questionCards.appendChild(container);
    }
  });

  blessing2025Btn.addEventListener("click", () => {
    const card = generateRandomCards(1)[0];
    usedCards.push(card);
    blessingCardDisplay.innerHTML = `<img src="cards/${card}.jpeg" alt="Card ${card}" style="width: 100%; height: 100%; object-fit: cover;">`;
    blessingCard.classList.remove("hidden");
  });
});
