'use strict';

import { shallow } from 'enzyme';
import React from 'react';
import filtersMocks from '../../../mocks/filtersMockData';
import { ExportMenu } from './ExportMenu';

describe('<ExportMenu />', () => {
  const component = (filters, isFetchingExportData, isDetailsExport) =>
    shallow(
      <ExportMenu filters={{ filters }} isFetchingExportData={isFetchingExportData} isDetailsExport={isDetailsExport} />
    );

  it('renders', () => {
    expect(component(filtersMocks, true, false).exists()).toBe(true);
  });

  it('displays loading spinner when data is fetching', () => {
    expect(component(filtersMocks, true, '').find('Loading').exists()).toBe(true);
  });

  it('does not display loading spinner after data is fetched', () => {
    expect(component(filtersMocks, false, '').find('Loading').exists()).toBe(false);
  });

  it('displays Export label when in investigation details page', () => {
    expect(component(filtersMocks, false, 'header').find('.export-label').exists()).toBe(true);
  });
  it('does not displays Export label when in investigation list page', () => {
    expect(component(filtersMocks, false, '').find('Loading').exists()).toBe(false);
  });

  it('renders first menu item label as Export to CSV', () => {
    expect(component(filtersMocks, false, '').find('OverflowMenuItem').at(0).prop('itemText')).toBe('Export to CSV');
  });

  it('renders second menu item label as Export to Excel', () => {
    expect(component(filtersMocks, false, '').find('OverflowMenuItem').at(1).prop('itemText')).toBe('Export to Excel');
  });
});
