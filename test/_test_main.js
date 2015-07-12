var allTestFiles = [];
var TEST_REGEXP = /(_test)\.js$/i;
Object.keys(window.__karma__.files).forEach(function(file) {

  if (TEST_REGEXP.test(file)) {
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});


requirejs.config({

	paths: {
		'base64': './node_modules/base64-js/lib/b64'
	},

	shim: {
		'base64': {
			exports: 'base64js'
		}
	},

  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  deps: allTestFiles,

  callback: window.__karma__.start

});
