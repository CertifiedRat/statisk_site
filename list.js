const productUrl = "https://kea-alt-del.dk/t7/api/products";
const listContainer = document.querySelector(".product-list-container");

function getData() {
  fetch(productUrl).then((result) => result.json().then((data) => showData(data)));
}

function showData(products) {
  console.log(products);
  listContainer.innerHTML = "";
  let newInnerHTML = "";

  products.forEach((product) => {
    //Discount kode
    let hasDiscount = "";
    if (product.discount) {
      hasDiscount = "discount";
    }
    // Hvis produktet har discount (mere end 0 i værdi), så giv variablen værdien discount, som kan sættes ind som class i produktcontaineren
    //Kunne også blot indsætte ${product.discount ? "discount" : ""} som class, men forstår den anden metode bedre

    //Udregning af ny pris, som vist i undervisningen;
    const calculateDiscount = (price, discountPercent) => {
      return (price * (100 - discountPercent)) / 100;
    };
    //Indsættes som ${calculateDiscount(product.price, product.discount)} i det tag ens nye pris skal stå.

    newInnerHTML += `<a class="product ${product.soldout ? "soldout" : ""} ${hasDiscount}" href="produkt.html">
          <div class="product-img">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" />
            <p class="soldout-tag">Sold Out</p>
          </div>
          <p><strong>${product.brandname} - ${product.articletype}</strong></p>
          <p>${product.productdisplayname}</p>
          <div class="prices">
            <p class="price">${product.price} kr</p>
            <p class="new-price">${calculateDiscount(product.price, product.discount)}</p>
          </div>
          <p class="discount-tag">${product.discount}%</p>
        </a>`;
    listContainer.innerHTML = newInnerHTML;
  });
}

getData();
