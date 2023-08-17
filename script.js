function walletHolding() {
  let updatedData = JSON.parse(localStorage.getItem(protfolioSelected)) || [];
  const transactions = updatedData;

  const transactionsByName = {};

  // Transactions'ı isimlere göre grupla
  transactions.forEach((transaction) => {
    const name = transaction.name;
    if (!transactionsByName[name]) {
      transactionsByName[name] = [];
    }
    transactionsByName[name].push(transaction);
  });

  console.log(transactionsByName);
  const listHoldingWallet = document.querySelector(".listHoldingWallet");
  listHoldingWallet.innerHTML = "";

  //// Buy ve Sell işlemlerini hesapla
  Object.keys(transactionsByName).forEach((name) => {
    const calculateTotal = (type, field) =>
      transactionsByName[name]
        .filter((transaction) => transaction.type === type)
        .reduce(
          (total, transaction) => total + parseFloat(transaction[field]),
          0
        );

    const buyAmount = calculateTotal("Buy", "amount");
    const sellAmount = calculateTotal("Sell", "amount");
    const result = buyAmount - sellAmount;

    const buyValue = calculateTotal("Buy", "value");
    const sellValue = calculateTotal("Sell", "value");
    const resultValue = buyValue - sellValue;

    /// En yuksek En dusuk Satin alim.
    const prices = transactionsByName[name].map((transaction) =>
      parseFloat(transaction.price)
    );

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const averagePrice =
      prices.reduce((sum, price) => sum + price, 0) / prices.length;

    console.log(
      `Name: ${name}, Amount Result: ${result}, Value Result: $ ${resultValue} Max Price: ${maxPrice}, Min Price: ${minPrice} Average Price: ${averagePrice}`
    );

    //Yuvarlamalar
    function roundWithPrecision(number, precision) {
      const factor = 10 ** precision;
      return Math.round(number * factor) / factor;
    }
    const roundedResult = roundWithPrecision(result, 3);
    const roundedResultValue = roundWithPrecision(resultValue, 2);
    const roundedMaxPrice = roundWithPrecision(maxPrice, 2);
    const roundedMinPrice = roundWithPrecision(minPrice, 2);
    const roundedAveragePrice = roundWithPrecision(averagePrice, 2);

    console.log(
      `Name: ${name}, Amount Result: ${roundedResult}, Value Result: $ ${roundedResultValue} Max Price: ${roundedMaxPrice}, Min Price: ${roundedMinPrice} Average Price: ${roundedAveragePrice}`
    );

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("list-item");

    itemDiv.innerHTML = `
          <div class="item-name">
            <i class="fa-solid fa-litecoin-sign" style="color: #ffffff"></i>
            <div class="coin">${name}</div>
          </div>
          <div class="item-amount">${roundedResult}</div>
          <div class="item-price">$ Updated</div>
          <div class="item-value">$ ${roundedResultValue}</div>
          <div class="item-lowes">$ ${roundedMinPrice}</div>
          <div class="item-avg">$ ${roundedAveragePrice}</div>
          <div class="item-highest">$ ${roundedMaxPrice}</div>
          <div class="item-profit">
            <div class="profit">+ $450.90</div>
            <div class="percentage">3.16 %</div>
          </div>
          <div class="item-action">
            <i class="fa-solid fa-circle-chevron-right" style="color: #ffffff"></i>
          </div>
        `;

    listHoldingWallet.appendChild(itemDiv);
  });
}

//localstorage keys object listed in .protfolio-list
function showPortfolioList() {
  const portfolioList = document.querySelector(".protfolio-list");
  portfolioList.innerHTML = ""; // mevcut içeriği temizle

  const keys = Object.keys(localStorage); // tüm anahtarları al

  keys.forEach((key) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <div class="wallet">
      <i class="fa-solid fa-wallet" style="color: #ffffff"></i>
      <span>${key}</span>
    </div>
  `;
    portfolioList.appendChild(listItem);
  });
}

showPortfolioList();
//Portfolio select
const portfolioListItems = document.querySelectorAll(".protfolio-list li");

const portfolioListArray = Array.from(portfolioListItems);

let protfolioSelected = "↓ Select Portfolio";
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
    // userInput local storage a ekleyelim [] olarak
    localStorage.setItem(userInput, JSON.stringify([]));

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
  walletHolding();
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

  document.querySelector(".transaction-text").textContent = "Add Transaction";
  document.querySelector(".buy-btn").classList.remove("active");
  document.querySelector(".sell-btn").classList.remove("active");
  document.querySelector(".transfer-btn").classList.remove("active");
  document.querySelector(".coin-input").value = "";
  document.querySelector(".amount-input").value = "";
  document.querySelector(".price-input").value = "";
  document.querySelector(".date-input").value = "";
  document.querySelector(".time-input").value = "";
  document.querySelector(".total-spent-input").textContent = `$ 0`;
  document.querySelector(".add-transaction-btn").style.display = "flex";
  document.querySelector(".update-btn").style.display = "none";
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
      btns[j].classList.remove("active");
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
// const dateInput = document.getElementById("dateInput");
// const isosToday = new Date().toISOString().split("T")[0];
// dateInput.value = isosToday;

// const parts = isosToday.split("-");
// const today = `${parts[2]}-${parts[1]}-${parts[0]}`;

// const timeInput = document.getElementById("timeInput");

// const now = new Date();
// const currentHour = String(now.getHours()).padStart(2, "0");
// const currentMinute = String(now.getMinutes()).padStart(2, "0");

// timeInput.value = `${currentHour}:${currentMinute}`;

// const selectedDate = today;
// const selectedTime = timeInput.value;

/////////////////////////////////////////////////////////
const addTransactionBtn = document.querySelector(".add-transaction-btn");

addTransactionBtn.addEventListener("click", () => {
  const transactionType = typeInput;
  const coinName = document.querySelector(".coin-input").value;
  const amount = document.querySelector(".amount-input").value;
  const price = document.querySelector(".price-input").value;
  const date = document.querySelector(".date-input").value;
  const time = document.querySelector(".time-input").value;
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

  let saveData = JSON.parse(localStorage.getItem(protfolioSelected)) || [];
  saveData.push(transactionData);
  localStorage.setItem(selectedPortfolioKey, JSON.stringify(saveData));
  let updatedData = JSON.parse(localStorage.getItem(protfolioSelected));
  renderTransactionList(updatedData);
  closeOverlay();
});

// Local deki veriyi html ekleme
window.addEventListener("load", function () {
  let savedData = JSON.parse(localStorage.getItem(protfolioSelected)) || [];
  renderTransactionList(savedData);
});

function renderTransactionList(transactionData) {
  const listTransactionContainer = document.querySelector(".list-transaction");

  listTransactionContainer.innerHTML = "";

  transactionData.forEach((transaction, index) => {
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
      <div class="trans-coin">${transaction.name}</div>
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
      document.querySelector(".transaction-text").textContent =
        "Edit Transaction";
      document.querySelector(".add-transaction-btn").style.display = "none";
      document.querySelector(".update-btn").style.display = "flex";
    });
    trashCan.addEventListener("click", () => {
      deleteEntry(index);
    });
  });
}

// Editting inputs from localstoage
function editTransaction(index) {
  overlay.style.display = "flex";
  let transData = JSON.parse(localStorage.getItem(protfolioSelected)) || [];
  document.querySelector(".index-input").value = index;
  document.querySelector(".coin-input").value = transData[index].name;
  document.querySelector(".amount-input").value = transData[index].amount;
  document.querySelector(".price-input").value = transData[index].price;
  document.querySelector(".date-input").value = transData[index].date;
  document.querySelector(".time-input").value = transData[index].time;

  for (let j = 0; j < btns.length; j++) {
    btns[j].classList.remove("active");
  }

  if (transData[index].type === "Buy") {
    document.querySelector(".buy-btn").classList.add("active");
  } else if (transData[index].type === "Sell") {
    document.querySelector(".sell-btn").classList.add("active");
  } else if (transData[index].type === "Transfer") {
    document.querySelector(".transfer-btn").classList.add("active");
  }
  updateTotalSpent();
}

//update data

function updateEntry(index) {
  let transData = JSON.parse(localStorage.getItem(protfolioSelected)) || [];
  transData[index].type = typeInput;
  transData[index].name = document.querySelector(".coin-input").value;
  transData[index].amount = document.querySelector(".amount-input").value;
  transData[index].price = document.querySelector(".price-input").value;
  transData[index].date = document.querySelector(".date-input").value;
  transData[index].time = document.querySelector(".time-input").value;
  transData[index].value = totalSpentInput.textContent.slice(2);

  localStorage.setItem(protfolioSelected, JSON.stringify(transData));
  renderTransactions();
}
updatebtn = document.querySelector(".update-btn");
updatebtn.addEventListener("click", () => {
  updateEntry(document.querySelector(".index-input").value);
  closeOverlay();
});

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

////////////////HOLDINGS/////////////////

// /// Anahardeğer çiftlerini LocalStorage'dan alın
// // Tüm anahtar-değer çiftlerini LocalStorage'dan alın
// const allItems = { ...localStorage };

// // Anahtar-değer çiftlerini içeren nesneleri ayrıştırın
// const parsedItems = Object.keys(allItems).reduce((acc, key) => {
//   try {
//     const parsedValue = JSON.parse(allItems[key]);
//     acc[key] = parsedValue;
//   } catch (error) {
//     console.error(
//       `Hata: Anahtar "${key}" için değer ayrıştırılamadı: ${error}`
//     );
//   }
//   return acc;
// }, {});

// // Tüm verilere erişmek için parsedItems nesnesini kullanabilirsiniz
// console.log(parsedItems);

// console.log(allItems);

// const values = Object.values(allItems);

// console.log(values);
