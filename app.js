document.addEventListener("DOMContentLoaded", () => {
  // 取得元素
  const soulReadingBtn = document.getElementById("soulReadingBtn");
  const soulSection = document.getElementById("soulSection");
  const soulCards = document.getElementById("soulCards");

  const postSoulInstructions = document.getElementById("postSoulInstructions");
  const questionBtnContainer = document.getElementById("questionBtnContainer");
  const questionReadingBtn = document.getElementById("questionReadingBtn");
  const questionOptions = document.getElementById("questionOptions");
  const questionCards = document.getElementById("questionCards");

  const blessingContainer = document.getElementById("blessingContainer");
  const blessing2025Btn = document.getElementById("blessing2025Btn");
  const blessingCard = document.getElementById("blessingCard");
  const blessingCardDisplay = document.getElementById("blessingCardDisplay");

  // 靈魂解讀使用的牌（抽出 3 張），後續各領域與祝福牌的牌庫均從完整牌庫扣除這 3 張
  let soulUsed = [];
  let soulDrawn = false;

  // 每個領域獨立的牌庫（初始為 fullDeck() 減去 soulUsed），儲存在 domainDecks 物件中
  const domainDecks = {};
  // 2025 祝福牌獨立牌庫
  let blessingDeck = [];

  // 回傳完整牌庫 [1,...,78]
  function fullDeck() {
    return Array.from({ length: 78 }, (_, i) => i + 1);
  }

  // 從傳入的牌庫 (deck) 中隨機抽取 count 張，並從該陣列中移除這些牌
  function drawCards(deck, count) {
    const drawn = [];
    for (let i = 0; i < count; i++) {
      if (deck.length === 0) break;
      const randIndex = Math.floor(Math.random() * deck.length);
      drawn.push(deck[randIndex]);
      deck.splice(randIndex, 1);
    }
    return drawn;
  }

  // 初始化各領域與 2025 祝福牌的牌庫（以 fullDeck() 減去 soulUsed 為基礎，共 75 張）
  function initDecks() {
    const remaining = fullDeck().filter(card => !soulUsed.includes(card));
    // 各領域獨立牌庫（感情、人際關係、學業、事業、財運）
    ["感情", "人際關係", "學業", "事業", "財運"].forEach(domain => {
      domainDecks[domain] = [...remaining];
    });
    // 2025 祝福牌獨立牌庫
    blessingDeck = [...remaining];
  }

  // 建立卡片 DOM 並加入 container（用於靈魂解讀）
  // 每張牌初始加上 "flipped" class（顯示背面）
  function displayCards(container, cards) {
    container.innerHTML = "";
    cards.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "flipped");
      cardDiv.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <img src="cards/${card}.jpeg" alt="牌 ${card}">
          </div>
          <div class="card-back">
            <img src="cards/back.jpeg" alt="牌背面">
          </div>
        </div>
      `;
      cardDiv.addEventListener("click", () => {
        cardDiv.classList.toggle("flipped");
      });
      container.appendChild(cardDiv);
    });
  }

  // 新增卡片到 container（用於領域區塊），每次新增一 row 內的 3 張卡
  function appendCards(container, cards) {
    if (cards.length < 3) {
      alert("該領域的卡牌已抽完！");
      return;
    }
    const row = document.createElement("div");
    row.classList.add("cards-row");
    cards.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "flipped");
      cardDiv.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <img src="cards/${card}.jpeg" alt="牌 ${card}">
          </div>
          <div class="card-back">
            <img src="cards/back.jpeg" alt="牌背面">
          </div>
        </div>
      `;
      cardDiv.addEventListener("click", () => {
        cardDiv.classList.toggle("flipped");
      });
      row.appendChild(cardDiv);
    });
    container.appendChild(row);
  }

  // 當按下「靈魂解讀」按鈕時
  soulReadingBtn.addEventListener("click", () => {
    if (soulDrawn) return;
    // 從完整牌庫抽 3 張作為靈魂解讀
    soulUsed = drawCards(fullDeck(), 3);
    // 顯示靈魂解讀區，呈現抽出的 3 張（初始皆顯示背面）
    soulSection.classList.remove("hidden");
    displayCards(soulCards, soulUsed);
    // 隱藏初始按鈕區
    document.querySelector(".btn-container.initial").classList.add("hidden");
    soulDrawn = true;
    // 顯示問題解讀操作說明與問題解讀按鈕區
    postSoulInstructions.classList.remove("hidden");
    questionBtnContainer.classList.remove("hidden");
    // 初始化各領域與祝福牌的牌庫
    initDecks();
  });

  // 當按下「問題解讀」按鈕時：隱藏此按鈕區，顯示領域按鈕區
  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
    questionBtnContainer.classList.add("hidden");
  });

  // 當點選領域按鈕時
  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const domain = e.target.dataset.type;
      // 如果該領域尚未建立區塊，則新增一個
      if (!questionCategories[domain]) {
        const section = document.createElement("div");
        section.innerHTML = `<h3>${domain}</h3><hr>`;
        const container = document.createElement("div");
        container.classList.add("cards");
        section.appendChild(container);
        questionCards.appendChild(section);
        // 儲存此領域的 container 與牌庫參考
        questionCategories[domain] = { container, deck: domainDecks[domain] };
      }
      const { container, deck } = questionCategories[domain];
      // 從該領域的獨立牌庫抽 3 張
      const newCards = drawCards(deck, 3);
      if (newCards.length < 3) {
        alert("該領域的卡牌已抽完！");
        return;
      }
      appendCards(container, newCards);
      // 顯示 2025 祝福牌區（如果尚未顯示）
      blessingContainer.classList.remove("hidden");
    }
  });

  // 當按下「2025的祝福牌」按鈕時
  // 從 blessingDeck 抽 1 張牌，直接呈現正面（不加 flipped）
  blessing2025Btn.addEventListener("click", () => {
    const drawn = drawCards(blessingDeck, 1);
    if (drawn.length < 1) {
      alert("祝福牌已抽完！");
      return;
    }
    const card = drawn[0];
    blessingCardDisplay.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="cards/${card}.jpeg" alt="牌 ${card}">
        </div>
        <div class="card-back">
          <img src="cards/back.jpeg" alt="牌背面">
        </div>
      </div>
    `;
    blessingCard.classList.remove("hidden");
  });
});
