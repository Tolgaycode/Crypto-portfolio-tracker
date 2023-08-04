//////////////////////////////////////////////////////////////////////
const amountInput = document.querySelector(".amount-input");
const priceInput = document.querySelector(".price-input");
const totalSpentInput = document.querySelector(".total-spent-input");

//Portfolio select
const portfolioListItems = document.querySelectorAll(".protfolio-list li");

const portfolioListArray = Array.from(portfolioListItems);

//let protfolioSelected = "Protfolio 1";

portfolioListArray.forEach((item) => {
  item.addEventListener("click", () => {
    protfolioSelected = item.querySelector("span").textContent;
    console.log(protfolioSelected);
  });
});

// .add-protfolio button
const addPortfolioButton = document.querySelector(".add-protfolio");
addPortfolioButton.addEventListener("click", () => {
  const userInput = prompt("Lütfen yeni bir portföy seçeneği girin:");
  if (userInput) {
    const portfolioList = document.querySelector(".protfolio-list");
    const newOption = document.createElement("li");
    newOption.innerHTML = `
      <div class="wallet">
        <i class="fa-solid fa-wallet" style="color: #ffffff"></i>
        <span>${userInput}</span>
      </div>
    `;
    portfolioList.appendChild(newOption);

    // Yeni öğeye tıklama olayı ekleyelim
    newOption.addEventListener("click", () => {
      protfolioSelected = userInput;
      console.log("Seçilen Portföy:", protfolioSelected);
    });
  }
});

// Add Transaction Total spent JS
// amountInput ve priceInput alanlarının her değiştiğinde güncellemeleri dinleyin
amountInput.addEventListener("input", updateTotalSpent);
priceInput.addEventListener("input", updateTotalSpent);

function updateTotalSpent() {
  const amount = parseFloat(amountInput.value) || 0;
  const price = parseFloat(priceInput.value) || 0;

  const totalSpent = amount * price;

  totalSpentInput.textContent = `$ ${totalSpent.toFixed(2)}`;
}

// .transaction-btn active
let transactionOpenBtn = document.querySelector(".transaction-btn");
let overlay = document.querySelector(".overlay");

transactionOpenBtn.addEventListener("click", function () {
  overlay.style.display = "flex";
});

// add Transaction window closer.
function closeOverlay() {
  document.querySelector(".overlay").style.display = "none";
}

///////////////////////////////////////////////////////////////
