(function($) {
    "use strict";

    if(!localStorage.getItem('shoppingCart')){
		localStorage.shoppingCart = JSON.stringify([]);
	}
	
	var shoppingList = JSON.parse(localStorage.shoppingCart);
	updateCart();

	$('.add-button').on('click', addToCart);
	$('.checkout-button').on('click', checkout)

	function addToCart(){
		let id = $(this).attr('data-product-id');

		if(!productInCart(id)) {
			$.ajax({
				method: 'GET',
				url: '/retrieve/' + id
			})
			.done(prod => {
				let product = {
					name: prod.name,
					price: prod.price,
					quantity: 1,
					id: id
				}

				shoppingList.push(product);
			});
		}

		localStorage.shoppingCart = JSON.stringify(shoppingList);
		updateCart();
	}

	function productInCart(id){
		for(let i = 0; i < shoppingList.length; i++){
			if(shoppingList[i].id == id){
				shoppingList[i].quantity++;
				return true;
			}
		}
		return false;
	}

	function updateCart(){
		let $cart = $('.cart-list');
		$cart.empty();

		shoppingList.forEach(product => {
			let $label = $('<label>').text(product.name);

			let $hiddenInput = $('<input>').attr({
				type: 'hidden',
				value: product.id
			})

			let $inputNumber = $('<input>').attr({
				type: 'number',
				value: product.quantity,
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

		});

		updateTotal();
	}

	function updatePrice(){
		let quantity = $(this).val();
		let id = $(this).siblings('input[type="hidden"]').val();
		let price = 0;

		for(let i = 0; i < shoppingList.length; i++){
			if(shoppingList[i].id == id){
				price = shoppingList[i].price;
				shoppingList[i].quantity = quantity;
				break;
			}
		}

		localStorage.shoppingCart = JSON.stringify(shoppingList);
		$(this).siblings('output').text('$' + (price*quantity));

		updateTotal();
	}

	function updateTotal(){
		let total = 0;

		shoppingList.forEach(product => {
			total += product.price * product.quantity
		})

		$('#value-cart').text('Total = $' + total);
	}

	function checkout(){
		$.post('/checkout', { shoppingList: shoppingList } );
	}

})(jQuery);

