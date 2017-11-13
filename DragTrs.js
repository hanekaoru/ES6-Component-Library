var dragTrs = function () {
	var targetTags = function (tar) {
		var norTags = function (tag) {
			var getTag = function (t) {
				return $(t)[0].tagName.toLowerCase();
			}
			return getTag(tag) == 'div';
		}
		return {
			table: norTags(tar) ? '.table' : 'table',
			tr: norTags(tar) ? '.tr' : 'tr',
			th: norTags(tar) ? '.th' : 'th',
			td: norTags(tar) ? '.td' : 'td'
		}
	}
	var tarPosRange = function (target) {
		var tar = targetTags(target),
			thH = $(target + ' ' + tar.tr).first().outerHeight(),
			trH = $(target + ' ' + tar.tr).eq(1).outerHeight();
		return {
			offset: $(target).offset(),
			head: thH,
			colum: trH
		}
	}
	var getStart = function (target, fn) {
		var tar = targetTags(target);
		$('body')
			.on('mousedown', target + ' ' + tar.tr, function (e) {
				if ($(this).find(tar.th).length) return false;
				if (!$(e.target).hasClass('inptedit') && !$(e.target).hasClass('check') && !$(e.target).hasClass('hackedit')) {
					var offset = $(this).offset(),
						moveStyle = {
							position: 'absolute',
							top: (offset.top - $(this).parents('table').offset().top) + 'px',
							left: 0,
							right: 0,
							background: '#fafafa',
							zIndex: 222222
						},
						moveTr = $(this).clone(true)
							.css(moveStyle)
							.addClass('movingTr')
							.find('.tdcont')
							.css({ 'height': 'initial' })
							.end()
							.find('td')
							.css({ 'background': '#eee', 'border-top': '1px solid #4d90fe', 'border-bottom': '1px solid #4d90fe' })
							.end()
							.find('td:first').css({ 'border-left': '1px solid #4d90fe' })
							.end()
							.find('td:last').css({ 'border-right': '1px solid #4d90fe' })
							.end(),
						pos = { x: e.clientX, y: e.clientY },
						$this = $(this),
						m = true, cpost = false;

					$(document).mousemove(function (e) {
						m = false;
						e.preventDefault();

						var iPos = { x: e.clientX, y: e.clientY };
						if (Math.abs(iPos.y - pos.y) >= 5) {
							cpost = true;
							$('.box table').css('position', 'relative').find('.movingTr').remove().end().append(moveTr);
							moveTr.css({
								top: (offset.top - $this.parents('table').offset().top + iPos.y * 1 - pos.y)
							});
						}

					});
					$(document).mouseup(function () {

						$(document).unbind('mousemove');
						$(document).unbind('mouseup');
						if (m || !cpost) return false;
						var _top = parseInt(moveTr.css('top')), tarSz = tarPosRange(target), newtr = $this.clone(true);
						if (_top <= tarSz.colum) {
							$(target).find(tar.tr).eq(1).before(newtr);  // first
						} else if (_top >= $(target).outerHeight() - tarSz.colum) {  
							$(target).append(newtr);  // last
						} else if (_top > tarSz.colum && _top < $(target).outerHeight() - tarSz.colum) {  // center
							var __top = _top - tarSz.head, ins = Math.ceil(__top / tarSz.colum);
							$(target).find(tar.tr).eq(ins).after(newtr);
						} else {
							$this.after(newtr);
						}
						$this.remove();
						$('.movingTr').remove();
						$(target + ' td[data-ins="0"]').each(function (index, el) {
							$(this).find('.tdcont').html(index + 1);
						});
						fn && fn();
					});
				}
			});
	}
	return {
		inspect: getStart
	}
}();

module.exports = dragTrs;



