document.addEventListener("DOMContentLoaded", () => {
  const soulReadingBtn = document.getElementById("soulReadingBtn");
  const soulCards = document.getElementById("soulCards");
  const questionReadingBtn = document.getElementById("questionReadingBtn");
  const questionOptions = document.getElementById("questionOptions");
  const questionCards = document.getElementById("questionCards");
  const blessing2025Btn = document.getElementById("blessing2025Btn");
  const blessingCard = document.getElementById("blessingCard");
  const blessingCardDisplay = document.getElementById("blessingCardDisplay");

  let soulDeck = [];
  let usedCards = [];
  const questionCategories = {};

  const generateRandomCards = (count, exclude = []) => {
    const deck = Array.from({ length: 78 }, (_, i) => i + 1);
    return deck.filter(card => !exclude.includes(card)).sort(() => Math.random() - 0.5).slice(0, count);
  };

  const displayCards = (container, cards, isSoul = false) => {
    if (isSoul) container.innerHTML = "";
    cards.forEach(card => {
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
    soulDeck = generateRandomCards(3);
    usedCards = [...soulDeck];
    displayCards(soulCards, soulDeck, true);
    blessing2025Btn.classList.add("hidden");
    blessingCard.classList.add("hidden");
  });

  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
  });

  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const questionType = e.target.dataset.type;

      if (!questionCategories[questionType]) {
        const section = document.createElement("section");
        section.innerHTML = `<h3>${questionType}</h3><div class="separator"></div>`;
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("cards");
        section.appendChild(cardContainer);
        questionCards.appendChild(section);
        questionCategories[questionType] = cardContainer;
      }

      const cardContainer = questionCategories[questionType];
      const newCards = generateRandomCards(3, usedCards);
      usedCards = [...usedCards, ...newCards];
      displayCards(cardContainer, newCards);

      blessing2025Btn.classList.remove("hidden");
    }
  });

  blessing2025Btn.addEventListener("click", () => {
    const blessingCardNumber = generateRandomCards(1, usedCards)[0];
    blessingCardDisplay.innerHTML = `<img src="cards/${blessingCardNumber}.jpeg" alt="Blessing Card" style="width: 100%; height: 100%; object-fit: cover;">`;
    blessingCard.classList.remove("hidden");
  });
});
