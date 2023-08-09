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

const protfolioList = document.querySelector(".protfolio-list");

protfolioList.addEventListener("click", () => {
  const listTransactionContainer = document.querySelector(".list-transaction");
  listTransactionContainer.innerHTML = "";
  let updatedData = JSON.parse(localStorage.getItem(protfolioSelected)) || [];
  renderTransactionList(updatedData);
});

// Portfolio name change webpage
var protfolioName = document.querySelector(".protfolio-name");

function updatePortfolioText() {
  protfolioName.textContent = protfolioSelected;
}
updatePortfolioText();

//////////////////////////////////////////////////////////////////////

//// ADD TRANSACTION JS

// add transaction amountInput ve priceInput alanlarının her değiştiğinde güncellemeleri dinleyin

const amountInput = document.querySelector(".amount-input");
const priceInput = document.querySelector(".price-input");
const totalSpentInput = document.querySelector(".total-spent-input");

amountInput.addEventListener("input", updateTotalSpent);
priceInput.addEventListener("input", updateTotalSpent);

function updateTotalSpent() {
  const amount = parseFloat(amountInput.value) || 0;
  const price = parseFloat(priceInput.value) || 0;

  const totalSpent = amount * price;

  totalSpentInput.textContent = `$ ${totalSpent.toFixed(2)}`;
}

// .transaction-btn window open active
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
const selectedTime = timeInput.value;

/////////////////////////////////////////////////////////
const addTransactionBtn = document.querySelector(".add-transaction-btn");

addTransactionBtn.addEventListener("click", () => {
  const transactionType = typeInput;
  const coinName = document.querySelector(".coin-input").value;
  const amount = document.querySelector(".amount-input").value;
  const price = document.querySelector(".price-input").value;
  const date = selectedDate;
  const time = selectedTime;
  const totalSpent = totalSpentInput.textContent.slice(2);

  // Inputların doldurulması ve Local ekleme
  const selectedPortfolioKey = `${protfolioSelected}`;
  const transactionData = {
    type: transactionType,
    name: coinName,
    amount: amount,
    price: price,
    date: date,
    time: time,
    value: totalSpent,
  };
  console.log(selectedPortfolioKey);
  console.log(transactionData);

  let saveData = JSON.parse(localStorage.getItem(protfolioSelected)) || [];
  saveData.push(transactionData);
  localStorage.setItem(selectedPortfolioKey, JSON.stringify(saveData));
  let updatedData = JSON.parse(localStorage.getItem(protfolioSelected));
  renderTransactionList(updatedData);
});

// Local deki veriyi html ekleme
window.addEventListener("load", function () {
  let savedData = JSON.parse(localStorage.getItem(protfolioSelected)) || [];
  renderTransactionList(savedData);
});

function renderTransactionList(transactionData) {
  const listTransactionContainer = document.querySelector(".list-transaction");

  listTransactionContainer.innerHTML = "";

  transactionData.forEach((transaction, index, editIndex) => {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");

    const transType = document.createElement("div");
    transType.classList.add("trans-type");
    transType.innerHTML = `<div class=${transaction.type.toLowerCase()}>${
      transaction.type
    }</div>`;

    const transDate = document.createElement("div");
    transDate.classList.add("trans-date");
    transDate.textContent = transaction.date + " " + transaction.time;

    const transName = document.createElement("div");
    transName.classList.add("trans-name");
    transName.innerHTML = `
      <i class="fa-solid fa-litecoin-sign" style="color: #ffffff"></i>
      <div class="coin">${transaction.name}</div>
    `;

    const transAmount = document.createElement("div");
    transAmount.classList.add("trans-amount");
    transAmount.textContent = transaction.amount;

    const transPrice = document.createElement("div");
    transPrice.classList.add("trans-price");
    transPrice.textContent = transaction.price;

    const transValue = document.createElement("div");
    transValue.classList.add("trans-value");
    transValue.textContent = transaction.value;

    const transPnl = document.createElement("div");
    transPnl.classList.add("trans-pnl");
    transPnl.textContent = "pnl $00.00";

    const transAction = document.createElement("div");
    transAction.classList.add("trans-action");
    const penToSquare = document.createElement("i");
    penToSquare.classList.add("fa-regular", "fa-pen-to-square");
    penToSquare.style.color = "#ffffff";
    const trashCan = document.createElement("i");
    trashCan.classList.add("fa-regular", "fa-trash-can");
    trashCan.style.color = "#ffffff";

    transAction.appendChild(penToSquare);
    transAction.appendChild(trashCan);

    // transAction.innerHTML = `
    //   <i class="fa-regular fa-pen-to-square" style="color: #ffffff"></i>
    //   <i class="fa-regular fa-trash-can" style="color: #ffffff"></i>
    // `;

    listItem.appendChild(transType);
    listItem.appendChild(transDate);
    listItem.appendChild(transName);
    listItem.appendChild(transAmount);
    listItem.appendChild(transPrice);
    listItem.appendChild(transValue);
    listItem.appendChild(transPnl);
    listItem.appendChild(transAction);

    listTransactionContainer.appendChild(listItem);

    penToSquare.addEventListener("click", () => {
      editTransaction(index);
    });
    trashCan.addEventListener("click", () => {
      deleteEntry(index);
    });
  });
}

// Edit transaction faction TAMAMLANMADI
function editTransaction(index) {
  // overlay.style.display = "flex";
  // let updatedData = JSON.parse(localStorage.getItem(protfolioSelected)) || [];
  // updatedData.splice(index, 1);
  // let coinNameEdit = document.querySelector(".coin-input");
  // coinNameEdit.value = updatedData[0].name;
  // let amountEdit = document.querySelector(".amount-input");
  // amountEdit.value = updatedData[0].amount;
  // console.log(updatedData[0]);
  // console.log(updatedData[0].amount);
  // console.log(index.amount);
}

// Delete transaction faction
function deleteEntry(index) {
  let deleteData = JSON.parse(localStorage.getItem(protfolioSelected)) || [];
  deleteData.splice(index, 1);
  localStorage.setItem(protfolioSelected, JSON.stringify(deleteData));
  renderTransactions();
  console.log(index);
}

// Render Transactions faction
function renderTransactions() {
  const listTransactionContainer = document.querySelector(".list-transaction");
  listTransactionContainer.innerHTML = "";
  let updatedData = JSON.parse(localStorage.getItem(protfolioSelected)) || [];
  renderTransactionList(updatedData);
}
