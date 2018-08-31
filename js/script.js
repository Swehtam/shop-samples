( function ( $ ) {
    "use strict";
	
	var productList = [];
	var cartList = [];
	var product1 = {id: '12', name: "Maçã", value: 0.50, category: "1", img: "images/no-pic.jpg"};
	var product2 = {id: '56', name: "Banana", value: 50.00, category: "3", img: "images/no-pic.jpg"};
	var product3 = {id: '23', name: "Uva", value: 1.50, category: "2", img: "images/no-pic.jpg"};
	productList.push(product1);
	productList.push(product2);
	productList.push(product3);
	productList.push(product1);
	productList.push(product2);
	productList.push(product3);
	productList.push(product1);
	productList.push(product2);
	productList.push(product3);
	productList.push(product1);
	productList.push(product3);
	productList.push(product1);
	productList.push(product2);
	productList.push(product3);
	productList.push(product1);
	productList.push(product3);
	productList.push(product1);
	productList.push(product2);
	productList.push(product3);
	productList.push(product1);
	var sum = 0;
	
	$(function() {
		menuToggles();		
		addProduct();
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
	
	function addProduct(){
		loadProduts();
		$('#12 button').on("click", function(){			
			cartList.push(product1);
			appendProductCart(product1);
			sumProducts(product1.value);
		});
		$('#56 button').on("click", function(){			
			cartList.push(product2);
			appendProductCart(product2);
			sumProducts(product2.value);
		});
		$('#23 button').on("click", function(){
			cartList.push(product3);
			appendProductCart(product3);
			sumProducts(product1.value);
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
	function appendProductCart(product){
		$('.cart-list').append(
				'<li class="product-cart" id="pc'+ product.id +'">'+ product.name+' - $'+ product.value+'</li>'); 

	}
	function sumProducts(value){
		sum += value;
		document.getElementById('value-cart').innerHTML = "Total = $"+ sum;
	}
	
	function loadProduts(){
		var html = '';
		for (var i = 0; i < productList.length; i++){
			html = '<div class="product" id="' + productList[i].id + '">' + 
					'<a href="prod.html" title="' + productList[i].name + '">' +
						'<img src="' + productList[i].img + '">' +
						'<h3>' + productList[i].name + '</h3>' +
						'<span> R$' + productList[i].value + '</span>' +
					'</a><br>' +
					'<button> Add </button>' +
				'</div>';

			$('.products-list').append(html);
		}
		
		
	}

	
})(jQuery);
