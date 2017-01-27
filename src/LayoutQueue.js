"use strict";

var LayoutQueue = (function () {
    var queue = [];

    function processQueue() {
        queue.forEach(function(task) {
            task.action.apply(this, task.args);
        });
    }

    window.addEventListener('load', function(){
        processQueue();
    });

    window.addEventListener('resize', function() {
        processQueue();
    });  

    return {
        add: function (action, args) {
            queue.push({
                action: action,
                args: args
            });
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