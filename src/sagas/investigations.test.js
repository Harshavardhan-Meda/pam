import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import {
  getInvestigationById as byId,
  getInvestigationByIdSuccess,
  getInvestigationsFailure,
  getInvestigationsSuccess,
  addInvestigationComment as byIdComment,
  addInvestigationCommentSuccess,
  addInvestigationCommentFailed
} from '../actions/investigations';
import {
  getInvestigationById,
  getInvestigationByIdSaga,
  getInvestigations,
  getInvestigationSaga,
  addCommentById,
  addInvestigationCommentByIdSaga
} from './investigations';

const invs = require('../mocks/investigationsMockData');

describe('investigations saga', () => {
  describe('getInvestigationSaga', () => {
    let generator;
    const error = 'error';
    const input = { filters: { priority: ['medium'], status: [], timeframe: {} }, offset: 0, limit: 20 };
    const returnData = {
      isFetching: false,
      items: invs,
      hasMore: true,
      offset: 0,
      newPosts: false,
      initialOffset: 0
      };

    it('tests the api call', async () => {
      fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { input } }), 100)));
      const response = await getInvestigations();
      await fetch(response.url);
      expect(fetch).toBeCalledWith(response.url);
      expect(response.status).toEqual(200);
      expect(response.statusText).toEqual('OK');
    });

    it('handles success', () => {
      generator = getInvestigationSaga(input);
      expect(generator.next().value).toEqual(call(getInvestigations, input));
      expect(generator.next({ body: returnData }).value).toEqual(put(getInvestigationsSuccess(returnData)));
    });

    it('handles failure', () => {
      generator = cloneableGenerator(getInvestigationSaga)(input);
      expect(generator.next().value).toEqual(call(getInvestigations, input));
      expect(generator.throw(error).value).toEqual(put(getInvestigationsFailure(error)));
    });
  });

  describe('getInvestigationByIdSaga', () => {
    const inv = invs[0];
    let generator;
    const error = 'error';

    it('tests the api call', async () => {
      fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { inv } }), 100)));
      const response = await getInvestigationById(inv.id);
      await fetch(response.url);
      expect(fetch).toBeCalledWith(response.url);
      expect(response.status).toEqual(200);
      expect(response.statusText).toEqual('OK');
    });

    it('handles success', () => {
      generator = cloneableGenerator(getInvestigationByIdSaga)(byId(inv.id));
      expect(generator.next().value).toEqual(call(getInvestigationById, inv.id));
      expect(generator.next({ body: inv }).value).toEqual(put(getInvestigationByIdSuccess(inv)));
    });

    it('handles failure', () => {
      generator = cloneableGenerator(getInvestigationByIdSaga)(byId(inv.id));
      expect(generator.next().value).toEqual(call(getInvestigationById, inv.id));
      expect(generator.throw(error).value).toEqual(put(getInvestigationsFailure(error)));
    });
  });

  describe('addCommentById', () => {
    const inv = invs[0];
    const comment = inv.worklog[0].text;
    let generator;
    const error = 'error';

    it('tests the api call', async () => {
      fetch.mockResponseOnce(() => new Promise((resolve) => setTimeout(() => resolve({ body: { inv } }), 100)));
      const response = await addCommentById(inv.id, { requestBody: { text: comment } });
      await fetch(response.url);
      expect(fetch).toBeCalledWith(response.url);
      expect(response.status).toEqual(200);
      expect(response.statusText).toEqual('OK');
    });

    it('handles success', () => {
      generator = cloneableGenerator(addInvestigationCommentByIdSaga)(byIdComment(inv.id, comment));
      expect(generator.next().value).toEqual(call(addCommentById, inv.id, comment));
      expect(generator.next({ body: inv }).value).toEqual(put(addInvestigationCommentSuccess(inv)));
    });

    it('handles failure', () => {
      generator = cloneableGenerator(addInvestigationCommentByIdSaga)(byIdComment(inv.id, comment));
      expect(generator.next().value).toEqual(call(addCommentById, inv.id, comment));
      expect(generator.throw(error).value).toEqual(put(addInvestigationCommentFailed(error)));
    });
  });
});
