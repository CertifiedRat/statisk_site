"use strict";
const productUrl = "https://kea-alt-del.dk/t7/api/categories";
const categories = document.querySelector("#categories_list");
const seasonsUrl = "https://kea-alt-del.dk/t7/api/seasons";
const seasons = document.querySelector("#seasons_list");

//Category
function getData() {
  fetch(productUrl).then((result) => result.json().then((data) => showData(data)));
}

function showData(data) {
  // console.log(data);
  categories.innerHTML = "";
  let catInnerHTML = "";
  data.forEach((element) => {
    catInnerHTML += `<a class="display" href="produktliste.html">${element.category}</a>`;
  });
  categories.innerHTML = catInnerHTML;
}

getData();

//Seasons
function getDataSeasons() {
  fetch(seasonsUrl).then((result) => result.json().then((data) => showDataSeasons(data)));
}

function showDataSeasons(data) {
  // console.log(data);
  seasons.innerHTML = "";
  let seaInnerHTML = "";
  data.forEach((element) => {
    seaInnerHTML += `<a class="display" href="produktliste.html">${element.season}</a>`;
  });
  seasons.innerHTML = seaInnerHTML;
}

getDataSeasons();
