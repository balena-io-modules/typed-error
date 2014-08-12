This module allows you to easily extend the built-in Error type for typed error checking

```coffee-script
TypedError = require 'typed-error'

class MyError extends TypedError

try
	throw new MyError()
catch e
	console.log(e instanceof MyError) # true
	console.log(e.name) # 'MyError'
	console.log(e.constructor.name) # 'MyError'
	console.log(e.stack) # <stack trace>

	if e instanceof MyError
		console.log('Do custom handling')
	else
		console.log('Another type of error')

	# Or
	switch e.name
		when 'MyError'
			console.log('Do custom handling')
		else
			console.log('Another type of error')

	# Or
	switch e.constructor.name
		when 'MyError'
			console.log('Do custom handling')
		else
			console.log('Another type of error')
```

And with bluebird:
```coffee-script
Promise = require 'bluebird'
TypedError = require 'typed-error'

class MyError extends TypedError

Promise.try ->
	throw new MyError()
.catch MyError, (e) ->
	console.log('Do custom handling')
.catch ->
	console.log('Another type of error')

# Or
MyErrorName = (e) -> e.name is 'MyError'
Promise.try ->
	throw new MyError()
.catch MyErrorName, (e) ->
	console.log('Do custom handling')
.catch ->
	console.log('Another type of error')
```

# Or
MyErrorConstructorName = (e) -> e.constructor.name is 'MyError'
Promise.try ->
	throw new MyError()
.catch MyErrorConstructorName, (e) ->
	console.log('Do custom handling')
.catch ->
	console.log('Another type of error')
```