chai = require 'chai'
chaiAsPromised = require 'chai-as-promised'

chai.use(chaiAsPromised)
{expect} = chai

TypedError = require '../src/typed-error'
Promise = require 'bluebird'

class MyError extends TypedError

describe 'Standard try/catch', ->
	it 'instanceof', ->
		try
			throw new MyError()
		catch e

		expect(e).to.be.an.instanceof MyError

	it 'name', ->
		try
			throw new MyError()
		catch e

		expect(e).to.have.a.property('name', 'MyError')

	it 'constructor.name', ->
		try
			throw new MyError()
		catch e

		expect(e).to.have.deep.property('constructor.name', 'MyError')

describe 'Bluebird try/catch', ->
	it 'instanceof', ->
		expect(
			Promise.try ->
				throw new MyError()
			.then ->
				return false
			.catch MyError, ->
				return true
			.catch ->
				return false
		).to.eventually.equal true

	it 'name', ->
		MyErrorName = (e) -> e.name is 'MyError'
		expect(
			Promise.try ->
				throw new MyError()
			.then ->
				return false
			.catch MyErrorName, ->
				return true
			.catch ->
				return false
		).to.eventually.equal true

	it 'constructor.name', ->
		MyErrorConstructorName = (e) -> e.constructor.name is 'MyError'
		expect(
			Promise.try ->
				throw new MyError()
			.then ->
				return false
			.catch MyErrorConstructorName, ->
				return true
			.catch ->
				return false
		).to.eventually.equal true
