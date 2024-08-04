const url = "https://fakestoreapi.com/";
var list = document.getElementById("list");
var modal = document.querySelector(".modal");
var wrapper = document.querySelector(".wrapper");
var body = document.body;

addEventListener("DOMContentLoaded", getProducts());
async function getProducts() {
    let request = await fetch(url + "products");
    if (request.ok) {
        let response = await request.json();
        let text = "";
        for (let i = 0; i < response.length; i++) {
            text = text + ` <div onclick="getByProductId(${response[i].id})" class="product" >
            <div class="productImage">
                <img src="${response[i].image}">
            </div>
            <div class="productInfo">
                <p>${response[i].price} $</p>
                <h4>${response[i].title}</h4>
            </div>  </div>
`
        }
        list.innerHTML = text;
    }
}



async function getByProductId(id) {
    let request = await fetch(url + "products/" + id);
    if (request.ok) {
        let response = await request.json();
        let text = ` <div class="categoryAndCloseBox">
            <span>ecoommerce.com > ${response.category}</span>
            <button onclick="modalClose()">X</button>
        </div>
        <div class="imgBox">
            <img src="${response.image}">
        </div>
        <div class="productInformation">
            <h4>${response.title}</h4>
            <div class="star">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>     <h5>${response.rating.rate}/5</h5>
                  <span> ${response.rating.count} değerlendirme</span>
            </div>
            <p id="description">${response.description}</p>
            <div class="priceAndAddtoCart">
                <p>${response.price}$</p>
                <button>Sepete Ekle</button>
            </div>
        </div>`;
        modal.innerHTML = text;
        body.style.overflowY = "hidden";
        modal.classList.add("active");
        wrapper.classList.add("active");

    }
}


function modalClose() {
    body.style.overflowY = "auto";
    modal.classList.remove("active");
    wrapper.classList.remove("active");
}