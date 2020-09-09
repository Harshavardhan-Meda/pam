import React, { Component } from 'react';
import { OverflowMenu, OverflowMenuItem, Loading } from 'carbon-components-react';
import PropTypes from 'prop-types';
import exportFromJSON from 'export-from-json';
import { connect } from 'react-redux';
import './export-menu.scss';
import moment from 'moment';
import _ from 'lodash';
import { getDataToExport } from '../../../actions/exportFeature';
import { ReactComponent as Export } from '../../../assets/common/export.svg';

export class ExportMenu extends Component {
  getDataToExport(filters, exportType, isDetailsExport, streamType) {
    const { leaf } = this.props;
    const defaultFilter = {
      priority: [],
      status: [],
      timeframe: {
        start: moment().subtract(1, 'week').format(),
        type: 'LAST_7D'
      }
    };
    if (isDetailsExport === 'header') {
      const { id, lastUpdate, priority, status, title, subtitle, devices, type, worklog, description } = leaf;
      const data = [];
      const dataExportedDate = moment().format('DD-MM-YYYY HH:mm');
      const deviceList = devices.map((device) => device.name);
      const exportDataHeader = {
        StreamType: type,
        Title: `${title}-${subtitle}`,
        ID: id,
        Description: description,
        Devices: !deviceList.length ? 'no devices' : deviceList.join(','),
        Status: status,
        LastUpdate: lastUpdate,
        ...(priority && { Priority: priority })
      };

      const dataToExport = worklog.map((value) => ({
        User: value.user,
        Last_Update: value.lastUpdate,
        Comments: value.text
      }));
      data.push(exportDataHeader, ...dataToExport);
      const filenameFormat = dataExportedDate;
      const fileName = `${type} ${filenameFormat}`;
      exportFromJSON({ data, fileName, exportType });
    } else {
      const isFilterSet = _.isEmpty(filters.priority) && _.isEmpty(filters.status) && _.isEmpty(filters.timeframe);

      const { getListToExport } = this.props;

      let displayDefaultExportDataHeader = false;
      if (isFilterSet) {
        getListToExport(defaultFilter, exportType, (displayDefaultExportDataHeader = true), streamType);
      } else {
        getListToExport(filters, exportType, displayDefaultExportDataHeader, streamType);
      }
    }
  }

  render() {
    const { isFetchingExportData, filters, isDetailsExport, streamType } = this.props;
    return (
      <div className="export-icon-container ">
        {isFetchingExportData ? (
          <Loading className="spinner-export" withOverlay={false} data-cy="exportButtonSpinner" />
        ) : (
          <>
            <OverflowMenu
              ariaLabel="ariaLabel"
              direction="bottom"
              data-cy="exportButton"
              flipped
              renderIcon={() => (
                <Export className={isDetailsExport === 'header' ? 'export-icon-header' : 'export-icon'} />
              )}
            >
              <OverflowMenuItem
                className="className"
                data-cy="exportCSV"
                hasDivider
                itemText="Export to CSV"
                onClick={() => this.getDataToExport(filters, 'csv', isDetailsExport, streamType)}
              />
              <OverflowMenuItem
                className="className"
                data-cy="exportXLS"
                hasDivider
                itemText="Export to Excel"
                onClick={() => this.getDataToExport(filters, 'xls', isDetailsExport, streamType)}
              />
            </OverflowMenu>
          </>
        )}
        {isDetailsExport === 'header' && <div className="export-label">Export</div>}
      </div>
    );
  }
}

ExportMenu.propTypes = {
  isDetailsExport: PropTypes.string.isRequired,
  isFetchingExportData: PropTypes.bool.isRequired,
  filters: PropTypes.shape({
    priority: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    timeframe: PropTypes.shape({ start: PropTypes.string })
  }).isRequired,
  leaf: PropTypes.shape({
    id: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    description: PropTypes.string,
    worklog: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.string.isRequired,
        lastUpdate: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    ),
    type: PropTypes.string.isRequired,
    devices: PropTypes.arrayOf(PropTypes.shape({ length: PropTypes.number }))
  }).isRequired,
  getListToExport: PropTypes.func.isRequired,
  streamType: PropTypes.string.isRequired
};
const mapStateToProps = (state, ownProps) => ({
  filters: state.filters[`${ownProps.streamType}`],
  isFetchingExportData: state.exportFeature.isFetchingExportData
});

const mapDispatchToProps = (dispatch) => {
  return {
    getListToExport: (defaultFilter, exportType, displayDefaultExportDataHeader, exportStream) => {
      dispatch(getDataToExport(defaultFilter, exportType, displayDefaultExportDataHeader, exportStream));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportMenu);
