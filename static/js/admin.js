(function($) {
	let $selectproduct = $('#select-products');

	let $selectcategory = $('#select-categories');

	$selectproduct.on('change', function() {
		let $divs = $selectproduct.siblings('div')
		$divs.addClass('d-none');
		
		let index = $selectproduct.prop('selectedIndex');
		$divs.eq(index).removeClass('d-none');
	})


	$selectcategory.on('change', function() {
		let $divs = $selectcategory.siblings('div')
		$divs.addClass('d-none');
		
		let index = $selectcategory.prop('selectedIndex');
		$divs.eq(index).removeClass('d-none');
	})

})(jQuery);
