"use strict";
console.log("yo");
const productUrl = "https://kea-alt-del.dk/t7/api/categories";

function getData() {
  fetch(productUrl).then((result) => result.json().then((data) => showData(data)));
}
function showData(data) {
  console.log(data);
}

getData();
