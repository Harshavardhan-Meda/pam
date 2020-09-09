import { push } from 'react-piwik';
import { initMatomo } from './matomoUtil';

jest.mock('react-piwik');

describe('initMatomo', () => {
  it('should call react-piwik with correct parameters', () => {
    initMatomo({});
    expect(push).toHaveBeenCalledTimes(8);
  });
});
