//////////////////////////////////////////////////////////////////////
const amountInput = document.querySelector(".amount-input");
const priceInput = document.querySelector(".price-input");
const totalSpentInput = document.querySelector(".total-spent-input");

//Portfolio select
const portfolioListItems = document.querySelectorAll(".protfolio-list li");

const portfolioListArray = Array.from(portfolioListItems);

let protfolioSelected = "All Wallet";
console.log("Profil seçendi: " + protfolioSelected + "(protfolioSelected)");

portfolioListArray.forEach((item) => {
  item.addEventListener("click", () => {
    protfolioSelected = item.querySelector("span").textContent;
    console.log(protfolioSelected);
    updatePortfolioText();
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
      updatePortfolioText();
    });
    updatePortfolioText();
  }
});

// Portfolio name change webpage
var protfolioName = document.querySelector(".protfolio-name");

function updatePortfolioText() {
  protfolioName.textContent = protfolioSelected;
  console.log("Seçilen updated Portföy:", protfolioSelected);
}
updatePortfolioText();

//////////////////////////////////////////////////////////////////////

//// ADD TRANSACTION JS

// add transaction amountInput ve priceInput alanlarının her değiştiğinde güncellemeleri dinleyin
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

// add Transaction window closer icon.
function closeOverlay() {
  document.querySelector(".overlay").style.display = "none";
}
// add Transaction buy sell selection color
const btns = document.querySelectorAll(".buy-btn, .sell-btn, .transfer-btn");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    // Diğer düğmelerden "active" sınıfını kaldır
    for (let j = 0; j < btns.length; j++) {
      if (j !== i) {
        btns[j].classList.remove("active");
      }
    }

    this.classList.toggle("active");
  });
}

// add Transaction buy sell selection output js
const buySelect = document.querySelector(".buy-btn");
const sellSelect = document.querySelector(".sell-btn");
const transferSelect = document.querySelector(".transfer-btn");

let typeInput = "";
console.log(`Selected Type: ${typeInput}` + "(typeInput)");

buySelect.addEventListener("click", function () {
  typeInput = "Buy";
  console.log(`Selected Type: ${typeInput}`);
});
sellSelect.addEventListener("click", function () {
  typeInput = "Sell";
  console.log(`Selected Type: ${typeInput}`);
});
transferSelect.addEventListener("click", function () {
  typeInput = "Transfer";
  console.log(`Selected Type: ${typeInput}`);
});

// Date ve Time input defeult date
const dateInput = document.getElementById("dateInput");
const isosToday = new Date().toISOString().split("T")[0];
dateInput.value = isosToday;

const parts = isosToday.split("-");
const today = `${parts[2]}-${parts[1]}-${parts[0]}`;

const timeInput = document.getElementById("timeInput");

const now = new Date();
const currentHour = String(now.getHours()).padStart(2, "0");
const currentMinute = String(now.getMinutes()).padStart(2, "0");

timeInput.value = `${currentHour}:${currentMinute}`;

const selectedDate = today;
console.log("Seçilen tarih: " + selectedDate + "(selectedDate)");
const selectedTime = timeInput.value;
console.log("Seçilen zaman: " + selectedTime + "(selectedTime)");
