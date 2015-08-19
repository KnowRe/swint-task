'use strict';

var async = require('async'),
	swintHelper = require('swint-helper'),
	defaultize = swintHelper.defaultize;

module.exports = function(tasks, callback) {
	async.series(
		tasks.map(function(t) {
			defaultize({
				func: function() {},
				option: {}
			}, t);

			return function(cb) {
				t.func(t.option, function(err, res) {
					if(err) {
						callback(err, []);
						return;
					}
					cb(err, res);
				});
			};
		}),
		function(err, results) {
			callback(err, results);
		}
	);
};
