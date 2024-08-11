let utility = null;

/**
 * Store the scroll top position as applying overflow:hidden to the body makes it jump to 0
 * @type int
 */
let scrollPos;

(function($) {
	"use strict";
  
	utility = {
        refreshScrollPosition: function() {
            scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop;
        },
		getScreenHeight: function() {
			let screenHeight = window.innerHeight
				|| document.documentElement.clientHeight
				|| document.body.clientHeight;

			return screenHeight;
		},
		getScreenWidth: function() {
			let screenWidth = window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth;

			return screenWidth;
		},
		getParam: function (name, url) {
		  if (!url) url = window.location.href;
		  if (name) {
		    url = url.toLowerCase(); // This is just to avoid case sensitiveness
		    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase(); // This is just to avoid case sensitiveness for query parameter name
		    var regex = new RegExp("[#\&]" + name + "(=([^&#]*)|&|#|$)"),
		      results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, " "));
		  } else {
		    return url.split('?').pop();
		  }
		},
		toggleOverflow: function(state) {
			if(state) {
				selBody.classList.add('menu__opened');
				selHtml.style.overflow = "hidden";
			} else {
				selBody.classList.remove('menu__opened');
				selHtml.style.overflow = "";
			}
		}
	};

	document.addEventListener('DOMContentLoaded', utility.onReady);
	window.addEventListener('load', utility.onLoad);
	window.addEventListener("resize", utility.onResize);
})();