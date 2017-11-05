var Utils = function () {
	var ie = function (ua) {
		var iebool = /msie/ig.test(ua);
		return {
			is: function () {
				return iebool;
			},
			v: iebool ? ua.match(/msie (\d+)/)[1] : undefined,
			ie11: /\srv:\d+\.\d+\)\slike\sgecko$/i.test(ua)
		}
	}(navigator.userAgent.toLowerCase());
	var Browser = {
		isIE: ie.is(),
		IEVersion: ie.v,
		isIE11: ie.ie11
	}
	var loc = window.location;
	var search = loc.search.substr(1);
	var searchArr = search.indexOf('&') != -1 ? search.split('&') : [search];


	function getURLData(k) {
		var param = {};
		for (var i = 0; i < k.length; i++) {
			if (k[i] != "") {
				var v = k[i].split('=');
				for (var j = 0; j < v.length; j++) {
					var key = decodeURIComponent(v[0]);
					var value = decodeURIComponent(v[1] || '');
					param[key] = value;
				}
			}
		}
		return param;
	}


	var url = {
		query: getURLData(searchArr),
		setParam: function (name, value) {
			// return search
			var param = getURLData(searchArr);
			param[name] = value;
			var parArr = [];
			for (var i in param) {
				parArr.push(i + '=' + param[i]);
			}
			//location.href=location.pathname+"?"+parArr.join('&');
			return parArr.join('&');
		},
		param: function (par) {
			return getURLData(searchArr)[par];
		},
		search: function (s, f) {
			var ur = s.url;
			var data = s.data || {};
			var href = '';
			if (ur) {
				if (ur.indexOf('?') != -1) {
					href = ur;
				} else {
					href = ur + '?'
				}
			}
			var datas = [];
			for (var name in data) {
				if (name) {
					datas.push(name + '=' + data[name]);
				}
			}
			if (href != '') {
				href = href.charAt(href.indexOf('?') + 1) == "" ? href : href + '&';
				var _h = href + datas.join('&');
				if (f) return _h;
				location.href = _h;
				if (window.top != window.self) window.parent.location.hash = _h;
			} else {
				var _h = loc.pathname + '?' + datas.join('&');
				if (f) return _h;
				location.href = _h;
				if (window.top != window.self) window.parent.location.hash = _h;
			}
		}
	}


	function filterInput(a) {
		var type = a[0].tagName.toLowerCase();
		var getVal = function (t) {
			return t == 'input' ? a.val() : a.html();
		}
		if (getVal(type).indexOf('\\') != -1 ||
			getVal(type).indexOf('/') != -1 ||
			getVal(type).indexOf(':') != -1 ||
			getVal(type).indexOf('*') != -1 ||
			getVal(type).indexOf('?') != -1 ||
			getVal(type).indexOf('"') != -1 ||
			getVal(type).indexOf('<') != -1 ||
			getVal(type).indexOf('>') != -1 ||
			getVal(type).indexOf('|') != -1) {
			var v = getVal(type).replace(/<[^>]*>/ig, '').replace(/[\\\/:*?"<>|]/ig, '')//.replace(/&nbsp;/g,'');
			type == 'input' ? a.val(v) :
				a.html(v);
			//单独一个定时器处理
		}
	}


	var getRandomStr = function (sp) {
		var x16 = function () {
			return Math.floor(Math.random() * 100000).toString(16);
		}
		return x16() + (sp || '.') + x16() + (sp || '.') + x16();
	}


	function remove_(o) {
		var pattern = ['\\', '/', ':', '*', '?', '"', '<', '>', '|', '‘', '“', '\'', '”', '’'];
		var manval = o.val(),
			_manval = [];
		if ($.trim(manval) != "") {
			if (manval.indexOf('\\') != -1 ||
				manval.indexOf('/') != -1 ||
				manval.indexOf(':') != -1 ||
				manval.indexOf('*') != -1 ||
				manval.indexOf('?') != -1 ||
				manval.indexOf('"') != -1 ||
				manval.indexOf('<') != -1 ||
				manval.indexOf('>') != -1 ||
				manval.indexOf('|') != -1) {
				for (var i = 0; i < manval.length; i++) {
					if ($.inArray(manval.charAt(i), pattern) == -1) {
						_manval.push(manval.charAt(i));
					}
				}
				o.val(_manval.join(''));
			}

		}
	}


	var f0 = function (f) {
		return f.length < 2 ? '0' + f : f;
	}

	function isRepeat(arr) {
		var hash = {};
		for (var i in arr) {
			if (hash[arr[i]])
				return true;
			hash[arr[i]] = true;
		}
		return false;
	}


	function getRepeatIndex(arr) {
		var hash = {};
		for (var i in arr) {
			if (hash[arr[i]])
				return i;
			hash[arr[i]] = true;
		}
		return false;
	}


	var appendArr = function (arr, ins, arr1) { return arr.slice(0, ins).concat(arr1).concat(arr.slice(ins)); }
	return {
		Browser: Browser,
		Url: url,
		Cursor: {
			editableEnd: function (obj) {
				if (window.getSelection) {//ie11 10 9 ff safari
					obj.focus(); //解决ff不获取焦点无法定位问题
					var range = window.getSelection();//创建range
					range.selectAllChildren(obj);//range 选择obj下所有子内容
					range.collapseToEnd();//光标移至最后
				}
				else if (document.selection) {//ie10 9 8 7 6 5
					var range = document.selection.createRange();//创建选择对象
					//var range = document.body.createTextRange();
					range.moveToElementText(obj);//range定位到obj
					range.collapse(false);//光标移至最后
					range.select();
				}
			},
			fieldEnd: function (obj) {
				obj.focus();//解决ff不获取焦点无法定位问题
				if (window.getSelection) {//ie11 10 9 ff safari
					var max_Len = obj.value.length;//text字符数
					obj.setSelectionRange(max_Len, max_Len);
				}
				else if (document.selection) {//ie10 9 8 7 6 5
					var range = obj.createTextRange();//创建range
					range.collapse(false);//光标移至最后
					range.select();//避免产生空格
				}
			}
		},
		Bind: function (fn, context) {
			return function () {
				return fn.apply(context, arguments);
			}
		},
		filterInput: filterInput,
		getRandomStr: getRandomStr,
		remove_: remove_,
		resetFrameHeight: function (id, h) {
			// $(window.parent.document.body).find('.iframe'+id).height($('body').innerHeight()<=650?650:$('body').innerHeight()+(h||0)+50);
			// $(window.parent.document.body).find('.iframe'+id).height($(window).height()-120);
			// console.log('hhhhh');
			// console.log($('body').innerHeight()+(h||0)+50);
		},
		getColor: function () {
			return '#' + f0(Math.floor(Math.random() * 256).toString(16)) + f0(Math.floor(Math.random() * 256).toString(16)) + f0(Math.floor(Math.random() * 256).toString(16));
		},
		isRepeat: isRepeat,
		getRepeatIndex: getRepeatIndex,
		removeLastZeros: function (num) {
			return /^\d+\.\d*$/.test(num) ? num.replace(/\.?0*$/, '') : num;
		},
		filterNewItemBrTag: function (o) {
			return $.trim(o.html().replace(/<.*?>/g, ''));
		},
		convertNull: function (v) {
			return v == null || v == 'null' ? '' : v;
		},
		toNull: function (v) {
			return v == '' ? null : v;
		},
		convertTime: function (stamp, type) {
			return stamp.replace(/t/i, ' ').replace(/:\d+$/, '');
		},
		Dater: {
			dt: function (d, num, type) {
				if (/^([1-9]\d{2,3}(\W)\d{1,2}\2\d{1,2})/.test(d)) {
					var str = d.match(/\d+/g);
					var date = new Date(), fill0 = function (x) { return x < 10 ? '0' + x : x; };
					date.setFullYear(str[0], str[1] * 1 - 1, type == 1 ? (str[2] * 1 + num) : (str[2] * 1 - num), str[3], str[4], str[5]);
					return date.getFullYear() + '-' + fill0(date.getMonth() + 1) + '-' + fill0(date.getDate());
				} else {
					return 0;
				}
			},
			add: function (d, num) {
				this.dt(d, num, 1);
			},
			back: function (d, num) {
				this.dt(d, num, 2);
			},
			today: function () {
				var date = new Date(), fill0 = function (x) { return x < 10 ? '0' + x : x; };
				return date.getFullYear() + '-' + fill0(date.getMonth() + 1) + '-' + fill0(date.getDate());
			}
		},
		distinct: function ($arr) {
			if ($arr.length) {
				var arr = [], _arr = [];
				for (var i = 0; i < $arr.length; i++) {
					if (i == 0) {
						for (var ival = $arr[i], j = i + 1; j < $arr.length; j++) $arr[j] == ival && arr.push(j);
					}
					if (i > 0 && $arr[i] != $arr[i - 1]) {
						for (var ival = $arr[i], j = i + 1; j < $arr.length; j++) $arr[j] == ival && arr.push(j);
					}
				}
				for (var i = 0; i < $arr.length; i++) {
					if ($.inArray(i, arr) == -1) {
						_arr.push($arr[i]);
					}
				}
				return _arr;
			}
		},
		unique: function (a) {
			var b = []; for (var i = 0; i < a.length; i++) { if ($.inArray(a[i], b) == -1) { b.push(a[i]) } }
			return b;
		},
		appendArr: appendArr,
		giveLinkFid: function (fmid) {
			$('a').each(function () {
				var furl = $(this).attr('href');
				if ($(this).attr('href')) $(this).attr('href', furl + (/\?\S+/.test(furl) ? '&' : '?') + '__fid__=' + fmid);
			});

		},
		css3: function (css3s) {
			var norm = function (cssp) {
				return cssp.replace(/_/g, '-').replace(/([A-Z])/g, function (a, b) { return '-' + b.toLowerCase(); });
			}, obj = {};
			["", "webkit", "moz", "ms", "o"].forEach(function (a) {
				for (var b in css3s) {
					var _b = norm(b);
					a ? obj['-' + a + '-' + _b] = css3s[b] : obj[_b] = css3s[b];
				}
			});
			return obj;
		},
		smTempl: function (mp, conf) {
			var pars = mp && mp.match(/{.+?}/g);
			if (pars) {
				pars = pars.map(p => { return p.replace(/{\s*(\w+).*?}/, '$1') });
				pars.forEach((c, i) => {
					var reg = new RegExp('{\\s*' + c + '\\s*(?:=\\s*(\\S*?))?\\s*}', 'g');
					mp = mp.replace(reg, (a, b) => {
						return this.getArgType(conf[c]) == 'function' ? conf[c]() : (conf[c] ? conf[c] : (b ? b : ''));
					});
				});
			}
			return mp;
		},
		nextTick: function (fn, t) {
			if (Promise) {
				Promise.resolve().then(fn);
			} else {
				setTimeout(function () {
					fn();
				}, t || 0);
			}
		},
		// getArrayJson:function (selector,fn) {
		// 	return JSON.stringify([...document.querySelectorAll(selector)].map(fn));
		// },
		getArgType: function (arg) {
			return Object.prototype.toString.call(arg).match(/\s(\w+)/)[1].toLowerCase();
		},
		stringifyQuery: function () {
			// stringifyQuery({},{},{}...)
			var agrs = arguments,
				_stringify = function (o) {
					var q = [];
					for (var a in o) q.push(a + '=' + (o[a]));
					return q.join('&');
				};
			if (agrs) {
				if (agrs.length == 1) {
					if (this.getArgType(agrs[0]) != 'object') return null;
					return _stringify(agrs[0]);
				} else {
					var _obj = {};
					for (var i = 0; i < agrs.length; i++) {
						if (this.getArgType(agrs[i]) == 'object') _obj = extend(_obj, agrs[i]);
					}
					return _stringify(_obj);
				}
			}
			return null;
		},
		str: function (int = 10, len = 10) {
			int = int < 2 ? 2 : int > 32 ? 32 : Math.floor(int);
			len = Math.max(len, 2);
			return Math.random().toString(int).slice(2, len + 2);
		},
		fixed: function (num, len = 2) {
			var r = new RegExp('(\\.\\d{' + len + '}).*');
			return (num + '').replace(r, '$1');
		},
		q(sel) {
			return document.querySelector(sel);
		},
		qAll(sel) {
			return document.querySelectorAll(sel);
		}

	}
}();

module.exports = Utils;
// export default Utils
