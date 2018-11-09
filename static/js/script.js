(function($) {
    "use strict";
    let $cart = $('.cart');

	$('.add-button').on('click', async function(){
		let id = $(this).attr('data-product-id');

		let table = await $.ajax({
			method: 'GET',
			url: 'cart/add/' + id
		})

		$cart.empty();
		$cart.html(table);
	});

	$(document).on('click', '.remove-button', async function(){
		let id = $(this).attr('data-product-id');

		let table = await $.ajax({
			method: 'GET',
			url: 'cart/remove/' + id
		});

		$cart.empty();
		$cart.html(table);
	});

})(jQuery);

