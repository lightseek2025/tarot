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

  // 用來記錄已抽出的牌（牌號 1~78）
  let usedCards = [];
  let soulDrawn = false;
  // 記錄問題各領域所產生的區塊
  const questionCategories = {};

  // 從牌庫隨機取得 count 張牌（排除 exclude 中的牌）
  function generateRandomCards(count, exclude = []) {
    const deck = Array.from({ length: 78 }, (_, i) => i + 1);
    const available = deck.filter(card => !exclude.includes(card));
    return available.sort(() => Math.random() - 0.5).slice(0, count);
  }

  // 建立卡片 DOM 並加入 container（用於靈魂解讀，覆蓋式顯示）
  // 初始時每張卡預設加上 "flipped" class，即以背面呈現
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

  // 新增卡片到 container，不清除原有內容（用於問題解讀領域）
  // 每次按下領域按鈕時，建立一個新的 .cards-row，並在 row 中加入三張卡
  function appendCards(container, cards) {
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
    const cards = generateRandomCards(3);
    usedCards.push(...cards);
    // 顯示 sticky 區塊，並以 displayCards 顯示卡牌（初始皆為背面）
    soulSection.classList.remove("hidden");
    displayCards(soulCards, cards);
    // 隱藏初始按鈕區
    document.querySelector(".btn-container.initial").classList.add("hidden");
    soulDrawn = true;
    // 顯示下方「問題解讀」相關區塊
    postSoulInstructions.classList.remove("hidden");
    questionBtnContainer.classList.remove("hidden");
  });

  // 當按下「問題解讀」按鈕時，顯示領域選項
  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
  });

  // 當在問題選項區點選任一領域按鈕時
  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const questionType = e.target.dataset.type;
      // 若該領域尚未建立其區塊，則動態新增（各領域獨立區塊）
      if (!questionCategories[questionType]) {
        const section = document.createElement("div");
        section.innerHTML = `<h3>${questionType}</h3><hr>`;
        const container = document.createElement("div");
        container.classList.add("cards");  // 此 container 將接續新增 row
        section.appendChild(container);
        questionCards.appendChild(section);
        questionCategories[questionType] = container;
      }
      const container = questionCategories[questionType];
      // 從剩餘牌庫抽出 3 張（扣除已使用牌）
      const newCards = generateRandomCards(3, usedCards);
      usedCards.push(...newCards);
      appendCards(container, newCards);
      // 顯示 2025 祝福牌按鈕（若尚未顯示）
      blessingContainer.classList.remove("hidden");
    }
  });

  // 當按下「2025的祝福牌」按鈕時
  // 此處不加 "flipped" class，直接呈現正面效果
  blessing2025Btn.addEventListener("click", () => {
    const card = generateRandomCards(1, usedCards)[0];
    usedCards.push(card);
    blessingCardDisplay.innerHTML = `
      <div class="card-inner">
        <div class="card-front"><img src="cards/${card}.jpeg" alt="牌 ${card}"></div>
        <div class="card-back"><img src="cards/back.jpeg" alt="牌背面"></div>
      </div>
    `;
    // 移除 blessingCardDisplay 上可能的 flipped class（若有設定的話）
    blessingCard.classList.remove("hidden");
    // 如需動畫效果，可在此加入額外程式碼
  });
});
