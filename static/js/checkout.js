(function($) {
	let $productstable = $('#products-table');
	let $checkoutform = $('#form-confirm');
	var shoppingList = JSON.parse(sessionStorage.shoppingCart);
	let totalValue = 0;

	shoppingList.forEach(product => {
		let $line = $('<tr></tr>');

		$line.append($('<th></th>').append(
			$('<img>')
			.attr('src', '/images/products/'+product.img)
			.addClass('product-img')
		));
		$line.append($('<th></th>')
			.text(product.name));
		$line.append($('<th></th>')
			.text('$'+product.price));
		$line.append($('<th></th>')
			.text(product.quantity));
		$line.append($('<th></th>')
			.text('$' + (product.quantity*product.price).toFixed(2)));

		$checkoutform.append($('<input>').attr({
			type: 'hidden',
			value: product.id,
			name: 'id'
		}));
		$checkoutform.append($('<input>').attr({
			type: 'hidden',
			value: product.quantity,
			name: 'quantity'
		}))

		totalValue += product.quantity*product.price
		$productstable.append($line);
	});

	let $totalline = $('<tr></tr>')
	.append($('<th></th>'))
	.append($('<th></th>'))
	.append($('<th></th>'))
	.append($('<th></th>').text('Total:'))
	.append($('<th></th>').text('$'+totalValue.toFixed(2)));
	$productstable.append($totalline);

	$('#confirm-button').on('click', function(){
		$('.content-wrapper').empty();
		$('.content-wrapper').append(
			$('<h2></h2>')
				.text('Purchase successfully made!')
				.addClass('alert-sucess')
		);

		setTimeout(function(){
			sessionStorage.shoppingCart = JSON.stringify([]);
			$checkoutform.submit();		
		}, 1000);
	})

})(jQuery);