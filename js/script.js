( function ( $ ) {
    "use strict";
	
	var productList = [];
	var cartList = [];
	var product1 = {id: 12, name: "maçã", value: 0.50, category: "1", img: "images/a.jpg"};
	var product2 = {id: 56, name: "banana", value: 50, category: "3", img: "images/logoblack.png"};
	var product3 = {id: 23, name: "uva", value: 1.5, category: "2", img: "images/a.jpg"};
	productList.push(product1);
	productList.push(product2);
	productList.push(product3);
	var sum = 0;
	
	$(function() {
		menuToggles();
		addProduct();
		loadProduts();
		
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
	
	function addProduct(){
		$('#12 button').on("click", function(){
			console.log("entrou");
			cartList.push(product1);
			sumProducts(product1.value);
		});	
		
	}
	
	function sumProducts(value){
		sum += value;
		document.getElementById('value').innerHTML = sum + "R$";
	}
	
	function loadProduts(){
		var html = '';
		for (var i = 0; i < productList.length; i++){
			html += '<div class="product" id="' + productList[i].id + '">' + 
					'<a href="prod.html" title="' + productList[i].name + '">' +
						'<img src="' + productList[i].img + '">' +
						'<h3>' + productList[i].name + '</h3>' +
						'<span> R$' + productList[i].value + '</span>' +
					'</a>' +
					'<button> Comprar </button>' +
				'</div>';
		}
		
		document.getElementById('products-list').innerHTML = html;
	}

	
})(jQuery);
