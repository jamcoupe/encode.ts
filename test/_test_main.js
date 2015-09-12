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
		'base64-js': './jspm_packages/github/jamcoupe/base64-js@master'
	},

	shim: {
		'base64-js/base64': {
			exports: 'Base64'
		}
	},

  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  deps: allTestFiles,

  callback: window.__karma__.start

});
