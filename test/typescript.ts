/// <reference types="mocha" />
/// <reference types="node" />
/// <reference path='../src/ext.d.ts'/>
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const { expect } = chai

import TypedError = require('../src/typed-error')
import * as Promise from 'bluebird'

class MyError extends TypedError {}

describe('typescript', () => {
	describe('Standard try/catch', () => {
		it('instanceof', () => {
			let e: Error
			try {
				throw new MyError()
			} catch(err) {
				e = err
			}

			expect(e).to.be.an.instanceof(MyError)
		})

		it('name', () => {
			let e: Error
			try {
				throw new MyError()
			} catch(err) {
				e = err
			}

			expect(e).to.have.a.property('name', 'MyError')
		})

		it('constructor.name', () => {
			let e: Error
			try {
				throw new MyError()
			} catch(err) {
				e = err
			}

			expect(e).to.have.nested.property('constructor.name', 'MyError')
		})
	})

	describe('Bluebird try/catch', () => {
		it('instanceof', () => {
			expect(
				Promise.try(() => {
					throw new MyError()
				})
				.return(false)
				.catch(MyError, () => true)
				.catch(() => false)
			).to.eventually.equal(true)
		})

		it('name', () => {
			const MyErrorName = (e: Error) => e.name === 'MyError'
			expect(
				Promise.try(() => {
					throw new MyError()
				})
				.return(false)
				.catch(MyErrorName, () => true)
				.catch(() => false)
			).to.eventually.equal(true)
		})

		it('constructor.name', () => {
			const MyErrorConstructorName = (e: Error) => e.constructor.name === 'MyError'
			expect(
				Promise.try(() => {
					throw new MyError()
				})
				.return(false)
				.catch(MyErrorConstructorName, () => true)
				.catch(() => false)
			).to.eventually.equal(true)
		})
	})
})
