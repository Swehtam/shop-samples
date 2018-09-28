( function ( $ ) {
    "use strict";

    let shoppingList = [];
	
	$('.product button').on('click', addToCart);
	$('.cart button').on('click', checkout)

	function addToCart(){
		let $product = $(this).siblings()

		let name = $product.children('h3').text();
		let price = parseFloat($product.children('span').text().replace(/[^\d.]/g,''));
		let id = $product.children('input').val();

		if(productInCart(id)){ return; }
		
		let product = {
			name: name,
			price: price,
			count: 1,
			id: id,
		}

		shoppingList.push(product);
		appendProductCart(product);
	}

	function productInCart(id){
		for(let i = 0; i < shoppingList.length; i++){
			if(shoppingList[i].id == id){
				return true;
			}
		}
		return false;
	}

	function appendProductCart(product){
		let $label = $('<label>').text(product.name);

		let $hiddenInput = $('<input>').attr({
			type: 'hidden',
			value: product.id
		})

		let $inputNumber = $('<input>').attr({
				type: 'number',
				value: '1',
				min: '0'
			}).on('input', updatePrice);

		let $output = $('<output>').text('$' + product.price);

		$('.cart-list').append(
			$('<li></li>')
				.addClass('product-cart')
				.append($label)
				.append($hiddenInput)
				.append($inputNumber)
				.append($output)
		);

		updateTotal();
	}

	function updatePrice(){
		let count = $(this).val();
		let id = $(this).siblings('input[type="hidden"]').val();
		let price = 0;

		for(let i = 0; i < shoppingList.length; i++){
			if(shoppingList[i].id == id){
				price = shoppingList[i].price;
				shoppingList[i].count = count;
				break;
			}
		}

		$(this).siblings('output').text('$' + (price*count));

		updateTotal();
	}

	function updateTotal(){
		let total = 0;

		shoppingList.forEach((product) => {
			total += product.price * product.count
		})

		$('#value-cart').text('Total = $' + total);
	}

	function checkout(){
		$.post('/checkout', { shoppingList: shoppingList } );
	}

})(jQuery);

