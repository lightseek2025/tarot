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
    return allCards.filter((card) => !exclude.includes(card)).slice(0, count);
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
    usedCards = [...usedCards, ...cards];
    displayCards(soulCards, cards);
    questionReadingBtn.classList.remove("hidden");
  });

  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
  });

  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const questionType = e.target.dataset.type;

      // 获取已使用牌（灵魂解读+当前问题领域）
      const currentUsedCards = [...usedCards];

      // 抽取3张新牌
      const newCards = generateRandomCards(3, currentUsedCards);
      usedCards = [...usedCards, ...newCards];

      // 显示新牌
      const container = document.createElement("div");
      container.classList.add("cards");
      displayCards(container, newCards);

      // 添加分隔线
      const separator = document.createElement("div");
      separator.classList.add("separator");
      separator.style.borderTop = "1px solid #b85c38";
      separator.style.margin = "20px 0";

      questionCards.appendChild(container);
      questionCards.appendChild(separator);

      // 显示祝福牌按钮
      blessing2025Btn.classList.remove("hidden");
    }
  });

  blessing2025Btn.addEventListener("click", () => {
    // 抽取1张祝福牌
    const blessingCardNumber = generateRandomCards(1, usedCards)[0];
    usedCards.push(blessingCardNumber);

    blessingCardDisplay.innerHTML = `
      <img src="cards/${blessingCardNumber}.jpeg" alt="Blessing Card" style="width: 100%; height: 100%; object-fit: cover;">
    `;
    blessingCard.classList.remove("hidden");
  });
});
