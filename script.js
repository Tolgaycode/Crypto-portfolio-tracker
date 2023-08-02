const amountInput = document.querySelector(".amount-input");
const priceInput = document.querySelector(".price-input");
const totalSpentInput = document.querySelector(".total-spent-input");

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
