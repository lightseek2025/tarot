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
  let soulDone = false;

  const generateRandomCards = (count, exclude = []) => {
    const allCards = Array.from({ length: 78 }, (_, i) => i + 1);
    return allCards.filter((c) => !exclude.includes(c)).sort(() => Math.random() - 0.5).slice(0, count);
  };

  const createCard = (cardNumber) => {
    const card = document.createElement("div");
    card.className = "card";
    const cardInner = document.createElement("div");
    cardInner.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-front";
    front.innerHTML = `<img src="cards/${cardNumber}.jpeg">`;

    const back = document.createElement("div");
    back.className = "card-back";

    cardInner.append(back, front);
    card.append(cardInner);

    card.addEventListener("click", () => card.classList.toggle("flipped"));
    return card;
  };

  soulReadingBtn.addEventListener("click", () => {
    if (soulDone) return;
    const cards = generateRandomCards(3);
    usedCards.push(...cards);
    cards.forEach((num) => soulCards.append(createCard(num)));
    soulDone = true;
    questionReadingBtn.classList.remove("hidden");
  });

  questionReadingBtn.addEventListener("click", () => {
    questionOptions.classList.remove("hidden");
  });
});
