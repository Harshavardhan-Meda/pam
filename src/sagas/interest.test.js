import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import {
  getInterestSuccess,
  getInterestFailed,
  setInterestFailed
} from '../actions/interest';
import {
  getInterest,
  getInterestSaga,
  setInterest,
  setInterestSaga
} from './interest';

const intrs = require('../mocks/interestMockData');

describe('interest saga', () => {
  describe('getInterestSaga', () => {
    let generator;
    const error = 'error';
    const input = { leafId: intrs.items[0].leafId };
    const returnData = {
      isFetching: false,
      items: intrs.items
    };

    it('tests the api call', async () => {
      fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { input } }), 100)));
      const response = await getInterest();
      await fetch(response.url);
      expect(fetch).toBeCalledWith(response.url);
      expect(response.status).toEqual(200);
      expect(response.statusText).toEqual('OK');
    });

    it('handles success', () => {
      generator = getInterestSaga(input);
      expect(generator.next().value).toEqual(call(getInterest, input));
      expect(generator.next({ body: returnData }).value).toEqual(put(getInterestSuccess(returnData)));
    });

    it('handles failure', () => {
      generator = cloneableGenerator(getInterestSaga)(input);
      expect(generator.next().value).toEqual(call(getInterest, input));
      expect(generator.throw(error).value).toEqual(put(getInterestFailed(error)));
    });
  });

  describe('getInvestigationByIdSaga', () => {
    const interestObj = intrs.items[0];
    let generator;
    const error = 'error';

    it('tests the api call', async () => {
      fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { interestObj } }), 100)));
      const response = await setInterest();
      await fetch(response.url);
      expect(fetch).toBeCalledWith(response.url);
      expect(response.status).toEqual(200);
      expect(response.statusText).toEqual('OK');
    });

    it('handles success', () => {
      generator = setInterestSaga({ interestObj });
      expect(generator.next().value).toEqual(call(setInterest, interestObj));
      expect(generator.next().value).toEqual(call(getInterest));
      expect(generator.next({ body: interestObj }).value).toEqual(put(getInterestSuccess(interestObj)));
    });

    it('handles failure', () => {
      generator = cloneableGenerator(setInterestSaga)({ interestObj });
      expect(generator.next().value).toEqual(call(setInterest, interestObj));
      expect(generator.throw(error).value).toEqual(put(setInterestFailed(error)));
    });
  });
});
