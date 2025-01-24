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
  let soulReadingDone = false; // 防止靈魂解讀被多次觸發

  const generateRandomCards = (count, exclude = []) => {
    const allCards = Array.from({ length: 78 }, (_, i) => i + 1);
    return allCards
      .filter((card) => !exclude.includes(card))
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
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

  soulReadingBtn.addEventListener("click", () => {
    if (soulReadingDone) return; // 如果已經抽取過，阻止再次觸發
    const cards = generateRandomCards(3);
    usedCards = [...usedCards, ...cards];
    displayCards(soulCards, cards);
    questionReadingBtn.classList.remove("hidden");
    soulReadingDone = true; // 設置為已觸發
  });

  const displayCards = (container, cards) => {
    cards.forEach((card) => {
      const cardElement = createCardElement(card);
      container.appendChild(cardElement);
    });
  };

  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
  });
});
