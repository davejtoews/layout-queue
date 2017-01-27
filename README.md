# Layout Queue

This library was created to eliminate race conditions when multiple JavaScript applied style changes need to occur on window resize. By adding actions to the queue it can be assured that each action will be called in the order they were added every time the queue is triggerd. By default the queue will execute on window load and window resize, but additional triggers can be added, for example on the loading of ajax content that affects the layout. 

##  Installation

Install via npm (or yarn), or copy bundle.js to your project and include via a script tag.

    npm install layout-queue

OR

	yarn add layout-queue

OR

	<script src="path/to/file/bundle.js">

## Use

Add a function to the queue with the `add()` method, by passing in the function and an array of it's argument.

    LayoutQueue.add(nameOfYourFunction, [argument1, argument2]);

### Adding other triggers

If you need the queue to execute on other events, for example when loading ajax content, or when an iframe is loaded, the `trigger()` method can be used. Example:

    document.querySelectorAll('iframe').forEach(function(element) {
        element.addEventListener('load', function() {
            LayoutQueue.trigger();
        });
    });

### Additional methods

    LayoutQueue.list() // Returns an array of queued functions.
    LayoutQueue.clear() // Empties the queue.