
/*--------------------分隔線------------------------*/

const config = {
  headers:{
    Authorization:"JZrWxOJ9QrMv7bwenU4Xp94h4M12"
  }
}
const url = "https://hexschoollivejs.herokuapp.com/api/livejs/v1/admin/zengzeng/orders";

const productList = document.querySelector('.productWrap'); //商品列表
const productSelect = document.querySelector('.productSelect'); //商品類別選擇

//組商品字串
let productData = [];
let str =`<li class="productCard">
<h4 class="productType">新品</h4>
<img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/dp6gW6u5hkUxxCuNi8RjbfgufygamNzdVHWb15lHZTxqZQs0gdDunQBS7F6M3MdegcQmKfLLoxHGgV3kYunUF37DNn6coPH6NqzZwRfhbsmEblpJQLqXLg4yCqUwP3IE.png" alt="">
<a href="#" id="addCardBtn">加入購物車</a>
<h3>Antony 雙人床架／雙人加大</h3>
<del class="originPrice">NT$18,000</del>
<p class="nowPrice">NT$12,000</p>
</li>`

productList.innerHTML = str;

function init() {
  getProductList();
}
init();
//GET取得訂單資料
function getProductList() {
  axios.get(`https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer/${api_path}/products`,config)   
  .then(function (response) {
    productData = response.data.products;
    renderProcuctlist();

  }).catch(function (error) {
    console.log(error);
  })
  }

function combinationProductHTMLItem(item){   //消除重複組字串行為，用函式包裝 //ID只能使用一次XD
  return `<li class="productCard">
  <h4 class="productType">新品</h4>
  <img
    src="${item.images}"
    alt="">
    <a href="#" class="js-addCart" id="addCardBtn" data-id="${item.id}">加入購物車</a>  
    <h3>${item.title}</h3>
  <del class="originPrice">NT$${item.origin_price}</del>
  <p class="nowPrice">NT$${item.price}</p>
</li>`
}

function renderProcuctlist(){
  let str = "";
    productData.forEach(function(item){
      str += combinationProductHTMLItem(item);
    })
    productList.innerHTML = str;
}
productSelect.addEventListener('change',function(e){  //類別選擇欄位監聽
  const category = e.target.value; //取商品類別選擇欄位的值
  if (category == "全部") {
    renderProcuctlist();
    return;
  }
  let str = "";
  productData.forEach(function(item){
    if (item.category == category) {
      str += combinationProductHTMLItem(item);
    }
  })
  productList.innerHTML = str;
})

productList.addEventListener('click',function(e){   //加入購物車監聽  //為什麼不針對按鈕綁監聽？因為每顆都綁的話會降低效能，所以綁在外層
  e.preventDefault(); //消除預設行為
  let addCartClass = e.target.getAttribute("class");
  if (addCartClass!=="js-addCart") {
    return;
  }
  let productId = e.target.getAttribute("data-id");
  console.log(productId);

})

