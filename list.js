const param = new URLSearchParams(window.location.search);
const selectedSeason = param.get("season");
console.log("selectedSeason", selectedSeason);

const productUrl = `https://kea-alt-del.dk/t7/api/products?season=${selectedSeason}`;
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
    //${product.discount ? "discount" : ""}
    // ${functionNavn ?(Hvis den er sand/værdi mere end 0(truthy)) "hvad der skal ske" :(hvis den ikke er sand(falsy)) "(nothing)"}

    //Udregning af ny pris, som vist i undervisningen;
    const calculateDiscount = (price, discountPercent) => {
      return (price * (100 - discountPercent)) / 100;
    };
    //Indsættes som ${calculateDiscount(product.price, product.discount)} i det tag ens nye pris skal stå.

    newInnerHTML += `<a class="product ${product.soldout ? "soldout" : ""} ${hasDiscount}" href="produkt.html?id=${product.id}">
          <div class="product-img">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" />
            <p class="soldout-tag">Sold Out</p>
          </div>
          <p><strong>${product.productdisplayname}</strong></p>
          <p>${product.brandname} - ${product.articletype}</p>
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
