import { call, put } from 'redux-saga/effects';
import { getInvestigations, getDataToExportSaga } from './exportFeature';
import { getDataToExportSuccess } from '../actions/exportFeature';

const invs = require('../mocks/investigationsMockData');

describe('investigations saga', () => {
  let generator;
  const input = { filters: { priority: ['medium'], status: [], timeframe: {} }, offset: 0, limit: 20 };

  const returnData = {
    isFetching: false,
    items: invs,
    hasMore: true,
    offset: 0,
    newPosts: false,
    initialOffset: 0
  };

  it('handles success', () => {
    generator = getDataToExportSaga(input);
    expect(generator.next().value).toEqual(call(getInvestigations, input));
    expect(generator.next({ body: returnData }).value).toEqual(put(getDataToExportSuccess(returnData)));
  });
});
