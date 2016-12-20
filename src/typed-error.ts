/// <reference path='ext.d.ts'/>
class BaseError {
	constructor() {
		Error.apply(this, arguments)
	}
}
BaseError.prototype = Object.create(Error.prototype)

let getStackTrace: (e: TypedError, err: Error | string) => void
if (Error.captureStackTrace != null) {
	const captureStackTrace = Error.captureStackTrace
	getStackTrace = (e) => {
		captureStackTrace(e, e.constructor)
	}
} else {
	getStackTrace = (e, err) => {
		if (!(err instanceof Error)) {
			err = new Error(err)
		}
		if (err.stack != null) {
			e.stack = err.stack
		}
	}
}

class TypedError extends BaseError {
	public name: string
	public message: string
	public stack: string
	constructor(err: Error | string = '') {
		super()
		if (err instanceof Error) {
			this.message = err.message
		} else {
			this.message = err
		}
		this.name = this.constructor.name
		getStackTrace(this, err)
	}
}

export = TypedError
