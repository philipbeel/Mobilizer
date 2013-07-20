/*
 * mobilizer 0.0.1 - Responsive mobile navigation generator
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * With modifications from Philipp Robbel (http://www.robbel.com/) and Patrick DW (stackoverflow)
 * for IE compatibility.
 *
 * Revision: $Id: jquery.mobilizer.js 2013-02-17 $ 
 *
 */
(function($) {

	jQuery.fn.mobilizer = function (opts) {
		opts = $.extend({}, $.fn.mobilizer.options, opts);

		return this.each(function () {
			
			// The DOM element to take action upon
			var element = jQuery(this)
			,	controller = jQuery("#"+opts.navigationControllerId)
			,	mobilizer = {
				
				element: {},
				controller: {},
			 	viewportSize: 0,
			 	isMobile: false,
			 	isDrawVisible: false,

				init: function(element, controller) 
				{
					// Update the viewport reference
					this.setViewportSize();

					if(this.isDeviceMobile()) 
						this.setMobileView();
					else
						this.setDeafultView();
					
				},

				// Show the mobile navigaiton mode
				setMobileView: function() 
				{
					element.addClass("mobilized").show();
					controller.show();
				},

				// Hide the mobile naviagtion mode
				setDeafultView: function() 
				{
					element.removeClass("mobilized").show();
					this.hideMobileNavigation();
					controller.hide();
				},

				// Get the size of the viewport
				getViewportSize: function() 
				{
					return this.viewportSize;
				},

				// Toggle the mobile navigation visibility
				togglemobilizedNavigation: function() 
				{
					if(this.isDrawVisible)
						this.hideMobileNavigation();
					else 
						this.showMobileNavigation();
				},

				hideMobileNavigation: function() 
				{
					jQuery(".mobilized");
					$(".panel").css({left: "0px"});
					this.isDrawVisible = false;
				},

				showMobileNavigation: function() 
				{
					jQuery(".mobilized");
					$(".panel").css({left: "-150px"});
					this.isDrawVisible = true;
				},

				// Set the size of the viewport
				setViewportSize: function() 
				{
					this.viewportSize = $(window).width();
				},

				// Get the device state
				isDeviceMobile: function() 
				{	
					isMobile = (this.viewportSize < opts.width) ? true : false;
					return isMobile;
				}
			}

			// In the words of Mario, Let's a go!
			mobilizer.init(element, controller);

			// Run the plugin every time the window is resized
			$(window).resize(function(element, controller) {
				mobilizer.init(element, controller);
			});

			// Toggle the mobile navigation when the controller is clicked
			controller.bind("click", function() {
				e.preventDefault();
				mobilizer.togglemobilizedNavigation();
			});
		});
	};

	// Plugin defaults
	$.fn.mobilizer.options = {
		width: 500,                   						// The designated width of a mobile devices
		navigationControllerId: "mobile-navigaiton-controller",	// The ID of the show navigation button
		onComplete: function($ul) {}  						// On complete callback
	};
})(jQuery);