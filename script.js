document.addEventListener("DOMContentLoaded", () => {
  const soulReadingBtn = document.getElementById("soulReadingBtn");
  const soulCards = document.getElementById("soulCards");

  // 測試牌組 (可以替換成實際圖片)
  const deck = Array.from({ length: 78 }, (_, i) => ({
    id: i + 1,
    front: `牌 ${i + 1}`, // 前面可以改成圖檔路徑
    back: "背面"
  }));

  // 隨機生成牌
  const generateRandomCards = (count) => {
    return deck.sort(() => Math.random() - 0.5).slice(0, count);
  };

  // 顯示卡片 (正面和背面)
  const displayCards = (container, cards) => {
    container.innerHTML = ""; // 清空區域
    cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      const cardInner = document.createElement("div");
      cardInner.classList.add("card-inner");

      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");
      cardFront.textContent = card.front;

      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");
      cardBack.textContent = card.back;

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardElement.appendChild(cardInner);

      // 翻牌事件
      cardElement.addEventListener("click", () => {
        cardElement.classList.toggle("flipped");
      });

      container.appendChild(cardElement);
    });
  };

  // 靈魂解讀按鈕點擊事件
  soulReadingBtn.addEventListener("click", () => {
    const cards = generateRandomCards(3);
    displayCards(soulCards, cards);
  });
});
