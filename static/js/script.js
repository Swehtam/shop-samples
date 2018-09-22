// Global variables
var productList = [];
var cartList = [];
var sumCart=0;

( function ( $ ) {
    "use strict";
		
	$(function() {
		menuToggles();		
		chooseCategory();
	});
	
	function fadeToggles(e){

		$(e.data.child).fadeToggle();
		
	}
	function menuToggles(){
		$('#p1').on("click", {child: '#c1'}, fadeToggles);
		$('#p2').on("click", {child: '#c2'}, fadeToggles);
		$('#p3').on("click", {child: '#c3'}, fadeToggles);
		$('#p4').on("click", {child: '#c4'}, fadeToggles);
		
		
	}	
	function chooseCategory(){
		
		$('#c1 li').on("click", function(){
			$('.nav-menu').empty().append(
				'<h1><a href="index.html"> Home </a><i class="fas fa-chevron-right"></i><a href="#"> Category 1 </a> </h1>'); 			
		});
		$('#c2 li').on("click", function(){
			$('.nav-menu').empty().append(
				'<h1><a href="index.html"> Home </a><i class="fas fa-chevron-right"></i><a href="#"> Category 2 </a> </h1>'); 			
		});
		$('#c3 li').on("click", function(){
			$('.nav-menu').empty().append(
				'<h1><a href="index.html"> Home </a><i class="fas fa-chevron-right"></i><a href="#"> Category 3 </a> </h1>'); 			
		});
		$('#c4 li').on("click", function(){
			$('.nav-menu').empty().append(
				'<h1><a href="index.html"> Home </a><i class="fas fa-chevron-right"></i><a href="#"> Category 4 </a> </h1>'); 			
		});
			
	}
	
/*
	function removeProductCart(){
		loadProduts();
		$('#pc1 i').on("click", function(){			
			removeProduct(product1);
		});
		
	}
	function removeProduct(product){
		$('#'+product.id).empty();
		for(var i=0; i<cartList.length; i++){
			if(cartList[i].id == product.id){
				cartList.splice(i, 1);
			}
		}
		for(var i=0; i<cartList.length; i++){
			console.log(cartList[i].name);
		}
	}
*/
	
	
})(jQuery);

function addCart(id){
	var myProduct = productList[id-1];
	cartList.push(myProduct);
	appendProductCart(myProduct);
	sumProducts(myProduct.precounitario);
	
}
function appendProductCart(product){
	$('.cart-list').append(
			'<li class="product-cart" id="pc'+ product.produtoID +'">'+ product.nomeproduto+' - $'+ product.precounitario+'</li>'); 

}
function sumProducts(value){
	sumCart += parseInt(value);
	document.getElementById('value-cart').innerHTML = "Total = $"+ sumCart;
}
function productPage(value){
		
		//ID
		var myID = parseInt(value.charAt(value.length-1));
		//Product
		var myProduct = productList[myID-1];
		console.log(myProduct);
		
}
function productPage(value){
	//ID
	var myID = parseInt(value.charAt(value.length-1));
	//Product
	var myProduct = productList[myID-1];
	var stringProduct = JSON.stringify(myProduct);
	var stringCart = JSON.stringify(cartList);
	
	sessionStorage.setItem("product", stringProduct);
	sessionStorage.setItem("cartValue", sumCart);
	sessionStorage.setItem("cartList", stringCart);
	window.open('product.html');
}