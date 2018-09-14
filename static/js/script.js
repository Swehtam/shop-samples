( function ( $ ) {
	"use strict";
	
	menuToggles();

	function fadeToggles(e){
		$(e.data.child).fadeToggle();
	}

	function menuToggles(){
		$('#p1').on("click", {child: '#c1'}, fadeToggles);
		$('#p2').on("click", {child: '#c2'}, fadeToggles);
		$('#p3').on("click", {child: '#c3'}, fadeToggles);
		$('#p4').on("click", {child: '#c4'}, fadeToggles);
	}
	
})(jQuery);