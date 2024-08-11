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