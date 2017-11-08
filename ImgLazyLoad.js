var ImgLazyLoad = (function (win) {

	var imgInsight = function (img) {
		var _offset = img.offset().top - $(win).scrollTop();
		return _offset + 10 <
			$(win).height() &&
			_offset + img.innerHeight() > 0
	},

	show = function (img) {
		if (imgInsight(img)) {
			img
				.attr('data-load', 1)
				.attr('src', img.attr('data-src'))
				.removeAttr('data-src')
				.animate({
					opacity: 1
				}, 600);
		}
	},

	init = function () {
		$('img').each(function () {
			if ($(this).attr('data-src')) {
				$(this).attr('data-load', '0').css({ 'background': '#eee', 'opacity': 0 });
			}
			show($(this));
		});
		$(win).scroll(function () {
			$('img[data-load="0"]').each(function () {
				show($(this));
			});
		});
	}

	return { start: init }

})(window);

module.exports = ImgLazyLoad;
