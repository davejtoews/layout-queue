require('jsdom-global')();
var assert = require('chai').assert;
var LayoutQueue = require('../src/LayoutQueue.js');

describe('LayoutQueue', function() {
	var i = 0;
	var counter = function() { i++; }
	var readyState = "loading";

	var loadDocument = function() {
		window.dispatchEvent(new Event('load'));
		readyState = "complete";
	} 

	Object.defineProperty(document, "readyState", {
	  	get() { return readyState; }
	});

	it('should start with empty queue', function() {
	    assert.equal(LayoutQueue.list().length, 0);		
	});
	it('should add an item to queue', function() {
		LayoutQueue.add(console.log, ['argument']);
		var list = LayoutQueue.list();
		assert.equal(list[0].action, console.log);
		assert.equal(list[0].args[0], 'argument');
	});
	it('should clear an item from queue', function() {
		LayoutQueue.clear();
		assert.equal(LayoutQueue.list().length, 0);
	});
	it('should process queue on load', function() {
		LayoutQueue.add(counter, []);
		loadDocument();
		assert.equal(i, 1);
	});
	it('should process queue on resize', function() {
		window.dispatchEvent(new Event('resize'));
		assert.equal(i, 2);
	});
	it('should process queue on trigger', function() {
		LayoutQueue.trigger();
		assert.equal(i, 3);
	});
});