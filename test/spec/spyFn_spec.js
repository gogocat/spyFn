
// setup test functions and object
function validateCreditCard(cardNumber) {
	return typeof cardNumber === 'number';
}

var obj = {
	method: function(msg) {
		return 'hello ' + msg;
	},
	childObj: {
		method: function(msg) {
			return 'childObj said hello ' + msg;
		},
	}
};


describe("Given spyFn is running", function() {
	
	// test spy on global function
	it("should spy on validateCreditCard before and after", function() {
		var retBefore,
			retResult,
			retAfter;
		
		// assign spy
		spyFn({
			ctx: null,
			fnName: 'validateCreditCard',
			before: function(arg) {
				retBefore = arg;
				return arg;
			},
			after: function(isValid, arg) {
				retResult = isValid;
				if (isValid) {
					retAfter = arg[0];
				}
			}
		});

		// call original function
		validateCreditCard(12345678);

		expect(retBefore[0]).toEqual(12345678);
		expect(retResult).toEqual(true);
		expect(retAfter).toEqual(12345678);

	});

	// test spy on an object's method
	it("should spy on obj.method before and after", function() {
		var retBefore,
			retResult,
			retAfter;
		
		// assign spy
		spyFn({
			ctx: obj,
			fnName: 'method',
			before: function(arg) {
				retBefore = arg;
				return arg;
			},
			after: function(ret, arg) {
				retResult = ret;
				retAfter = arg;
			}
		});

		// call original function
		obj.method('world');

		expect(retBefore).toEqual(['world']);
		expect(retResult).toEqual('hello world');
		expect(retAfter[0]).toEqual('world');

	});

	// test spy on child object's method
	it("should spy on obj.childObj.method before overwrite arguments", function() {
		var retBefore,
			retResult,
			retAfter;
		
		// assign spy
		spyFn({
			ctx: obj.childObj,
			fnName: 'method',
			before: function(arg) {
				arg = ['overwrited'];
				retBefore = arg;
				return arg;
			},
			after: function(ret, arg) {
				retResult = ret;
				retAfter = arg;
			}
		});

		// call original function
		obj.childObj.method('spy');

		expect(retBefore).toEqual(['overwrited']);
		expect(retResult).toEqual('childObj said hello overwrited');
		expect(retAfter[0]).toEqual('overwrited');

	});

});

