document.addEventListener("DOMContentLoaded", () => {
  // 取得各區塊與按鈕元素
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

  // 全局牌庫扣除靈魂解讀的牌（soulUsed）
  let soulUsed = [];
  let soulDrawn = false;

  // 為各領域與 2025 祝福牌建立獨立牌庫（初始牌庫：1~78 減去 soulUsed）
  // domainDecks 為一個物件，每個屬性名稱對應領域，其值為該領域獨立的牌庫
  const domainDecks = {};
  // 2025 祝福牌獨立牌庫
  let blessingDeck = [];

  // 建立一個完整的牌庫（1~78）
  function fullDeck() {
    return Array.from({ length: 78 }, (_, i) => i + 1);
  }

  // 從牌庫中隨機抽取 count 張牌，並移除這些牌（傳入陣列引用）
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

  // 初始化獨立牌庫（扣除靈魂解讀牌）
  function initDecks() {
    const remaining = fullDeck().filter(card => !soulUsed.includes(card));
    // 對每個領域（感情、人際關係、學業、事業、財運）皆初始化獨立牌庫（複製陣列）
    ["感情", "人際關係", "學業", "事業", "財運"].forEach(domain => {
      domainDecks[domain] = [...remaining];
    });
    // 初始化 2025 祝福牌的獨立牌庫
    blessingDeck = [...remaining];
  }

  // 建立卡片 DOM 並加入 container（用於靈魂解讀）
  // 初始時每張卡預設加上 "flipped" class，表示以背面呈現
  function displayCards(container, cards) {
    container.innerHTML = "";
    cards.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "flipped");
      cardDiv.innerHTML = `
        <div class="card-inner">
          <div class="card-front"><img src="cards/${card}.jpeg" alt="牌 ${card}"></div>
          <div class="card-back"><img src="cards/back.jpeg" alt="牌背面"></div>
        </div>
      `;
      cardDiv.addEventListener("click", () => {
        cardDiv.classList.toggle("flipped");
      });
      container.appendChild(cardDiv);
    });
  }

  // 新增卡片到 container，不清除原有內容（用於領域區塊）
  // 每按一次領域按鈕，建立一個新的 row 並加入 3 張卡
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
          <div class="card-front"><img src="cards/${card}.jpeg" alt="牌 ${card}"></div>
          <div class="card-back"><img src="cards/back.jpeg" alt="牌背面"></div>
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
    // 顯示靈魂解讀區，並以 displayCards 呈現（初始皆為背面）
    soulSection.classList.remove("hidden");
    displayCards(soulCards, soulUsed);
    // 隱藏初始按鈕區
    document.querySelector(".btn-container.initial").classList.add("hidden");
    soulDrawn = true;
    // 顯示問題解讀操作說明及按鈕區（操作說明樣式與靈魂解讀一致）
    postSoulInstructions.classList.remove("hidden");
    questionBtnContainer.classList.remove("hidden");
    // 初始化各領域與 2025 祝福牌的獨立牌庫
    initDecks();
  });

  // 當按下「問題解讀」按鈕時，顯示領域按鈕，並隱藏自身
  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
    questionBtnContainer.classList.add("hidden");
  });

  // 當在領域按鈕區點選任一領域按鈕時
  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const domain = e.target.dataset.type;
      // 若該領域尚未建立區塊，則動態新增
      if (!questionCategories[domain]) {
        const section = document.createElement("div");
        section.innerHTML = `<h3>${domain}</h3><hr>`;
        const container = document.createElement("div");
        container.classList.add("cards"); // 此 container 之後會持續新增 row
        section.appendChild(container);
        questionCards.appendChild(section);
        // 將此領域的牌庫也儲存在 questionCategories 物件中
        questionCategories[domain] = { container, deck: domainDecks[domain] };
      }
      const { container, deck } = questionCategories[domain];
      // 從該領域的獨立牌庫抽取 3 張
      const newCards = drawCards(deck, 3);
      if (newCards.length < 3) {
        alert("該領域的卡牌已抽完！");
        return;
      }
      appendCards(container, newCards);
      // 顯示 2025 祝福牌按鈕（若尚未顯示）
      blessingContainer.classList.remove("hidden");
    }
  });

  // 當按下「2025的祝福牌」按鈕時
  // 直接從 blessingDeck 抽取 1 張（呈現正面，不加 flipped）
  blessing2025Btn.addEventListener("click", () => {
    const drawn = drawCards(blessingDeck, 1);
    if (drawn.length < 1) {
      alert("祝福牌已抽完！");
      return;
    }
    const card = drawn[0];
    blessingCardDisplay.innerHTML = `
      <div class="card-inner">
        <div class="card-front"><img src="cards/${card}.jpeg" alt="牌 ${card}"></div>
        <div class="card-back"><img src="cards/back.jpeg" alt="牌背面"></div>
      </div>
    `;
    blessingCard.classList.remove("hidden");
  });
});
