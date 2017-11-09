module.exports = {
	age: 0,

	maxAge: function (age) {
		this.age = age;
		return this;
	},

	set: function (name, json) {
		localStorage.removeItem(name);
		json.__time = new Date().getTime();
		json.__age = this.age;
		localStorage.setItem(name, JSON.stringify(json));
		return this;
	},

	getInfo: function (name) {
		var info = localStorage.getItem(name);
		return info ? JSON.parse(info) : null;
	},

	isExpired: function (name) {
		var logined = localStorage.getItem(name),
			_time = 0,
			iTime = new Date().getTime(),
			timeLength = 0;
		if (logined) {
			logined = JSON.parse(logined);
			_time = logined.__time;
			timeLength = iTime - _time;
			return timeLength >= logined.__age;
		} else {
			return true;
		}
	},

	isLogined: function (name, fn) {
		var user = '', age = this.age;
		if (!this.isExpired(name)) {
			user = JSON.parse(localStorage.getItem(name));
		} else {
			localStorage.removeItem(name);
		}
		if (user) {
			fn && fn(user);
		} else {
			fn && fn();
		}
	},

	clear: function (name, bool) {
		localStorage.removeItem(name);
		bool && location.reload();
	}
	
};



