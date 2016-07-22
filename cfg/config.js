plugins.config(function(done) {

	var path = "plugins/interact-client-core/res/";

	plugins.createScript({
		"src": path+"modernizr.js"
	});

	plugins.waitFor(function() {

		return window.Modernizr !== undefined;

	}, function() {

	    loadCoreLibraries();

	});

	function loadCoreLibraries() {
		
		var IE = (function() {
	        if (document.documentMode) {
	            return document.documentMode;
	        }
	        return false;
	    })();
	    
	    Modernizr.load([
	        {
	            test: window.JSON,
	            nope: path+"json2.js"
	        },
	        {
	            test: window.console == undefined,
	            yep: path+"consoles.js",
	            complete: function () {

			        requirejs.config({
			            shim: {
			                jquery: {
			                    exports: '$'
			                }
			            }
			        });
			        
			        Modernizr.load([
			            {
			                test: IE == 8,
			                yep: path+"jquery.js",
			                nope: path+"jquery.v2.js",
			                complete: function setupJQuery() {

						        switch (IE) {
						        case 8: case 9:
						            //ie8 and ie9 don't do crossdomain with jquery normally
						            break;
						        default:
						            //cross domain support for all other browers
						            $.ajaxPrefilter(function( options ) {
						                options.crossDomain = true;
						            });
						        }

						        plugins.flags.core = true;

						        $(done);
						    }
			            }
			        ]);

			    }
	        }
	    ]);
	}

});