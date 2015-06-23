
window.onload = function () {

    chrome.storage.local.get('elm_todo_state', function (result) {
        var storedState = result.elm_todo_state;
        var startingState = storedState ? JSON.parse(storedState) : null;

        var todomvc = Elm.fullscreen(Elm.Todo, { getStorage: startingState });
        todomvc.ports.focus.subscribe(function(selector) {
            setTimeout(function() {
                var nodes = document.querySelectorAll(selector);
                if (nodes.length === 1 && document.activeElement !== nodes[0]) {
                    nodes[0].focus()
                }
            }, 50);
        });

        todomvc.ports.setStorage.subscribe(function(state) {
            chrome.storage.local.set({'elm_todo_state': JSON.stringify(state)});
        });
    });
}
