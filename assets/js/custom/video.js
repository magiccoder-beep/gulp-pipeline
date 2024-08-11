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