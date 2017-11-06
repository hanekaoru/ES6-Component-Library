var drg = {
	getObj: function (id) {
		return document.getElementById(id);
	},
	inArray: function (v, arr) {
		if (typeof (arr) === 'object' && arr.length) {
			var c = 0;
			this.forEach(arr, function (i, itm) {
				if (itm === v) {
					c++;
					return i;
				}
			});
			if (!c) {
				return -1;
			}
		}
	},
	addClass0: function (o, clas) {
		var self = this;

		function pushClas(im, cls) {
			if (im.className && im.className != '') {
				var clasArr = im.className.split(/\s+/i);
				drg.forEach(clasArr, function (i, m) {
					if (drg.inArray(cls, clasArr) == -1) {
						clasArr.push(cls)
						im.className = clasArr.join(' ');
					}
				});
			} else {
				im.className = cls;
			}
		}
		if (typeof (o) === 'object') {
			if (o && o.length) {
				this.forEach(o, function (index, item) {
					pushClas(item, clas);
				});
			} else {
				pushClas(o, clas);
			}
		}
		return this;
	},
	removeArrItem: function (v, arr) { //去重/
		var i = arr.length;
		if (i) {
			while (i) {
				this.forEach(arr, function (i, itm) {
					if (v === itm) {
						arr.splice(i, 1);
					}
				});
				i--;
			}
		}
	},
	removeClass: function (o, clas) {
		var self = this;

		function removeItem(item, clas) {
			if (item.className && item.className != '') {
				var clasArr = item.className.split(/\s+/i);
				drg.removeArrItem(clas, clasArr);
				item.className = clasArr.join(' ');
			}
		}
		if (typeof (o) === 'object') {
			if (o && o.length) {
				this.forEach(o, function (index, item) {
					removeItem(item, clas)
				});
			} else {
				removeItem(o, clas)
			}
		}
		return this;
	},
	noselect: function (o) {
		this.addClass0(o, 'noselect');
		o.onselectstart = function () {
			return false;
		}
	},
	selectable: function (o) {
		this.removeClass(o, 'noselect');
		o.onselectstart = null;
	},
	forEach: function (obj, fn) {
		for (var i in obj) {
			var x = i;
			var y = obj[i];
			fn(x, y);
		}
	},
	getClientWidth: function () {
		return (document.documentElement.clientWidth || document.body.clientWidth);
	},
	getClientHeight: function () {
		return (document.documentElement.clientHeight || document.body.clientHeight);
	},
	getScrollTop: function () {
		return (document.documentElement.scrollTop || document.body.scrollTop);
	},
	movingLeft: 0,
	movingTop: 0,
	setMovingLeft: function (l) {
		this.movingLeft = l;
		return this;
	},
	setMovingTop: function (t) {
		this.movingTop = t;
		return this;
	},
	getMovingLeft: function () {
		return this.movingLeft;
	},
	getMovingTop: function () {
		return this.movingTop;
	},
	dragable: function (d) {
		var _this = this,
			moveBar = d.moveBar,
			moveBox = d.moveBox || moveBar,
			onMoveStart = d.onMoveStart,
			onMoving = d.onMoving,
			onMoved = d.onMoved;
		//moveBar.style.cursor='move';
		$('body')
			.on('mousedown', '.grayd', function (e) {
				var $t = $(this);
				onMoveStart && onMoveStart($(this));
				var e = e || window.event,
					scroTop = _this.getScrollTop(),
					x0 = e.clientX - moveBox.offsetLeft,
					y0 = e.clientY - moveBox.offsetTop;

				// if (moveBox.setCapture) {
				// 	moveBox.setCapture();
				// }
				document.onmousemove = function (e) {
					// var el=document.getElementsByTagName('*');
					// _this.forEach(el,function(index,item){
					//     _this.noselect(item);
					// });
					var e = e || window.event,
						scroTop = _this.getScrollTop(),
						x1 = e.clientX - x0,
						y1 = e.clientY - y0;
					if (x1 == 0) {

					}
					_this.movingLeft = x1;
					_this.movingTop = y1;
					if (onMoving) {
						onMoving();
					}
					moveBox.style.left = _this.movingLeft + 'px';
					moveBox.style.top = _this.movingTop + 'px';
					return false;
				}
				document.onmouseup = function () {
					// var el=document.getElementsByTagName('*');
					// _this.forEach(el,function(index,item){
					//     _this.selectable(item);
					// });
					if (onMoved) {
						onMoved(moveBox, $t);
					}
					// if (moveBar.releaseCapture) {
					// 	moveBar.releaseCapture();
					// }
					document.onmousemove = null;
					document.onmouseup = null;
				}
				return false;
			});
		// moveBar.onmousedown = function(e) {

		// }
	}
}
