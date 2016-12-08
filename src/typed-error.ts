class BaseError {
	constructor() {
		Error.apply(this, arguments)
	}
}
BaseError.prototype = Object.create(Error.prototype)

export = class TypedError extends BaseError {
	public name: string
	public message: string
	public stack: string
	constructor(err: Error | string = '') {
		super()
		if (!(err instanceof Error)) {
			err = new Error(err)
		}
		err.name = (this.constructor as any).name
		this.name = err.name
		this.message = err.message
		if (Error.captureStackTrace != null) {
			Error.captureStackTrace(this, this.constructor)
		} else if (err.stack != null) {
			this.stack = err.stack
		}
	}
}
