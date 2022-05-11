"use strict";

// // Generates a string from "color-1" to "color-32" based on an input string
// export default (str) => {
// 	let hash = 0;
//
// 	for (let i = 0; i < str.length; i++) {
// 		hash += str.charCodeAt(i);
// 	}
//
// 	/*
// 		Modulo 32 lets us be case insensitive for ascii
// 		due to A being ascii 65 (100 0001)
// 		 while a being ascii 97 (110 0001)
// 	*/
// 	return "color-" + (1 + (hash % 32));
// };

//  A formatted version of a popular md5 implementation.
//  Original copyright (c) Paul Johnston & Greg Holt.
function md5(inputString) {
	const hc = "0123456789abcdef";

	function rh(n) {
		let j, s = "";

		for (j = 0; j <= 3; j++) {
			s += hc.charAt((n >> (j * 8 + 4)) & 0x0F) + hc.charAt((n >> (j * 8)) & 0x0F)
		}

		return s;
	}

	function ad(x, y) {
		const l = (x & 0xFFFF) + (y & 0xFFFF);
		const m = (x >> 16) + (y >> 16) + (l >> 16);
		return (m << 16) | (l & 0xFFFF);
	}

	function rl(n, c) {
		return (n << c) | (n >>> (32 - c));
	}

	function cm(q, a, b, x, s, t) {
		return ad(rl(ad(ad(a, q), ad(x, t)), s), b);
	}

	function ff(a, b, c, d, x, s, t) {
		return cm((b & c) | ((~b) & d), a, b, x, s, t);
	}

	function gg(a, b, c, d, x, s, t) {
		return cm((b & d) | (c & (~d)), a, b, x, s, t);
	}

	function hh(a, b, c, d, x, s, t) {
		return cm(b ^ c ^ d, a, b, x, s, t);
	}

	function ii(a, b, c, d, x, s, t) {
		return cm(c ^ (b | (~d)), a, b, x, s, t);
	}

	function sb(x) {
		const nblk = ((x.length + 8) >> 6) + 1;
		const blks = new Array(nblk * 16);

		let i;

		for (i = 0; i < nblk * 16; i++) {
			blks[i] = 0;
		}

		for (i = 0; i < x.length; i++) {
			blks[i >> 2] |= x.charCodeAt(i) << ((i % 4) * 8);
		}

		blks[i >> 2] |= 0x80 << ((i % 4) * 8);
		blks[nblk * 16 - 2] = x.length * 8;

		return blks;
	}

	const x = sb(inputString);
	let a = 1732584193,
		b = -271733879,
		c = -1732584194,
		d = 271733878,
		olda, oldb, oldc, oldd;

	for (let i = 0; i < x.length; i += 16) {
		olda = a;
		oldb = b;
		oldc = c;
		oldd = d;

		a = ff(a, b, c, d, x[i + 0], 7, -680876936);
		d = ff(d, a, b, c, x[i + 1], 12, -389564586);
		c = ff(c, d, a, b, x[i + 2], 17, 606105819);
		b = ff(b, c, d, a, x[i + 3], 22, -1044525330);

		a = ff(a, b, c, d, x[i + 4], 7, -176418897);
		d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
		c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
		b = ff(b, c, d, a, x[i + 7], 22, -45705983);

		a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
		d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
		c = ff(c, d, a, b, x[i + 10], 17, -42063);
		b = ff(b, c, d, a, x[i + 11], 22, -1990404162);

		a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
		d = ff(d, a, b, c, x[i + 13], 12, -40341101);
		c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
		b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

		a = gg(a, b, c, d, x[i + 1], 5, -165796510);
		d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
		c = gg(c, d, a, b, x[i + 11], 14, 643717713);
		b = gg(b, c, d, a, x[i + 0], 20, -373897302);

		a = gg(a, b, c, d, x[i + 5], 5, -701558691);
		d = gg(d, a, b, c, x[i + 10], 9, 38016083);
		c = gg(c, d, a, b, x[i + 15], 14, -660478335);
		b = gg(b, c, d, a, x[i + 4], 20, -405537848);

		a = gg(a, b, c, d, x[i + 9], 5, 568446438);
		d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
		c = gg(c, d, a, b, x[i + 3], 14, -187363961);
		b = gg(b, c, d, a, x[i + 8], 20, 1163531501);

		a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
		d = gg(d, a, b, c, x[i + 2], 9, -51403784);
		c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
		b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

		a = hh(a, b, c, d, x[i + 5], 4, -378558);
		d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
		c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
		b = hh(b, c, d, a, x[i + 14], 23, -35309556);

		a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
		d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
		c = hh(c, d, a, b, x[i + 7], 16, -155497632);
		b = hh(b, c, d, a, x[i + 10], 23, -1094730640);

		a = hh(a, b, c, d, x[i + 13], 4, 681279174);
		d = hh(d, a, b, c, x[i + 0], 11, -358537222);
		c = hh(c, d, a, b, x[i + 3], 16, -722521979);
		b = hh(b, c, d, a, x[i + 6], 23, 76029189);

		a = hh(a, b, c, d, x[i + 9], 4, -640364487);
		d = hh(d, a, b, c, x[i + 12], 11, -421815835);
		c = hh(c, d, a, b, x[i + 15], 16, 530742520);
		b = hh(b, c, d, a, x[i + 2], 23, -995338651);

		a = ii(a, b, c, d, x[i + 0], 6, -198630844);
		d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
		c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
		b = ii(b, c, d, a, x[i + 5], 21, -57434055);

		a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
		d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
		c = ii(c, d, a, b, x[i + 10], 15, -1051523);
		b = ii(b, c, d, a, x[i + 1], 21, -2054922799);

		a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
		d = ii(d, a, b, c, x[i + 15], 10, -30611744);
		c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
		b = ii(b, c, d, a, x[i + 13], 21, 1309151649);

		a = ii(a, b, c, d, x[i + 4], 6, -145523070);
		d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
		c = ii(c, d, a, b, x[i + 2], 15, 718787259);
		b = ii(b, c, d, a, x[i + 9], 21, -343485551);

		a = ad(a, olda);
		b = ad(b, oldb);
		c = ad(c, oldc);
		d = ad(d, oldd);
	}

	return rh(a) + rh(b) + rh(c) + rh(d);
}

// Generates a consistent color value based on an input string
// Copyright (c) 2010 - 2020 Codeux Software, LLC & respective contributors.
function nicknameColorForString(str, isLightBackground) {
	str = md5("a-" + str.toLowerCase());

	let hash = 0;

	for (let i = 0; i < str.length; i++) {
		hash += str.toLowerCase().charCodeAt(i);
	}

	const shash = (hash >> 1);
	const lhash = (hash >> 2);

	const h = (hash % 360);

	let s = 0;
	let l = 0;

	if (isLightBackground) {
		s = (shash % 50 + 35); // 35 - 85
		l = (lhash % 38 + 20); // 20 - 58

		// Lower lightness for Yellow, Green, Cyan
		if (h > 45 && h <= 195) {
			l = (lhash % 21 + 20); // 20 - 41

			if (l > 31) {
				s = (shash % 40 + 55); // 55 - 95
			} else {
				s = (shash % 35 + 65); // 65 - 95
			}

			// Give the reds a bit more saturation
			if (h <= 25 || h >= 335) {
				s = (shash % 33 + 45); // 45 - 78
			}
		}
	} else {
		s = (shash % 50 + 45); // 50 - 95
		l = (lhash % 36 + 45); // 45 - 81

		// Give the pinks a bit more lightness
		if (h >= 280 && h < 335) {
			l = (lhash % 36 + 50); // 50 - 86
		}

		// Give the blues a smaller (but lighter) range
		if (h >= 210 && h < 240) {
			l = (lhash % 30 + 60); // 60 - 90
		}

		// Tone down very specific range of blue/purple
		if (h >= 240 && h < 280) {
			s = (shash % 55 + 40); // 40 - 95
			l = (lhash % 20 + 65); // 65 - 85
		}

		// Give the reds a bit less saturation
		if (h <= 25 || h >= 335) {
			s = (shash % 33 + 45); // 45 - 78
		}

		// Give the yellows and greens a bit less saturation as well
		if (h >= 50 && h <= 150) {
			s = (shash % 50 + 40); // 40 - 90
		}
	}

	return(`color: hsl(${h},${s}%,${l}%)`);
}

export default nicknameColorForString;
