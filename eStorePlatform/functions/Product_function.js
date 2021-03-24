var pName = document.getElementById("pName");
var pPrice = document.getElementById("pPrice");
var pQuantity = document.getElementById("pQuantity");
var pDesc = document.getElementById("desc");
var pImg = document.getElementById("img");
const sub = document.getElementById("submit");


sub.addEventListener("submit" , (e) =>{
  if(pPrice.value <=0 || pQuantity.value <=0){
    alert("negative value not accepted");
  e.preventDefault();
  }
 else
 var product = new Object();
 product.name = pName;
 
})
//var products = new Array();
function AddProduct(){
  document.getElementById("addBox").style.visibility = "visible";

}


function cancel(){
  document.getElementById("addBox").style.visibility = "hidden";
}

