'use strict';
var grunt = require('grunt');
var path = require('path'),
	exec = require('child_process').exec,
	execOptions = {
		cwd: path.join(__dirname, '../test'),
    timeout: 3000
	}
;
var request = require('sync-request');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit
  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.jsonserver = {
  setUp: function (done) {
    // setup here if necessary
    	var server = exec('grunt jsonserver:mock', execOptions, function(error, stdout) {
        if (stdout) {
            console.log ('stdout ' + stdout);
        }
      });
    done();
  },
  get: function (test) {
    test.expect(1);
    var response = request('GET', 'http://localhost:8888/mock/1');
    var obj = JSON.parse(response.getBody('utf8'));
    var expected = {
      id: 1,
      name: 'the name'
    }; 
    test.equal(JSON.stringify(obj), JSON.stringify(expected), 'should get the object with id = 1.');
    test.done();
  },
  post: function (test) {
    test.expect(1);
    var response = request('POST', 'http://localhost:8888/mock', {
        json: { name: 'the second one'  }
    });
    var obj = JSON.parse(response.getBody('utf8'));
    var expected = {
      name: 'the second one',
      id: 2
    };
    test.equal(JSON.stringify(obj), JSON.stringify(expected), 'should post the object with id = 2.');
    test.done();
  },
};
