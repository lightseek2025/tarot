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

  // 儲存各領域獨立的牌庫（領域名稱作為 key）
  const domainDecks = {};
  // 2025 祝福牌獨立的牌庫
  let blessingDeck = [];

  // 儲存各領域區塊與牌庫參考
  const questionCategories = {};

  // 回傳完整牌庫：[1, 2, …, 78]
  function fullDeck() {
    return Array.from({ length: 78 }, (_, i) => i + 1);
  }

  // 從牌庫 (deck) 中隨機抽取 count 張牌，並從該陣列中移除這些牌
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

  // 初始化各領域與 2025 祝福牌的牌庫（以 fullDeck() 減去 soulUsed 為基礎）
  function initDecks() {
    const remaining = fullDeck().filter(card => !soulUsed.includes(card));
    console.log("初始化牌庫，剩餘牌：", remaining);
    ["感情", "人際關係", "學業", "事業", "財運"].forEach(domain => {
      domainDecks[domain] = [...remaining];
      console.log(`領域 ${domain} 牌庫初始化完成，牌數：${domainDecks[domain].length}`);
    });
    blessingDeck = [...remaining];
    console.log("祝福牌牌庫初始化完成，牌數：", blessingDeck.length);
  }

  // 建立卡片 DOM 並加入 container（用於靈魂解讀）
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
    soulUsed = drawCards(fullDeck(), 3);
    console.log("靈魂解讀抽出的牌：", soulUsed);
    soulSection.classList.remove("hidden");
    displayCards(soulCards, soulUsed);
    document.querySelector(".btn-container.initial").classList.add("hidden");
    soulDrawn = true;
    // 顯示問題解讀操作說明區（將 inline style opacity 設為 0 -> 1）
    postSoulInstructions.style.opacity = "1";
    postSoulInstructions.classList.remove("hidden");
    questionBtnContainer.classList.remove("hidden");
    initDecks();
  });

  // 當按下「問題解讀」按鈕時，隱藏該按鈕區並顯示領域按鈕區
  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
    questionBtnContainer.classList.add("hidden");
    console.log("顯示領域按鈕區：", questionOptions);
  });

  // 為領域按鈕設置事件委派
  questionOptions.addEventListener("click", (e) => {
    console.log("領域按鈕區點擊事件觸發，目標：", e.target);
    if (e.target.classList.contains("questionBtn")) {
      const domain = e.target.dataset.type;
      console.log("點擊的領域：", domain);
      if (!questionCategories[domain]) {
        const section = document.createElement("div");
        section.innerHTML = `<h3>${domain}</h3><hr>`;
        const container = document.createElement("div");
        container.classList.add("cards");
        section.appendChild(container);
        questionCards.appendChild(section);
        questionCategories[domain] = { container, deck: domainDecks[domain] };
        console.log(`建立領域區塊：${domain}`);
      }
      const { container, deck } = questionCategories[domain];
      const newCards = drawCards(deck, 3);
      console.log(`領域 ${domain} 抽出的牌：`, newCards, "剩餘牌：", deck);
      if (newCards.length < 3) {
        alert("該領域的卡牌已抽完！");
        return;
      }
      appendCards(container, newCards);
      blessingContainer.classList.remove("hidden");
    }
  });

  // 當按下「2025的祝福牌」按鈕時
  blessing2025Btn.addEventListener("click", () => {
    const drawn = drawCards(blessingDeck, 1);
    if (drawn.length < 1) {
      alert("祝福牌已抽完！");
      return;
    }
    const card = drawn[0];
    console.log("2025祝福牌抽出：", card, "剩餘牌：", blessingDeck);
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

  // --- Typewriter 效果 ---
  // 此函式逐字將 text 輸出到 element，遇標點延長延遲；完成後文字保持不變
  function typewriterEffect(element, text, index = 0) {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      let delay = 50;
      const char = text.charAt(index);
      if (",.;!?".includes(char)) {
        delay = 300;
      }
      setTimeout(() => {
        typewriterEffect(element, text, index + 1);
      }, delay);
    }
  }

  // 利用 IntersectionObserver 監控問題解讀操作說明區（postSoulInstructions）
  // 當進入 viewport 時，對內部所有 .typewriter-text 元素開始打字機效果
  const observerOptions = {
    root: null,
    threshold: 0 // 只要有一點進入 viewport 就觸發
  };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const typewriterTexts = entry.target.querySelectorAll(".typewriter-text");
        typewriterTexts.forEach(el => {
          const fullText = el.textContent;
          el.textContent = "";
          typewriterEffect(el, fullText);
        });
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  observer.observe(postSoulInstructions);
});
