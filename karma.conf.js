// Karma configuration
// Generated on Sat Jul 11 2015 15:30:28 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine', 'requirejs'],

    exclude: ['*.d.ts', '**/*.d.ts'],

	  files: [
		  { pattern: 'test/_test_main.js', included: true, watched: true,  served: true },

		  { pattern: 'jspm_packages/github/jamcoupe/**/*.js', watched: false, included: false, served: true},

		  { pattern: 'encode.ts', watched: true, included: false, served: false},
		  { pattern: 'src/**/*.ts', watched: true, included: false, served: false},
		  { pattern: 'test/**/*.ts', watched: true, included: false, served: false},

		  { pattern: 'src/**/*.js', included: false },
		  { pattern: 'test/**/*.js', included: false }
	  ],

	  preprocessors: {
		  '*/**/*.ts': ['tsc']
	  },

	  tscPreprocessor: {
		  tsConfig: "tsconfig.json"
	  },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_DEBUG,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false
  })
};
