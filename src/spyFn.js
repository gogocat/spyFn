
/**
 * spyFn
 * @description decorate original function with before and after callbacks
 * @param {any} option object {ctx[context of original function], fnName[string], before[function], after[function]}
 */
function spyFn(opt) {
    var ofn;
    if (typeof opt !== 'object' || typeof opt.ctx === 'undefined' || typeof opt.fnName !== 'string') {
        return;
    }
    opt.ctx = (opt.ctx !== null && typeof opt.ctx === 'object') ? opt.ctx : window;

    ofn = opt.ctx[opt.fnName];
    
    // IIFE
    opt.ctx[opt.fnName] = (function(context, fnName, before, after) {
        // store the orginal function reference
        var ofn = context[fnName];
        
        return function() {
            var arg = Array.prototype.slice.call(arguments),
                ret;
            
            if (typeof before === 'function') {
                arg = before(arg);
            }
            ret = ofn.apply(context, arg);
            if (typeof after === 'function') {
                after(ret, arg);
            }
            return ret;
        }
    }(opt.ctx, opt.fnName, opt.before, opt.after));

    // stick a 'stopSpy' function to the function object
    opt.ctx[opt.fnName].stopSpy = (function(context, fnName, ofn) {
        return function() {
            context[fnName] = ofn;
        }
    }(opt.ctx, opt.fnName, ofn));
}

