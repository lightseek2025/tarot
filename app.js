document.addEventListener("DOMContentLoaded", () => {
  const soulReadingBtn = document.getElementById("soulReadingBtn");
  const soulCards = document.getElementById("soulCards");
  const questionReadingBtn = document.getElementById("questionReadingBtn");
  const questionOptions = document.getElementById("questionOptions");
  const questionCards = document.getElementById("questionCards");
  const blessing2025Btn = document.getElementById("blessing2025Btn");
  const blessingCardDisplay = document.getElementById("blessingCardDisplay");

  let usedCards = [];
  const questionCategories = {};

  function generateRandomCards(count, exclude = []) {
    const deck = Array.from({ length: 78 }, (_, i) => i + 1);
    return deck.filter(card => !exclude.includes(card)).sort(() => Math.random() - 0.5).slice(0, count);
  }

  function displayCards(container, cards) {
    cards.forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `<div class="card-inner">
        <div class="card-front"><img src="cards/${card}.jpeg"></div>
        <div class="card-back"></div>
      </div>`;
      cardElement.addEventListener("click", () => cardElement.classList.toggle("flipped"));
      container.appendChild(cardElement);
    });
  }

  soulReadingBtn.addEventListener("click", () => {
    const cards = generateRandomCards(3);
    usedCards.push(...cards);
    displayCards(soulCards, cards);
    soulReadingBtn.classList.add("hidden");
  });

  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
  });

  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const questionType = e.target.dataset.type;
      if (!questionCategories[questionType]) {
        const section = document.createElement("div");
        section.innerHTML = `<h3>${questionType}</h3><div class="separator"></div>`;
        const container = document.createElement("div");
        container.classList.add("cards");
        section.appendChild(container);
        questionCards.appendChild(section);
        questionCategories[questionType] = container;
      }
      const container = questionCategories[questionType];
      displayCards(container, generateRandomCards(3, usedCards));
    }
  });
});
