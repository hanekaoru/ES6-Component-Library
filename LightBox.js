module.exports = {
	state: 0,
	mask: {
		show: function (fn) {
			$('<div class="lightBoxMask"></div>').css({
				'width': '100%',
				'height': '100%',
				'background': 'black',
				'position': 'fixed',
				'top': '0',
				'left': '0',
				'opacity': '0',
				'z-index': '9999'
			}).appendTo($('body')).animate({
				opacity: 0.3
			}, 0, function () {
				if (fn) fn();
			});
		}
	},
	imgsize: {
		width: 0,
		height: 0
	},
	imgload: function (url, suc, fail) {
		var img = new Image();
		var self = this;
		if (!!window.ActiveXObject) {
			img.onreadystatechange = function () {
				if (this.readyState == 'complete') {
					self.imgsize.width = this.width;
					self.imgsize.height = this.height;
					if (suc) suc();
				}
			}
		} else {
			img.onload = function () {
				if (this.complete) {
					self.imgsize.width = this.width;
					self.imgsize.height = this.height;
					if (suc) suc();
				}
			}
		}
		img.onerror = function () {
			if (fail) fail();
		}
		img.src = url;
	},
	type: 0,
	imgtitle: [],
	createContainor: function (imgWidth, imgHeight, src) {
		var self = this;
		var _mtop = -(91 + imgHeight) / 2;
		var _top = '50%';
		var pos = 'fixed'
		if (imgHeight + 91 >= $(window).height()) {
			_mtop = 0;
			_top = $(window).scrollTop();
			pos = 'absolute'
		}
		$('.lightBoxContainor').remove();
		$('<div class="lightBoxContainor"><div class="lightBoxPrev" style="opacity:0;filter:alpha(opacity:0);cursor:pointer;width:40px;height:40px;line-height:40px;color:#fff;font-size:32px;position:absolute;top:50%;margin-top:-20px;left:-28px;">〈</div><div class="lightBoxNext" style="cursor:pointer;opacity:0;filter:alpha(opacity:0);width:40px;height:40px;line-height:40px;font-size:32px;color:#fff;position:absolute;top:50%;margin-top:-20px;right:-40px;">〉</div><div class="lightBoxHead" style="position: relative;height:60px;border-bottom:1px solid #efefef;font-size:14px;line-height:16px;background:#fafafa;padding-left:20px;"><p style="color: #666;width:' + (imgWidth - 40) + 'px;position: relative;">' + self.imgtitle[self.x] + '</p><div class="lightBoxClose" style="position:absolute;width:20px;height:20px;line-height:19px;border:1px solid rgb(189, 189, 189);top:18px;right:20px;border-radius:50%;text-align:center;color:rgb(169, 159, 159);float:right;-webkit-transition:all .3s linear;-moz-transition:all .3s linear;-o-transition:all .3s linear;-ms-transition:all .3s linear;transition:all .3s linear;">×</div></div><img style="position:absolute;top:50%;left:50%;margin-top:-16px;margin-left:-16px;" class="lightBoxImgLoding" src="http://gtcdn1.gaitu.com/images/img.toolsup/loading.gif"></div>').css({
			'width': (imgWidth + 40) + 'px',
			'height': (91 + imgHeight) + 'px',
			'background': '#fff',
			'box-shadow': '0px 8px 10px #666',
			'position': pos,
			'top': _top,
			'margin-top': (_mtop) + 'px',
			'left': '50%',
			'margin-left': -((imgWidth + 40) / 2) + 'px',
			'z-index': 10000,
			'opacity': 0
		}).appendTo($('body')).animate({
			'opacity': 1
		}, 0, function () {

			if ($('.lightBoxHead p').height() >= 64) {
				$('.lightBoxHead p').css({
					'font-size': '12px',
					'line-height': '14px'
				});
			}
			$('.lightBoxHead p').css({
				'top': (30 - $('.lightBoxHead p').height() / 2) + 'px'
			});
			$('.lightBoxClose').hover(function () {
				$(this).css({
					'color': 'red',
					'cursor': 'pointer',
					'-webkit-transform': 'rotate(180deg)'
				});
			}, function () {
				$(this).css({
					'color': 'rgb(169, 159, 159)',
					'-webkit-transform': 'rotate(0)'
				});
			}).click(function () {
				self.close();
			});
			$('.lightBoxImgLoding').hide();
			$('<img class="lightBoxImg" width=' + imgWidth + ' height=' + imgHeight + ' src="' + src + '"/>').css({
				'margin-top': '15px',
				'margin-left': '20px',
				'opacity': 0
			}).appendTo($('.lightBoxContainor')).animate({
				opacity: 1
			}, function () {
				function s(fn) {
					self.imgload(self.urls[self.x], function () {
						var imgWidth = self.imgsize.width;
						var imgHeight = self.imgsize.height;
						if (imgWidth >= self.norWidth) {
							imgHeight = Math.round((self.norWidth / imgWidth) * imgHeight);
							imgWidth = self.norWidth;
						}
						var t0 = '50%';
						var it0 = -(imgHeight + 91) / 2;
						if (imgHeight + 91 >= $(window).height()) {
							it0 = 0;
							t0 = $(window).scrollTop();
						} else {

						}
						if (self.type == 1) {
							$('.lightBoxImg').css({
								'width': imgWidth + 'px',
								'height': imgHeight + 'px',
								'opacity': 0
							}).attr('src', self.urls[self.x]).hide();
							$('.lightBoxContainor').animate({
								width: (imgWidth + 40) + 'px',
								height: (imgHeight + 91) + 'px',
								top: t0,
								'margin-top': it0 - 40 + 'px',
								left: '50%',
								'margin-left': -(imgWidth + 40) / 2 + 'px'
							}, 450, function () {
								if (fn) fn();
								$(this).animate({
									'top': t0,
									'margin-top': it0 + 'px'
								}, 500);
								$('.lightBoxImg').show().animate({
									opacity: 1
								})
							});
						} else if (self.type == 2) {
							$('.lightBoxImg').hide().css({
								'width': imgWidth + 'px',
								'height': imgHeight + 'px',
								'opacity': 0
							}).attr('src', self.urls[self.x]).show().animate({
								opacity: 1
							}, 500);
							$('.lightBoxHead p').html(self.imgtitle[self.x]);
							if (fn) fn();
							$('.lightBoxContainor').css({
								width: (imgWidth + 40) + 'px',
								height: (imgHeight + 91) + 'px',
								top: t0,
								'margin-top': it0 + 'px',
								left: '50%',
								'margin-left': -(imgWidth + 40) / 2 + 'px'
							});
						}
					});
				}
				if (self.urls.length > 1) {
					$('.lightBoxPrev').animate({
						left: '-50px',
						'opacity': 1
					}).click(function () {
						self.x--;
						if (self.x < 0) {
							self.x = self.urls.length - 1;
						}
						s(function () {

						});
					});
				}
				if (self.urls.length > 1) {
					$('.lightBoxNext').animate({
						right: '-62px',
						'opacity': 1
					}).click(function () {
						self.x++;
						if (self.x >= self.urls.length) {
							self.x = 0;
						}
						s(function () { });
					});
				}
				self.state = 1;
			});
		});
	},
	x: 0,
	urls: [],
	norWidth: 0,
	showImgs: function (s) {
		var url = s.url;
		this.urls = s.url;
		this.type = s.type;
		this.imgtitle = s.imgtitle;
		var normalWidth = s.normalWidth || '800px';
		var onShow = s.onShow || function () { };
		var onError = s.onError || function () { };
		normalWidth = parseInt(normalWidth);
		this.norWidth = normalWidth;
		var self = this;
		self.imgload(url[0], function () {
			var imgWidth = self.imgsize.width;
			var imgHeight = self.imgsize.height;
			if (imgWidth >= normalWidth) {
				imgHeight = Math.round((normalWidth / imgWidth) * imgHeight);
				imgWidth = normalWidth;
			}
			self.mask.show(function () {
				$('.lightBoxMask').click(function () {
					self.close();
				});
			});
			self.createContainor(imgWidth, imgHeight, url[0]);
			onShow();
		}, onError);

	},
	close: function () {
		if (this.state == 1) {
			$('.lightBoxContainor,.lightBoxMask').remove();
			this.x = 0;
		} else {
			return false;
		}
	}
}
