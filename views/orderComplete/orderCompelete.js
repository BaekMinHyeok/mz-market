const orderHistoryButton = document.querySelector(".order_history_button");
const mainButton = document.querySelector(".main_button");

// 주문 내역으로 이동
orderHistoryButton.addEventListener("click", function () {
  window.location.href = "/user/order_history";
});

// 메인으로 이동
mainButton.addEventListener("click", function () {
  window.location.href = "/";
});
