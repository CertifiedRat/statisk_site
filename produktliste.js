const productUrl = "https://kea-alt-del.dk/t7/api/products";
const listContainer = document.querySelector(".product_list_container");

//Første/Torsdag Version:
// function getData() {
//   fetch(productUrl).then((result) => result.json().then((data) => showData(data)));
// }

// function showData(data) {
//   console.log(data);
// }

// getData();

//Peters Version:
function getData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showData(data);
    });
  });
}
function showData(products) {
  //   listContainer.innerHTML = "";
  let newInnerHTML = "";

  products.forEach((product) => {
    // let soldoutClass = "";
    // if (product.soldout) {
    //   soldoutClass = "soldout";
    // }
    // Indsæt ${soldoutClass} som et class name i article

    newInnerHTML += `<a class="product ${product.soldout ? "soldout" : ""}" href="produkt.html">
          <div class="product-img">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" />
            <p class="soldout-tag">Sold Out</p>
          </div>
          <p><strong>${product.brandname} - ${product.articletype}</strong></p>
          <p>${product.productdisplayname}</p>
          <div class="prices">
            <p class="price"><strong>${product.price}</strong></p>
            <p class="new-price"></p>
          </div>
          <p class="discount-tag"></p>
        </a>`;
    listContainer.innerHTML = newInnerHTML;
  });
}
// "id": 1163,
// "gender": "Men",
// "category": "Apparel",
// "subcategory": "Topwear",
// "articletype": "Tshirts",
// "season": "Summer",
// "productionyear": 2011,
// "usagetype": "Sports",
// "productdisplayname": "Sahara Team India Fanwear Round Neck Jersey",
// "price": 895,
// "discount": null,
// "brandname": "Nike",
// "soldout": 0
// <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Placeholder" />
//     <h3>${product.productdisplayname}</h3>
//     <p>${product.brandname} - ${product.articletype}</p>
//     <div>
//       <p>${product.price}</p>
//     </div>
//     <p><a href="#">Read More</a></p>
//     <p class="soldout_tag">Sold Out</p>
//   </article>
// function showData(data) {
//   //   console.log(data);
//   carList.innerHTML = "";
//   let myInnerHTML = "";

//   data.forEach((bil) => {
//     console.log(bil.brand);
//     myInnerHTML += `<article class="card">
//       <h2>${bil.brand}</h2>
//       <div class="imageContainer">
//         <img src="${bil.image}" alt="bil" />
//         <p>SOLD OUT</p>
//       </div>
//       <h3>${bil.model}</h3>
//       <p>${bil.colors[1]}</p>
//     </article>`;
//   });
//   carList.innerHTML = myInnerHTML;

getData(productUrl);
