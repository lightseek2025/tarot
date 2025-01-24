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
  
  // 生成随机牌的函数
  const generateRandomCards = (count, exclude = []) => {
    const allCards = Array.from({ length: 78 }, (_, i) => i + 1);
    return allCards
      .filter((card) => !exclude.includes(card))
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  };

  // 创建牌的 DOM 元素
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

    // 点击事件：翻转卡片
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    return card;
  };

  // 显示卡片
  const displayCards = (container, cards) => {
    cards.forEach((card) => {
      const cardElement = createCardElement(card);
      container.appendChild(cardElement);
    });
  };

  // 点击“灵魂解读”
  soulReadingBtn.addEventListener("click", () => {
    const cards = generateRandomCards(3);
    usedCards = [...usedCards, ...cards];
    displayCards(soulCards, cards);
    questionReadingBtn.classList.remove("hidden");
  });

  // 点击“问题解读”
  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
    document.querySelectorAll(".questionBtn").forEach((btn) => btn.classList.remove("hidden"));
  });

  // 点击领域按钮
  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const newCards = generateRandomCards(3, usedCards);
      usedCards = [...usedCards, ...newCards];
      const container = document.createElement("div");
      container.classList.add("cards");
      displayCards(container, newCards);
      questionCards.appendChild(container);
      blessing2025Btn.classList.remove("hidden");
    }
  });

  // 点击“2025祝福牌”
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
