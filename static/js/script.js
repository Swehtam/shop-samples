(function($) {
    "use strict";

    if(!sessionStorage.getItem('shoppingCart')){
		sessionStorage.shoppingCart = JSON.stringify([]);
	}
	
	var shoppingList = JSON.parse(sessionStorage.shoppingCart);
	updateCart();

	$('.add-button').on('click', addToCart);

	async function addToCart(){
		let id = $(this).attr('data-product-id');

		if(!productInCart(id)) {
			let prod = await $.ajax({
				method: 'GET',
				url: '/retrieve/' + id
			})
			
			let product = {
				name: prod.name,
				price: prod.price,
				img: prod.img,
				quantity: 1,
				id: id
			}

			shoppingList.push(product);
		}

		sessionStorage.shoppingCart = JSON.stringify(shoppingList);
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
			let $line = $('<tr></tr>').addClass('product-cart');
			$line.append($('<td></td>').text(product.name));

			let $hiddenInput = $('<input>').attr({
				type: 'hidden',
				value: product.id
			})

			let $inputNumber = $('<input>').attr({
				type: 'number',
				value: product.quantity,
				min: '0'
			}).on('input', updatePrice);

			$line.append($('<td></td>')
				.append($hiddenInput)
				.append($inputNumber)
			);

			$line.append($('<td></td>')
				.addClass('output')
				.text('$' + (product.price*product.quantity).toFixed(2))
			);

			let $output = $('<output>').text();

			$('.cart-list').append($line);
		});

		updateTotal();
	}

	function updatePrice(){
		let quantity = $(this).val();
		let id = $(this).siblings('input[type="hidden"]').val();
		let product;

		for(let i = 0; i < shoppingList.length; i++){
			if(shoppingList[i].id == id){
				product = shoppingList[i];
				shoppingList[i].quantity = quantity;
				break;
			}
		}

		$(this)
			.parent()
			.siblings('.output')
			.text('$' + (product.price*product.quantity).toFixed(2))

		sessionStorage.shoppingCart = JSON.stringify(shoppingList);
		updateTotal();
	}

	function updateTotal(){
		let total = 0;

		shoppingList.forEach(product => {
			total += product.price * product.quantity
		})

		$('#value-cart').text('Total = $' + total.toFixed(2));
	}
	
})(jQuery);

