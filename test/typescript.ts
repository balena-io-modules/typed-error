import * as Bluebird from 'bluebird';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import { TypedError } from '../lib/typed-error';

class MyError extends TypedError {}

describe('typescript', () => {
	describe('Standard try/catch', () => {
		it('instanceof', () => {
			let e: Error;
			try {
				throw new MyError();
			} catch (err) {
				e = err;
			}

			expect(e).to.be.an.instanceof(MyError);
		});

		it('name', () => {
			let e: Error;
			try {
				throw new MyError();
			} catch (err) {
				e = err;
			}

			expect(e).to.have.property('name', 'MyError');
		});

		it('constructor.name', () => {
			let e: Error;
			try {
				throw new MyError();
			} catch (err) {
				e = err;
			}

			expect(e)
				.to.have.property('constructor')
				.that.has.property('name', 'MyError');
		});
	});

	describe('Bluebird try/catch', () => {
		it('instanceof', async () => {
			await expect(
				Bluebird.try(() => {
					throw new MyError();
				})
					.return(false)
					.catch(MyError, () => true)
					.catch(() => false),
			).to.eventually.equal(true);
		});

		it('name', async () => {
			const MyErrorName = (e: Error) => e.name === 'MyError';
			await expect(
				Bluebird.try(() => {
					throw new MyError();
				})
					.return(false)
					.catch(MyErrorName, () => true)
					.catch(() => false),
			).to.eventually.equal(true);
		});

		it('constructor.name', async () => {
			const MyErrorConstructorName = (e: Error) =>
				e.constructor.name === 'MyError';
			await expect(
				Bluebird.try(() => {
					throw new MyError();
				})
					.return(false)
					.catch(MyErrorConstructorName, () => true)
					.catch(() => false),
			).to.eventually.equal(true);
		});
	});
});
