$(function() {
	load();		
});
function load(){
	//Meu produto
	var myProduct = JSON.parse(sessionStorage.getItem("product"));
	//Valor do carrinho
	var sumCart = 0;
	//Lista carrinho
	var cartList = JSON.parse(sessionStorage.getItem("cartList"));	
	
	var html='';
	var nav='';
	var list ='';
	// Carrega produto
	html = '<img src="'+ myProduct.img +'">'+
				'<h1>'+ myProduct.nomeproduto +'</h1><br><br><br>'+									
				'Lorem ipsum metus morbi amet sed elit ligula taciti nunc praesent, sapien posuere turpis curae et erat pretium congue. dolor ultrices tempus felis ad molestie nam, sagittis dui a facilisis tellus. nam sit volutpat feugiat id vitae hac a vulputate, mauris porta hendrerit eu laoreet scelerisque aenean, nostra senectus potenti odio massa ullamcorper vulputate. hac iaculis scelerisque tristique nec senectus in urna, ut neque ultrices a convallis phasellus placerat, interdum fusce fringilla aenean habitant convallis. vulputate elit id neque nunc condimentum fusce, vitae faucibus quisque molestie dui, arcu nostra torquent volutpat risus.'+
				'<br><span> R$'+ myProduct.precounitario +'</span><br>'+
				'<button id="'+ myProduct.produtoID +'" onclick="addCart(this.id)">ADD</button>';
	$('.product-content').append(html);
	//Carrega nav-menu
	nav = '<h1><a href="index.html"> Home </a><i class="fas fa-chevron-right"></i><a href="#"> Category'+ myProduct.categoria +'</a><i class="fas fa-chevron-right"></i><a href="#">'+ myProduct.nomeproduto +'</a> </h1>';

	$('.nav-menu').empty().append(nav);
	//Carrega cartList
	for (var i=0; i < cartList.length; i++){
		$('.cart-list').append(
			'<li class="product-cart" id="pc'+ cartList[i].produtoID +'">'+ cartList[i].nomeproduto+' - $'+ cartList[i].precounitario+'</li>');
	}
	//Carrega Soma
	for (var i=0; i < cartList.length; i++){
		sumCart += parseInt(cartList[i].precounitario);
	}	
	document.getElementById('value-cart').innerHTML = "Total = $"+ sumCart;	

	
}
