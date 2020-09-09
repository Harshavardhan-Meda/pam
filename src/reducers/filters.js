import _ from 'lodash';
import moment from 'moment';
import { RESET_FILTERS, SET_FILTERS, TOGGLE_FILTER_VALUE, TOGGLE_FILTERS } from '../actionTypes/filters';
import InvestigationFilterSchema from '../components/stream/investigationStream/filterSchema';
import SecurityFilterSchema from '../components/stream/securityStream/filterSchema';

export const initialState = {
  investigation: {
    priority: [],
    status: [],
    timeframe: {}
  },
  request: {
    status: [],
    timeframe: {}
  },
  security: { type: [], interest: [] },
  isOpen: {
    investigation: false,
    request: false,
    security: false
  }
};

const validFiltersKeys = {
  security: SecurityFilterSchema.map((filter) => filter.name),
  investigation: InvestigationFilterSchema.map((filter) => filter.name),
  request: InvestigationFilterSchema.map((filter) => filter.name)
};

const validFiltersValues = {
  security: SecurityFilterSchema,
  investigation: InvestigationFilterSchema,
  request: InvestigationFilterSchema
};

function validateFiltersValues(action, filterWithValidKeys) {
  validFiltersValues[action.streamType].forEach((filter) => {
    for (const key in filterWithValidKeys) {
      if (filter.name === key && filter.name !== 'timeframe') {
        filterWithValidKeys[key] = _.castArray(filterWithValidKeys[key]).filter((filterValue) =>
          Object.keys(filter.values).includes(filterValue)
        );
      } else if (filter.name === key && !Object.keys(filter.values).includes(filterWithValidKeys[key].type)) {
        delete filterWithValidKeys[key];
      }
    }
  });
  return filterWithValidKeys || {};
}

function filterIncluded(state, action) {
  return state[action.streamType][action.key].includes(action.value);
}

/**
 * TODO Remove this function after bug below is fixed.
 * It makes sure that the "type" filter in Security Stream filters is always an array.
 * The bug is that when the type value is a string, it gets rejected by swagger validation.
 * Fixing the bug requires either using OpenAPI 3.0 "oneOf" in API spec or moving away from
 * validating types in swagger and just accepting and parsing a string
 * The bug happens when you paste an URL with only one type filter
 * e.g.: /stream?type=assessment
 * @see https://jira.sec.ibm.com/browse/HORIZON-1920
 * @param action
 */
function castSecurityTypeFilter(action) {
  if (action.streamType === 'security' && _.isString(action.values.type)) {
    action.values.type = _.castArray(action.values.type);
  }
}

function validFilters(state, action) {
  castSecurityTypeFilter(action);
  return validateFiltersValues(action, _.pick(action.values, validFiltersKeys[action.streamType]));
}

function removeFilter(state, action) {
  return {
    ...state,
    [action.streamType]: {
      ...state[action.streamType],
      [action.key]: _.without(state[action.streamType][action.key], action.value)
    }
  };
}

function insertFilter(state, action) {
  return {
    ...state,
    [action.streamType]: {
      ...state[action.streamType],
      [action.key]: [...state[action.streamType][action.key], action.value]
    }
  };
}

const selectOptions = {
  timeframe: {
    LAST_24H: {
      start: moment()
        .subtract(1, 'days')
        .format(),
      type: 'LAST_24H'
    },
    LAST_7D: {
      start: moment()
        .subtract(1, 'week')
        .format(),
      type: 'LAST_7D'
    },
    LAST_3M: {
      start: moment()
        .subtract(3, 'months')
        .format(),
      type: 'LAST_3M'
    }
  }
};

const toggleMultiSelectFilter = (state, action) => {
  if (!_.isArray(state[action.streamType][action.key])) {
    return state;
  }
  return filterIncluded(state, action) ? removeFilter(state, action) : insertFilter(state, action);
};

const toggleSingleSelectFilter = (state, action) => {
  const currentFilter = state[action.streamType][action.key];
  const alreadySelected =
    action.key === 'timeframe' ? currentFilter.type === action.value : currentFilter === action.value;
  const newFilterVaule = alreadySelected
    ? {}
    : selectOptions[action.key][action.value] || initialState[action.streamType][action.key];
  return {
    ...state,
    [action.streamType]: {
      ...state[action.streamType],
      [action.key]: newFilterVaule
    }
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER_VALUE:
      return action.multiselect ? toggleMultiSelectFilter(state, action) : toggleSingleSelectFilter(state, action);
    case RESET_FILTERS:
      return {
        ...state,
        [action.streamType]: initialState[action.streamType]
      };
    case TOGGLE_FILTERS:
      return {
        ...state,
        isOpen: {
          ...state.isOpen,
          [action.streamType]: !state.isOpen[action.streamType]
        }
      };
    case SET_FILTERS:
      return {
        ...state,
        [action.streamType]: {
          ...state[action.streamType],
          ...validFilters(state, action)
        }
      };
    default:
      return { ...state };
  }
};

export default reducer;
