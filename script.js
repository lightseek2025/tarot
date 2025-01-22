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

  // 隨機生成牌
  const generateRandomCards = (count, exclude = []) => {
    const deck = Array.from({ length: 78 }, (_, i) => i + 1); // 模擬 78 張牌
    return deck.filter(card => !exclude.includes(card)).sort(() => Math.random() - 0.5).slice(0, count);
  };

  // 顯示牌（維持每行 3 張）
  const displayCards = (container, cards) => {
    cards.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.dataset.card = card;
      cardElement.textContent = "背面";
      cardElement.addEventListener("click", () => {
        cardElement.textContent = `牌 ${card}`;
        cardElement.classList.add("flipped");
      });

      // 新的一行
      if (index % 3 === 0) {
        const row = document.createElement("div");
        row.classList.add("row");
        container.appendChild(row);
      }

      // 添加到最後一行
      const lastRow = container.lastElementChild;
      lastRow.appendChild(cardElement);
    });
  };

  // 靈魂解讀按鈕點擊事件
  soulReadingBtn.addEventListener("click", () => {
    soulDeck = generateRandomCards(3);
    usedCards = [...soulDeck];
    soulCards.innerHTML = ""; // 清空靈魂解讀區域
    displayCards(soulCards, soulDeck);

    // 隱藏祝福牌
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

      // 如果這個類別還沒有建立區域，則新增
      if (!questionCategories[questionType]) {
        const section = document.createElement("section");
        section.id = `category-${questionType}`;
        section.innerHTML = `<h3>${questionType}</h3>`;
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("cards");
        section.appendChild(cardContainer);
        questionCards.appendChild(section);
        questionCategories[questionType] = cardContainer;
      }

      // 抽新牌並顯示
      const cardContainer = questionCategories[questionType];
      const newCards = generateRandomCards(3, usedCards);
      usedCards = [...usedCards, ...newCards];
      displayCards(cardContainer, newCards);

      // 顯示祝福牌按鈕
      blessing2025Btn.classList.remove("hidden");
    }
  });

  // 2025祝福牌按鈕點擊事件
  blessing2025Btn.addEventListener("click", () => {
    const blessingCardNumber = generateRandomCards(1, usedCards)[0]; // 確保不重複
    usedCards.push(blessingCardNumber); // 標記為已使用
    blessingCardDisplay.textContent = `祝福牌 ${blessingCardNumber}`;
    blessing2025Btn.classList.add("hidden"); // 隱藏按鈕
    blessingCard.classList.remove("hidden"); // 顯示祝福牌
  });
});
