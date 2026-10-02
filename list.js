const param = new URLSearchParams(window.location.search);
const selectedSeason = param.get("season");
const selectedCategory = param.get("category");
const listContainer = document.querySelector(".product-list-container");
const header = document.querySelector(".intro-txt");
let allData;

//URL PARAMETRE-------------------------------------------------------------------------------------------------------
let currentUrl = "";
let headertitle;
if (selectedSeason) {
  currentUrl = `https://kea-alt-del.dk/t7/api/products?season=${selectedSeason}&limit=50`;
  headertitle = selectedSeason + " Products";
} else if (selectedCategory) {
  currentUrl = `https://kea-alt-del.dk/t7/api/products?category=${selectedCategory}&limit=50`;
  headertitle = selectedCategory;
} else {
  currentUrl = `https://kea-alt-del.dk/t7/api/products?limit=50`;
  headertitle = "All Products";
}

//FILTERS---------------------------------------------------------------------------------------------------------------
document.querySelectorAll(".genders option").forEach((btn) => {
  btn.addEventListener("click", genders);
});
function genders(evt) {
  const gender = allData.filter((product) => product.gender === evt.target.dataset.filter);
  showData(gender);
  if (evt.target.dataset.filter === "All") {
    showData(allData);
    return;
  }
}
document.querySelectorAll(".types option").forEach((btn) => {
  btn.addEventListener("click", types);
});
function types(evt) {
  const type = allData.filter((product) => product.usagetype === evt.target.dataset.filter);
  showData(type);
  if (evt.target.dataset.filter === "All") {
    showData(allData);
    return;
  }
}
let showingDiscount = false;
document.querySelector(".sale").addEventListener("click", () => {
  showingDiscount = !showingDiscount;
  document.querySelector(".sale").classList.toggle("active");

  const products = showingDiscount ? allData.filter((product) => product.discount > 0) : allData;
  showData(products);
});
// document.querySelector(".sale").addEventListener("click", showDiscount);
// function showDiscount() {
//   const discount = allData.filter((product) => product.discount > 0);
//   showData(discount);
// }

const inStock = document.querySelector(".in-stock").addEventListener("click", () => {
  const showInStock = allData.filter((product) => product.soldout < 1);
  showData(showInStock);
});

//HENT DATA
function getData() {
  fetch(currentUrl).then((result) =>
    result.json().then((data) => {
      showData(data);
      allData = data;
    }),
  );
}
//SORTING---------------------------------------------------------------------------------------------------------------
const sortAlphabetical = document.querySelector(".alphabetical");
sortAlphabetical.addEventListener("click", () => {
  const sortedData = [...allData].sort((a, b) => a.productdisplayname.localeCompare(b.productdisplayname));
  showData(sortedData);
});
const sortLowHigh = document.querySelector(".low-high");
sortLowHigh.addEventListener("click", (event) => {
  const sortedData = [...allData].sort((a, b) => {
    const actualPriceA = a.discount ? calculateDiscount(a.price, a.discount) : a.price;
    const actualPriceB = b.discount ? calculateDiscount(b.price, b.discount) : b.price;
    return actualPriceA - actualPriceB;
  });
  showData(sortedData);
});
const sortHighLow = document.querySelector(".high-low");
sortHighLow.addEventListener("click", (event) => {
  const sortedData = [...allData].sort((a, b) => {
    const actualPriceA = a.discount ? calculateDiscount(a.price, a.discount) : a.price;
    const actualPriceB = b.discount ? calculateDiscount(b.price, b.discount) : b.price;
    return actualPriceB - actualPriceA;
  });
  showData(sortedData);
});
const noSort = document.querySelector(".default").addEventListener("click", () => {
  showData(allData);
  return;
});

//PRIS "LOMMEREGNER"----------------------------------------------------------------------------------------------------
//Udregning af ny pris, som vist i undervisningen;
const calculateDiscount = (price, discountPercent) => {
  return (price * (100 - discountPercent)) / 100;
};
//Indsættes som ${calculateDiscount(product.price, product.discount)} i det tag ens nye pris skal stå.

//VISNING AF DATA--------------------------------------------------------------------------------------------------------
function showData(products) {
  console.log(products);
  listContainer.innerHTML = "";
  let newInnerHTML = "";

  products.forEach((product) => {
    document.querySelector(".productheader").innerHTML = "Browse: <br>" + headertitle;

    newInnerHTML += `<a class="product ${product.soldout ? "soldout" : ""} ${product.discount ? "discount" : ""}" href="produkt.html?id=${product.id}">
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

//Notes to self;

//Discount kode
// let hasDiscount = "";
// if (product.discount) {
//   hasDiscount = "discount";
// }
// Hvis produktet har discount (mere end 0 i værdi), så giv variablen værdien discount, som kan sættes ind som class i produktcontaineren
//ELLER: ${product.discount ? "discount" : ""}
//
// ${functionNavn ?(Hvis den er sand/værdi mere end 0(truthy)) "hvad der skal ske" :(hvis den ikke er sand(falsy)) "(nothing)"}

//Sorting
//Hvis man sætter [...] rundt om ens arraynavn, sorterer man en kopi af det i stedet for at direkte påvirke rækkefølgen af det originale array.
