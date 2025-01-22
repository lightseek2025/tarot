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

  // 隨機生成牌
  const generateRandomCards = (count, exclude = []) => {
    const deck = Array.from({ length: 78 }, (_, i) => i + 1); // 模擬 78 張牌
    return deck.filter(card => !exclude.includes(card)).sort(() => Math.random() - 0.5).slice(0, count);
  };

  // 顯示牌
  const displayCards = (container, cards) => {
    container.innerHTML = "";
    cards.forEach(card => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.dataset.card = card;
      cardElement.textContent = "背面";
      cardElement.addEventListener("click", () => {
        cardElement.textContent = `牌 ${card}`;
        cardElement.classList.add("flipped");
      });
      container.appendChild(cardElement);
    });
  };

  // 靈魂解讀按鈕點擊事件
  soulReadingBtn.addEventListener("click", () => {
    soulDeck = generateRandomCards(3);
    usedCards = [...soulDeck];
    displayCards(soulCards, soulDeck);
    blessing2025Btn.classList.add("hidden");
    blessingCard.classList.add("hidden");
  });

  // 問題解讀按鈕點擊事件
  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
  });

  // 問題選擇按鈕點擊事件
  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const questionType = e.target.dataset.type;
      const newCards = generateRandomCards(3, usedCards);
      usedCards = [...usedCards, ...newCards];

      const section = document.createElement("section");
      section.innerHTML = `<h3>${questionType}</h3>`;
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("cards");
      section.appendChild(cardContainer);
      displayCards(cardContainer, newCards);

      questionCards.appendChild(section);
      blessing2025Btn.classList.remove("hidden");
    }
  });

  // 2025祝福牌按鈕點擊事件
  blessing2025Btn.addEventListener("click", () => {
    const blessingCardNumber = generateRandomCards(1)[0];
    blessingCardDisplay.textContent = `祝福牌 ${blessingCardNumber}`;
    blessing2025Btn.classList.add("hidden");
    blessingCard.classList.remove("hidden");
  });
});
