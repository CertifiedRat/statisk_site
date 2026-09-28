const params = new URLSearchParams(window.location.search);
const selectedID = params.get("id");
console.log("selectedID", selectedID);

const detailURL = `https://kea-alt-del.dk/t7/api/products/${selectedID}`;
const productContainer = document.querySelector(".product-container");
const productInfo = document.querySelector(".product-info");
const productImgs = document.querySelector(".product-imgs");
console.log("detailURL", detailURL);

function loadData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showDetails(data);
    });
  });
}

function showDetails(detail) {
  if (detail.discount) {
    productInfo.classList.add("discount");
    productImgs.classList.add("discount");
    document.querySelector(".discount-tag").innerHTML = detail.discount + " %";
  }
  if (detail.soldout) {
    productImgs.classList.add("soldout");
    document.querySelector(".soldout-tag").innerHTML = "Sold Out";
  }
  const calculateDiscount = (price, discountPercent) => {
    return (price * (100 - discountPercent)) / 100;
  };
  document.querySelectorAll(".img-product img").forEach((img) => {
    img.src = `https://kea-alt-del.dk/t7/images/webp/640/${detail.id}.webp`;
  });

  document.querySelector(".titlename").innerHTML = detail.productdisplayname;
  document.querySelector(".brand-type").innerHTML = detail.brandname + " - " + detail.articletype;
  document.querySelector(".color").innerHTML = "<strong>Color: </strong>" + detail.basecolour;
  document.querySelector(".short-description").innerHTML = detail.styledesc;
  document.querySelector(".description").innerHTML = detail.description;
  document.querySelector(".price").innerHTML = detail.price + " kr";
  document.querySelector(".new-price").innerHTML = detail.discount ? calculateDiscount(detail.price, detail.discount) + " kr" : "";
}

loadData(detailURL);
