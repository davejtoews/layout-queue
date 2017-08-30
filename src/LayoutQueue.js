"use strict";

var LayoutQueue = (function () {
    var queue = [];

    function processQueue() {
        queue.forEach(function(task) {
            task.action.apply(this, task.args);
        });
    }

    function handleLoad() {
        return processQueue();
    }

    window.addEventListener('resize', function() {
        processQueue('resize');
    });  

    return {
        add: function (action, args) {
            queue.push({
                action: action,
                args: args
            });
            if(document.readyState === "complete") {
                processQueue();
            } else {
                window.removeEventListener('load', handleLoad);
                window.addEventListener('load', handleLoad);
            }
        },
        trigger: function () {
            processQueue();
        },
        list: function () {
            return queue;
        },
        clear: function () {
            queue = [];
        }
    };
})();

module.exports = LayoutQueue;