
![Image](https://img.shields.io/badge/Test-Pass-green.svg?style=flat-square) [![PyPI](https://img.shields.io/pypi/l/Django.svg?style=flat-square)]()


# SpyFn

Spy on a function with 'Before' and 'After' callbacks. This is achieved by manipulate the function reference at run time.
It can spy on on a method in an object or any global function.
The 'Before' callback will receive the caller's arguments as array allowing to intercept the call and modify the arguments before pass to the original function.
The 'After' callbacl will receive the return result from the original function call. Also the executed arguments.
The original function can be restore to normal by calling stopSpy.

**Example**

```javascript
// orginal function
function validateCreditCard(cardNumber) {
	return typeof cardNumber === 'number';
}

// assign spy
spyFn({
	ctx: null, // because target function is global
	fnName: 'validateCreditCard',
	before: function(arg) {
		console.log(arg);
		// reurn a moidfied argument array
		return [888888];
	},
	after: function(isValid, arg) {
		if (isValid) {
			console.log(arg);
		}
	}
});

// call original function
validateCreditCard(12345678);
// before callback log -> [12345678]
// after callback log -> true, [888888]

// stop spy and restore to original function
validateCreditCard.stopSpy();

```


License
----

BSD