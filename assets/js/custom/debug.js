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