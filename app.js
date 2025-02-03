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
  // 記錄各領域區塊（每個領域一個 container）
  const questionCategories = {};

  // 從牌庫隨機取得 count 張牌（排除 exclude 中的牌）
  function generateRandomCards(count, exclude = []) {
    const deck = Array.from({ length: 78 }, (_, i) => i + 1);
    const available = deck.filter(card => !exclude.includes(card));
    return available.sort(() => Math.random() - 0.5).slice(0, count);
  }

  // 建立卡片 DOM 並加入 container（用於靈魂解讀）
  // 初始時每張卡預設加上 "flipped" class（以背面呈現）
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
  // 每按一次領域按鈕，建立一個新的 row 並加入3張卡
  function appendCards(container, cards) {
    // 檢查是否有足夠牌 (若 newCards 長度不足3，則提示已抽完)
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
    const cards = generateRandomCards(3);
    usedCards.push(...cards);
    // 顯示靈魂解讀區，並以 displayCards 呈現（初始皆為背面）
    soulSection.classList.remove("hidden");
    displayCards(soulCards, cards);
    // 隱藏初始按鈕區
    document.querySelector(".btn-container.initial").classList.add("hidden");
    soulDrawn = true;
    // 顯示問題解讀操作說明及按鈕區（操作說明樣式與靈魂解讀一致）
    postSoulInstructions.classList.remove("hidden");
    questionBtnContainer.classList.remove("hidden");
  });

  // 當按下「問題解讀」按鈕時，顯示領域按鈕，並隱藏自身
  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
    // 隱藏問題解讀按鈕區以保持畫面乾淨
    questionBtnContainer.classList.add("hidden");
  });

  // 當在領域按鈕區點選任一領域按鈕時
  questionOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("questionBtn")) {
      const questionType = e.target.dataset.type;
      // 若該領域尚未建立區塊，則動態新增
      if (!questionCategories[questionType]) {
        const section = document.createElement("div");
        section.innerHTML = `<h3>${questionType}</h3><hr>`;
        const container = document.createElement("div");
        container.classList.add("cards"); // 此 container 會持續新增 row
        section.appendChild(container);
        questionCards.appendChild(section);
        questionCategories[questionType] = container;
      }
      const container = questionCategories[questionType];
      // 從牌庫抽取 3 張（排除已使用牌）
      const newCards = generateRandomCards(3, usedCards);
      if (newCards.length < 3) {
        alert("該領域的卡牌已抽完！");
        return;
      }
      usedCards.push(...newCards);
      appendCards(container, newCards);
      // 顯示 2025 祝福牌按鈕（若尚未顯示）
      blessingContainer.classList.remove("hidden");
    }
  });

  // 當按下「2025的祝福牌」按鈕時
  // 直接呈現正面（不使用 flipped class）
  blessing2025Btn.addEventListener("click", () => {
    const card = generateRandomCards(1, usedCards)[0];
    usedCards.push(card);
    blessingCardDisplay.innerHTML = `
      <div class="card-inner">
        <div class="card-front"><img src="cards/${card}.jpeg" alt="牌 ${card}"></div>
        <div class="card-back"><img src="cards/back.jpeg" alt="牌背面"></div>
      </div>
    `;
    blessingCard.classList.remove("hidden");
  });
});
