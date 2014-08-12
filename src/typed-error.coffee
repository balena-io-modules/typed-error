((root, factory) ->
	if typeof define is 'function' and define.amd
		# AMD. Register as an anonymous module.
		define ->
			return (root.TypedError = factory())
	else if typeof exports is 'object'
		# Node. Does not work with strict CommonJS, but
		# only CommonJS-like enviroments that support module.exports,
		# like Node.
		module.exports = factory()
	else
		# Browser globals
		root.TypedError = factory()
) @, ->
	class TypedError extends Error
		constructor: (message) ->
			if message instanceof Error
				err = message
			else
				err = new Error(message)
			err.name = @constructor.name
			@name = err.name
			@message = err.message
			if Error.captureStackTrace?
				Error.captureStackTrace(@, @constructor)
			else if err.stack?
				@stack = err.stack


	return TypedError
