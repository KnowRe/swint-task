var assert = require('assert'),
	swintTask = require('../lib');

describe('task', function() {
	it('Check if tasks run in series', function(done) {
		var sharedArray = [],
			tasks = [
				{
					func: function(option, callback) {
						sharedArray.push(option.value);
						callback(null, true);
					},
					option: {
						value: 1
					}
				},
				{
					func: function(option, callback) {
						sharedArray.push(option.value);
						setTimeout(function() {
							callback(null, true);
						}, 10);
					},
					option: {
						value: 2
					}
				},
				{
					func: function(option, callback) {
						setTimeout(function() {
							sharedArray.push(option.value);
							callback(null, true);
						}, 15);
					},
					option: {
						value: 3
					}
				}
			];

		swintTask(tasks, function(err, res) {
			assert.deepEqual(sharedArray, [1, 2, 3]);
			done();
		});
	});
});
