function getParam(name, url) {
  if (!url) url = window.location.href;
  if (name) {
    url = url.toLowerCase(); // This is just to avoid case sensitiveness
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase(); // This is just to avoid case sensitiveness for query parameter name
    let regex = new RegExp("[#\&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  } else {
    return url.split('#').pop();
  }
}

if(getParam() == "debug") {
	const debugBody = document.querySelector('body');

	// define debug class on body for whatever reasons
	debugBody.classList.add('debug-enabled');

	// build debug tools
	const debugGridPrefix = "md-1";
	const debugGridTotalCol = 12;

	const debugGrid = '<div class="debug">' +
						'<div class="debug__grid">' +
							'<section class="grid-system">' +
								'<div class="section__inner">' +
									'<div class="container">' +
										'<div class="row">' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
											'<div class="col col-'+debugGridPrefix+'">' +
												'<div class="grid-content"></div>' +
											'</div>' +
										'</div>' +
									'</div>' +
			                    '</div>' +
	                    	'</section>' +
	                    '</div>' +
                	'</div>';

	document.querySelector('body').insertAdjacentHTML(
		'afterbegin', debugGrid
	)

	// toggle grid on/off with click
	debugBody.addEventListener('click', (event) => {
		event.preventDefault();

		document.querySelector('.debug').classList.toggle('hide');
	});
}
let theme = null;

(function($) {
	"use strict";

	const selHtml = document.querySelector('html');
	const selBody = document.querySelector('body');
	
	  theme = {
		resetHamburger: function() {
			const allHamburger = document.querySelectorAll('.trigger-menu');
			for(let i = 0; i<allHamburger.length; i++) {
				allHamburger[i].classList.remove('is-active');

				if(i == allHamburger.length-1) {
					document.querySelector('.menu__secondary .hamburger').classList.add('is-active');
					document.querySelector('.menu__form .hamburger').classList.add('is-active');
				}
			}
		},
		toggleMenu: function(state, buttonContainer, isMenuForm) {
			if(buttonContainer) {
				buttonContainer.classList.toggle('is-active');
			}

			if(state) {
				selBody.classList.add('menu__active');

				if(isMenuForm) {
					selBody.classList.add('menu__form_active');
				}

				theme.toggleOverflow(true);
			} else {
				selBody.classList.remove('menu__active');
				
				theme.toggleOverflow(false);
				theme.resetHamburger();

				setTimeout(function(){
					selBody.classList.remove('menu__form_active');
				}, 300);
			}
		},
		onReady: function() {
			/**
			***** Menu
			**/


			/**
			***** Menu form
			**/


			/**
			***** Dimmer
			**/


		},
		onLoad: function() {
		    //console.log("onLoad");
		},
		onResize: function() {
			//console.log("onResize");
		}
	};

	document.addEventListener('DOMContentLoaded', theme.onReady);
	window.addEventListener('load', theme.onLoad);
	window.addEventListener("resize", theme.onResize);
})();
/*
***
***** Global transition
***
*/

const observer = new IntersectionObserver(function (entries) {
  let count = 0;

  entries.forEach(item => {
    if (item.isIntersecting) {
      setTimeout(() => {
        item.target.classList.add('transition-in-done');
      }, 120 * count);
      count++;
    }
  })
}, {
  threshold: [0.4]
});

document.querySelectorAll('.transition-in').forEach((item, index) => {
  observer.observe(item);
});

/*
***
***** Smooth scroll on hashtag click
***
*/
document.querySelectorAll('a[href^="#"]').forEach(each => {
  each.addEventListener('click', (e) => {
    e.preventDefault();
    let anchorId = each.hash;

    anchorId = anchorId.replace('#', '.'); // we dont have unique id's on our sections, so rewrite to target class

    if(anchorId != "") {
      document.querySelector(anchorId).scrollIntoView({
        behavior: 'smooth'
      });
    }

  })
});
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
let themeVideo = null;

(function($) {
	"use strict";

	const selHtml = document.querySelector('html');
	const selBody = document.querySelector('body');
	let overlayContent = '';
  
	themeVideo = {
		toggleOverflow: function(state) {
			if(state) {
				selHtml.style.overflow = "hidden";
			} else {
				selHtml.style.overflow = "";
			}
		},
		toggleMedia: function(videoID) {
			overlayContent = document.querySelector('.video__overlay .video__inner');
			//overlayContent.innerHTML = '';

			// media
			let mediaElement = '';
			const mediaVideoID = videoID;
			mediaElement = '<iframe class="" id="" src="https://player.vimeo.com/video/'+mediaVideoID+'?color=ffffff&amp;title=0&amp;byline=0&amp;portrait=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" data-ready="true" style="position:absolute;top:0;left:0;width:100%;height:100%;" allowfullscreen=""></iframe>';
			
			// append
			overlayContent.innerHTML = mediaElement;
			//inlineTargetContainer.insertAdjacentHTML("beforeend", mediaElement);

			selBody.classList.add('video__active');
		},
		onReady: function() {
			let videoTrigger = document.querySelectorAll('.video__trigger');

			if(videoTrigger.length > 0) {
				for(let i = 0; i<videoTrigger.length; i++) {
					videoTrigger[i].addEventListener("click", event => {
						event.preventDefault();
						const that = event.target;
						const thatTriggerContainer = that.closest('.video__trigger');
						const thatDataVideoId = thatTriggerContainer.getAttribute('data-video');

						if(thatDataVideoId != null && thatDataVideoId != 'null' && thatDataVideoId != "") {
							themeVideo.toggleMedia(thatDataVideoId);
						}
						
					})
				}

				/**
				***** close
				**/
				const video = document.querySelector('.video.video__overlay');

				video.addEventListener('click', (event) => {
					event.preventDefault();
					const that = event.target;

					// video active
					if(selBody.classList.contains('video__active')) {
						selBody.classList.remove('video__active');
						overlayContent.innerHTML = ''; // reset video
						theme.toggleOverflow(false);
					}
				});

			}

		}
	};

	document.addEventListener('DOMContentLoaded', themeVideo.onReady);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlYnVnLmpzIiwibWFpbi5qcyIsInRyYW5zaXRpb24uanMiLCJ1dGlsaXR5X2Z1bmN0aW9ucy5qcyIsInZpZGVvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImN1c3RvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldFBhcmFtKG5hbWUsIHVybCkge1xyXG4gIGlmICghdXJsKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICBpZiAobmFtZSkge1xyXG4gICAgdXJsID0gdXJsLnRvTG93ZXJDYXNlKCk7IC8vIFRoaXMgaXMganVzdCB0byBhdm9pZCBjYXNlIHNlbnNpdGl2ZW5lc3NcclxuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtcXF1dL2csIFwiXFxcXCQmXCIpLnRvTG93ZXJDYXNlKCk7IC8vIFRoaXMgaXMganVzdCB0byBhdm9pZCBjYXNlIHNlbnNpdGl2ZW5lc3MgZm9yIHF1ZXJ5IHBhcmFtZXRlciBuYW1lXHJcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKFwiWyNcXCZdXCIgKyBuYW1lICsgXCIoPShbXiYjXSopfCZ8I3wkKVwiKSxcclxuICAgICAgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuICAgIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIXJlc3VsdHNbMl0pIHJldHVybiAnJztcclxuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHVybC5zcGxpdCgnIycpLnBvcCgpO1xyXG4gIH1cclxufVxyXG5cclxuaWYoZ2V0UGFyYW0oKSA9PSBcImRlYnVnXCIpIHtcclxuXHRjb25zdCBkZWJ1Z0JvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG5cdC8vIGRlZmluZSBkZWJ1ZyBjbGFzcyBvbiBib2R5IGZvciB3aGF0ZXZlciByZWFzb25zXHJcblx0ZGVidWdCb2R5LmNsYXNzTGlzdC5hZGQoJ2RlYnVnLWVuYWJsZWQnKTtcclxuXHJcblx0Ly8gYnVpbGQgZGVidWcgdG9vbHNcclxuXHRjb25zdCBkZWJ1Z0dyaWRQcmVmaXggPSBcIm1kLTFcIjtcclxuXHRjb25zdCBkZWJ1Z0dyaWRUb3RhbENvbCA9IDEyO1xyXG5cclxuXHRjb25zdCBkZWJ1Z0dyaWQgPSAnPGRpdiBjbGFzcz1cImRlYnVnXCI+JyArXHJcblx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZGVidWdfX2dyaWRcIj4nICtcclxuXHRcdFx0XHRcdFx0XHQnPHNlY3Rpb24gY2xhc3M9XCJncmlkLXN5c3RlbVwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJzZWN0aW9uX19pbm5lclwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwicm93XCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImNvbCBjb2wtJytkZWJ1Z0dyaWRQcmVmaXgrJ1wiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImdyaWQtY29udGVudFwiPjwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjb2wgY29sLScrZGVidWdHcmlkUHJlZml4KydcIj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJncmlkLWNvbnRlbnRcIj48L2Rpdj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiY29sIGNvbC0nK2RlYnVnR3JpZFByZWZpeCsnXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZ3JpZC1jb250ZW50XCI+PC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImNvbCBjb2wtJytkZWJ1Z0dyaWRQcmVmaXgrJ1wiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImdyaWQtY29udGVudFwiPjwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjb2wgY29sLScrZGVidWdHcmlkUHJlZml4KydcIj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJncmlkLWNvbnRlbnRcIj48L2Rpdj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiY29sIGNvbC0nK2RlYnVnR3JpZFByZWZpeCsnXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZ3JpZC1jb250ZW50XCI+PC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImNvbCBjb2wtJytkZWJ1Z0dyaWRQcmVmaXgrJ1wiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImdyaWQtY29udGVudFwiPjwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjb2wgY29sLScrZGVidWdHcmlkUHJlZml4KydcIj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJncmlkLWNvbnRlbnRcIj48L2Rpdj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiY29sIGNvbC0nK2RlYnVnR3JpZFByZWZpeCsnXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZ3JpZC1jb250ZW50XCI+PC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImNvbCBjb2wtJytkZWJ1Z0dyaWRQcmVmaXgrJ1wiPicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cImdyaWQtY29udGVudFwiPjwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJjb2wgY29sLScrZGVidWdHcmlkUHJlZml4KydcIj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJncmlkLWNvbnRlbnRcIj48L2Rpdj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nICtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiY29sIGNvbC0nK2RlYnVnR3JpZFByZWZpeCsnXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwiZ3JpZC1jb250ZW50XCI+PC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PicgK1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+JyArXHJcblx0XHRcdCAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgXHQnPC9zZWN0aW9uPicgK1xyXG5cdCAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgXHQnPC9kaXY+JztcclxuXHJcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmluc2VydEFkamFjZW50SFRNTChcclxuXHRcdCdhZnRlcmJlZ2luJywgZGVidWdHcmlkXHJcblx0KVxyXG5cclxuXHQvLyB0b2dnbGUgZ3JpZCBvbi9vZmYgd2l0aCBjbGlja1xyXG5cdGRlYnVnQm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVidWcnKS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XHJcblx0fSk7XHJcbn0iLCJsZXQgdGhlbWUgPSBudWxsO1xyXG5cclxuKGZ1bmN0aW9uKCQpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3Qgc2VsSHRtbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKTtcclxuXHRjb25zdCBzZWxCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cdFxyXG5cdCAgdGhlbWUgPSB7XHJcblx0XHRyZXNldEhhbWJ1cmdlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNvbnN0IGFsbEhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50cmlnZ2VyLW1lbnUnKTtcclxuXHRcdFx0Zm9yKGxldCBpID0gMDsgaTxhbGxIYW1idXJnZXIubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRhbGxIYW1idXJnZXJbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcblxyXG5cdFx0XHRcdGlmKGkgPT0gYWxsSGFtYnVyZ2VyLmxlbmd0aC0xKSB7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fc2Vjb25kYXJ5IC5oYW1idXJnZXInKS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuXHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19mb3JtIC5oYW1idXJnZXInKS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR0b2dnbGVNZW51OiBmdW5jdGlvbihzdGF0ZSwgYnV0dG9uQ29udGFpbmVyLCBpc01lbnVGb3JtKSB7XHJcblx0XHRcdGlmKGJ1dHRvbkNvbnRhaW5lcikge1xyXG5cdFx0XHRcdGJ1dHRvbkNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdpcy1hY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoc3RhdGUpIHtcclxuXHRcdFx0XHRzZWxCb2R5LmNsYXNzTGlzdC5hZGQoJ21lbnVfX2FjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHRpZihpc01lbnVGb3JtKSB7XHJcblx0XHRcdFx0XHRzZWxCb2R5LmNsYXNzTGlzdC5hZGQoJ21lbnVfX2Zvcm1fYWN0aXZlJyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGVtZS50b2dnbGVPdmVyZmxvdyh0cnVlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZWxCb2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21lbnVfX2FjdGl2ZScpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHRoZW1lLnRvZ2dsZU92ZXJmbG93KGZhbHNlKTtcclxuXHRcdFx0XHR0aGVtZS5yZXNldEhhbWJ1cmdlcigpO1xyXG5cclxuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRzZWxCb2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21lbnVfX2Zvcm1fYWN0aXZlJyk7XHJcblx0XHRcdFx0fSwgMzAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdG9uUmVhZHk6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvKipcclxuXHRcdFx0KioqKiogTWVudVxyXG5cdFx0XHQqKi9cclxuXHJcblxyXG5cdFx0XHQvKipcclxuXHRcdFx0KioqKiogTWVudSBmb3JtXHJcblx0XHRcdCoqL1xyXG5cclxuXHJcblx0XHRcdC8qKlxyXG5cdFx0XHQqKioqKiBEaW1tZXJcclxuXHRcdFx0KiovXHJcblxyXG5cclxuXHRcdH0sXHJcblx0XHRvbkxvYWQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgIC8vY29uc29sZS5sb2coXCJvbkxvYWRcIik7XHJcblx0XHR9LFxyXG5cdFx0b25SZXNpemU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKFwib25SZXNpemVcIik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHRoZW1lLm9uUmVhZHkpO1xyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdGhlbWUub25Mb2FkKTtcclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGVtZS5vblJlc2l6ZSk7XHJcbn0pKCk7IiwiLypcclxuKioqXHJcbioqKioqIEdsb2JhbCB0cmFuc2l0aW9uXHJcbioqKlxyXG4qL1xyXG5cclxuY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKGVudHJpZXMpIHtcclxuICBsZXQgY291bnQgPSAwO1xyXG5cclxuICBlbnRyaWVzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBpZiAoaXRlbS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpdGVtLnRhcmdldC5jbGFzc0xpc3QuYWRkKCd0cmFuc2l0aW9uLWluLWRvbmUnKTtcclxuICAgICAgfSwgMTIwICogY291bnQpO1xyXG4gICAgICBjb3VudCsrO1xyXG4gICAgfVxyXG4gIH0pXHJcbn0sIHtcclxuICB0aHJlc2hvbGQ6IFswLjRdXHJcbn0pO1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRyYW5zaXRpb24taW4nKS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gIG9ic2VydmVyLm9ic2VydmUoaXRlbSk7XHJcbn0pO1xyXG5cclxuLypcclxuKioqXHJcbioqKioqIFNtb290aCBzY3JvbGwgb24gaGFzaHRhZyBjbGlja1xyXG4qKipcclxuKi9cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmXj1cIiNcIl0nKS5mb3JFYWNoKGVhY2ggPT4ge1xyXG4gIGVhY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IGFuY2hvcklkID0gZWFjaC5oYXNoO1xyXG5cclxuICAgIGFuY2hvcklkID0gYW5jaG9ySWQucmVwbGFjZSgnIycsICcuJyk7IC8vIHdlIGRvbnQgaGF2ZSB1bmlxdWUgaWQncyBvbiBvdXIgc2VjdGlvbnMsIHNvIHJld3JpdGUgdG8gdGFyZ2V0IGNsYXNzXHJcblxyXG4gICAgaWYoYW5jaG9ySWQgIT0gXCJcIikge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFuY2hvcklkKS5zY3JvbGxJbnRvVmlldyh7XHJcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9KVxyXG59KTsiLCJsZXQgdXRpbGl0eSA9IG51bGw7XHJcblxyXG4vKipcclxuICogU3RvcmUgdGhlIHNjcm9sbCB0b3AgcG9zaXRpb24gYXMgYXBwbHlpbmcgb3ZlcmZsb3c6aGlkZGVuIHRvIHRoZSBib2R5IG1ha2VzIGl0IGp1bXAgdG8gMFxyXG4gKiBAdHlwZSBpbnRcclxuICovXHJcbmxldCBzY3JvbGxQb3M7XHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG4gIFxyXG5cdHV0aWxpdHkgPSB7XHJcbiAgICAgICAgcmVmcmVzaFNjcm9sbFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2Nyb2xsUG9zID0gd2luZG93LnNjcm9sbFkgfHwgd2luZG93LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImh0bWxcIilbMF0uc2Nyb2xsVG9wO1xyXG4gICAgICAgIH0sXHJcblx0XHRnZXRTY3JlZW5IZWlnaHQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRsZXQgc2NyZWVuSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XHJcblx0XHRcdFx0fHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxyXG5cdFx0XHRcdHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xyXG5cclxuXHRcdFx0cmV0dXJuIHNjcmVlbkhlaWdodDtcclxuXHRcdH0sXHJcblx0XHRnZXRTY3JlZW5XaWR0aDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGxldCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXHJcblx0XHRcdFx0fHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcblx0XHRcdFx0fHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcclxuXHJcblx0XHRcdHJldHVybiBzY3JlZW5XaWR0aDtcclxuXHRcdH0sXHJcblx0XHRnZXRQYXJhbTogZnVuY3Rpb24gKG5hbWUsIHVybCkge1xyXG5cdFx0ICBpZiAoIXVybCkgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblx0XHQgIGlmIChuYW1lKSB7XHJcblx0XHQgICAgdXJsID0gdXJsLnRvTG93ZXJDYXNlKCk7IC8vIFRoaXMgaXMganVzdCB0byBhdm9pZCBjYXNlIHNlbnNpdGl2ZW5lc3NcclxuXHRcdCAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXFxdXS9nLCBcIlxcXFwkJlwiKS50b0xvd2VyQ2FzZSgpOyAvLyBUaGlzIGlzIGp1c3QgdG8gYXZvaWQgY2FzZSBzZW5zaXRpdmVuZXNzIGZvciBxdWVyeSBwYXJhbWV0ZXIgbmFtZVxyXG5cdFx0ICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbI1xcJl1cIiArIG5hbWUgKyBcIig9KFteJiNdKil8JnwjfCQpXCIpLFxyXG5cdFx0ICAgICAgcmVzdWx0cyA9IHJlZ2V4LmV4ZWModXJsKTtcclxuXHRcdCAgICBpZiAoIXJlc3VsdHMpIHJldHVybiBudWxsO1xyXG5cdFx0ICAgIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xyXG5cdFx0ICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1syXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcclxuXHRcdCAgfSBlbHNlIHtcclxuXHRcdCAgICByZXR1cm4gdXJsLnNwbGl0KCc/JykucG9wKCk7XHJcblx0XHQgIH1cclxuXHRcdH0sXHJcblx0XHR0b2dnbGVPdmVyZmxvdzogZnVuY3Rpb24oc3RhdGUpIHtcclxuXHRcdFx0aWYoc3RhdGUpIHtcclxuXHRcdFx0XHRzZWxCb2R5LmNsYXNzTGlzdC5hZGQoJ21lbnVfX29wZW5lZCcpO1xyXG5cdFx0XHRcdHNlbEh0bWwuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNlbEJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbWVudV9fb3BlbmVkJyk7XHJcblx0XHRcdFx0c2VsSHRtbC5zdHlsZS5vdmVyZmxvdyA9IFwiXCI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdXRpbGl0eS5vblJlYWR5KTtcclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHV0aWxpdHkub25Mb2FkKTtcclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1dGlsaXR5Lm9uUmVzaXplKTtcclxufSkoKTsiLCJsZXQgdGhlbWVWaWRlbyA9IG51bGw7XHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRjb25zdCBzZWxIdG1sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpO1xyXG5cdGNvbnN0IHNlbEJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblx0bGV0IG92ZXJsYXlDb250ZW50ID0gJyc7XHJcbiAgXHJcblx0dGhlbWVWaWRlbyA9IHtcclxuXHRcdHRvZ2dsZU92ZXJmbG93OiBmdW5jdGlvbihzdGF0ZSkge1xyXG5cdFx0XHRpZihzdGF0ZSkge1xyXG5cdFx0XHRcdHNlbEh0bWwuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNlbEh0bWwuc3R5bGUub3ZlcmZsb3cgPSBcIlwiO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0dG9nZ2xlTWVkaWE6IGZ1bmN0aW9uKHZpZGVvSUQpIHtcclxuXHRcdFx0b3ZlcmxheUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW9fX292ZXJsYXkgLnZpZGVvX19pbm5lcicpO1xyXG5cdFx0XHQvL292ZXJsYXlDb250ZW50LmlubmVySFRNTCA9ICcnO1xyXG5cclxuXHRcdFx0Ly8gbWVkaWFcclxuXHRcdFx0bGV0IG1lZGlhRWxlbWVudCA9ICcnO1xyXG5cdFx0XHRjb25zdCBtZWRpYVZpZGVvSUQgPSB2aWRlb0lEO1xyXG5cdFx0XHRtZWRpYUVsZW1lbnQgPSAnPGlmcmFtZSBjbGFzcz1cIlwiIGlkPVwiXCIgc3JjPVwiaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLycrbWVkaWFWaWRlb0lEKyc/Y29sb3I9ZmZmZmZmJmFtcDt0aXRsZT0wJmFtcDtieWxpbmU9MCZhbXA7cG9ydHJhaXQ9MFwiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93PVwiYXV0b3BsYXk7IGZ1bGxzY3JlZW47IHBpY3R1cmUtaW4tcGljdHVyZVwiIGRhdGEtcmVhZHk9XCJ0cnVlXCIgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtcIiBhbGxvd2Z1bGxzY3JlZW49XCJcIj48L2lmcmFtZT4nO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8gYXBwZW5kXHJcblx0XHRcdG92ZXJsYXlDb250ZW50LmlubmVySFRNTCA9IG1lZGlhRWxlbWVudDtcclxuXHRcdFx0Ly9pbmxpbmVUYXJnZXRDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIG1lZGlhRWxlbWVudCk7XHJcblxyXG5cdFx0XHRzZWxCb2R5LmNsYXNzTGlzdC5hZGQoJ3ZpZGVvX19hY3RpdmUnKTtcclxuXHRcdH0sXHJcblx0XHRvblJlYWR5OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0bGV0IHZpZGVvVHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52aWRlb19fdHJpZ2dlcicpO1xyXG5cclxuXHRcdFx0aWYodmlkZW9UcmlnZ2VyLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpPHZpZGVvVHJpZ2dlci5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0dmlkZW9UcmlnZ2VyW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XHJcblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHRoYXQgPSBldmVudC50YXJnZXQ7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHRoYXRUcmlnZ2VyQ29udGFpbmVyID0gdGhhdC5jbG9zZXN0KCcudmlkZW9fX3RyaWdnZXInKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgdGhhdERhdGFWaWRlb0lkID0gdGhhdFRyaWdnZXJDb250YWluZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXZpZGVvJyk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZih0aGF0RGF0YVZpZGVvSWQgIT0gbnVsbCAmJiB0aGF0RGF0YVZpZGVvSWQgIT0gJ251bGwnICYmIHRoYXREYXRhVmlkZW9JZCAhPSBcIlwiKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhlbWVWaWRlby50b2dnbGVNZWRpYSh0aGF0RGF0YVZpZGVvSWQpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8qKlxyXG5cdFx0XHRcdCoqKioqIGNsb3NlXHJcblx0XHRcdFx0KiovXHJcblx0XHRcdFx0Y29uc3QgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8udmlkZW9fX292ZXJsYXknKTtcclxuXHJcblx0XHRcdFx0dmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRjb25zdCB0aGF0ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuXHRcdFx0XHRcdC8vIHZpZGVvIGFjdGl2ZVxyXG5cdFx0XHRcdFx0aWYoc2VsQm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3ZpZGVvX19hY3RpdmUnKSkge1xyXG5cdFx0XHRcdFx0XHRzZWxCb2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3ZpZGVvX19hY3RpdmUnKTtcclxuXHRcdFx0XHRcdFx0b3ZlcmxheUNvbnRlbnQuaW5uZXJIVE1MID0gJyc7IC8vIHJlc2V0IHZpZGVvXHJcblx0XHRcdFx0XHRcdHRoZW1lLnRvZ2dsZU92ZXJmbG93KGZhbHNlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHRoZW1lVmlkZW8ub25SZWFkeSk7XHJcbn0pKCk7Il19