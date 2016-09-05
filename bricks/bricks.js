var Bricks = {};

Bricks.Observer = (function()
    {
        var ObserverObject = function()
        {
            var events = {};
            
            this.subscribe = function(eventName, callback)
            {
                if(!events.hasOwnProperty(eventName)) {
                    events[eventName] = [];
                }
                
                events[eventName].push(callback);
            };
            
            this.unsubscribe = function(eventName, callback)
            {
                var index = 0,
                    length = 0;
                    
                if(events.hasOwnProperty(eventName)) {
                    length = events[eventName].length;
                    
                    for(; index < length; index++) {
                        if(events[eventName][index] === callback) {
                            events[eventName].splice(index, 1);
                            break;
                        }
                    }
                }
            };
            
            this.publish = function(eventName)
            {
                var data = Array.prototype.slice.call(arguments, 1),
                    index = 0,
                    length = 0;
                    
                if(events.hasOwnProperty(eventName)) {
                    length = events[eventName].length;
                    
                    for(; index < length; index++) {
                        events[eventName][index].apply(this, data);
                    }
                }
            };
        };
        
        return new ObserverObject();
    }                   
)();

Bricks.Ajax = (function()
    {
        var _makeAjaxRequest = function (method, url, data, success, error) {
            var xhr = new XMLHttpRequest();
        
            xhr.open(method, url);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        
            if (method === 'POST') {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
        
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    var response = JSON.parse(xhr.responseText);
                    
                    if (xhr.status === 200 || xhr.status === 304) {
                        success(response);
                    } else if (error !== undefined) {
                        error(response);
                    }
                }
            };
            xhr.send(data);
        };
        
        return {
            get: function(args)
            {
                var method = 'GET',
                    url = args.url,
                    data = null,
                    success = args.success,
                    error = args.error || undefined;
                    
                _makeAjaxRequest(method, url, data, success, error);
            },
            post: function(args)
            {
                var method = 'POST',
                    url = args.url,
                    data = args.data || {},
                    success = args.success,
                    error = args.error || undefined;
                    
                // format data for JSON request
                data = "data=" + JSON.stringify(data);
                    
                _makeAjaxRequest(method, url, data, success, error);
            }
        };
    }
)();

Bricks.Date = (function()
    {
        
    }
)();


