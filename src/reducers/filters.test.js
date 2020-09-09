import moment from 'moment';
import { resetFilters, setFilters, toggleFilters, toggleFilterValue } from '../actions/filters';
import reducer, { initialState } from './filters';

describe('filters reducer', () => {
  describe('general', () => {
    it('returns the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  });

  const streamType = 'investigation';

  describe('TOGGLE_FILTER_VALUE multiselect=true', () => {
    it('adds selected filter value to initial state', () => {
      expect(
        reducer(initialState, toggleFilterValue(streamType, 'priority', 'high', true))[streamType].priority
      ).toContain('high');
    });

    it('removes selected filter value from state', () => {
      expect(
        reducer({ investigation: { priority: ['high'] } }, toggleFilterValue(streamType, 'priority', 'high', true))[
          streamType
        ].priority
      ).not.toContain('high');
    });

    it('preserves data in state when changing other value', () => {
      expect(
        reducer(
          { investigation: { priority: ['high', 'medium', 'low'] } },
          toggleFilterValue(streamType, 'priority', 'high', true)
        )[streamType].priority
      ).toEqual(['medium', 'low']);
    });

    it('returns original state when key is invalid', () => {
      expect(reducer(initialState, toggleFilterValue(streamType, 'invalid', 'foo', true))).toEqual(initialState);
    });

    it('returns original state when referenced key is not an array', () => {
      expect(reducer(initialState, toggleFilterValue(streamType, 'timeframe', 'high', true))).toEqual(initialState);
    });
  });

  describe('TOGGLE_FILTER_VALUE multiselect=false', () => {
    describe('timeframe', () => {
      it('LAST_24H', () => {
        expect(
          reducer(initialState, toggleFilterValue(streamType, 'timeframe', 'LAST_24H', false))[streamType].timeframe
        ).toEqual({
          start: moment().subtract(1, 'days').format(),
          type: 'LAST_24H'
        });
      });

      it('LAST_7D', () => {
        expect(
          reducer(initialState, toggleFilterValue(streamType, 'timeframe', 'LAST_7D', false))[streamType].timeframe
        ).toEqual({
          start: moment().subtract(1, 'week').format(),
          type: 'LAST_7D'
        });
      });

      it('LAST_3M', () => {
        expect(
          reducer(initialState, toggleFilterValue(streamType, 'timeframe', 'LAST_3M', false))[streamType].timeframe
        ).toEqual({
          start: moment().subtract(3, 'months').format(),
          type: 'LAST_3M'
        });
      });

      it('initial state given invalid value', () => {
        expect(
          reducer(initialState, toggleFilterValue(streamType, 'timeframe', 'invalid', false))[streamType].timeframe
        ).toEqual(initialState[streamType].timeframe);
      });

      it('single select toggle', () => {
        let state = reducer(initialState, toggleFilterValue(streamType, 'timeframe', 'LAST_3M', false));
        state = reducer(state, toggleFilterValue(streamType, 'timeframe', 'LAST_7D', false));

        expect(state[streamType].timeframe).toEqual({
          start: moment().subtract(1, 'week').format(),
          type: 'LAST_7D'
        });
        state = reducer(state, toggleFilterValue(streamType, 'timeframe', 'LAST_7D', false));
        expect(state[streamType].timeframe).toEqual({});
      });
    });
  });

  describe('RESET_FILTERS', () => {
    describe('resets filters to initial state', () => {
      const modState = {
        ...initialState,
        investigation: {
          ...initialState.investigation,
          priority: 'high'
        },
        request: {
          ...initialState.request,
          priority: 'medium'
        },
        security: {
          ...initialState.security,
          type: 'test'
        }
      };

      it('makes sure that reducer doesn not have initialState when given modState', () => {
        expect(reducer(modState, {})).not.toEqual(initialState);
      });

      describe('resets given state to initial state', () => {
        it('investigation', () => {
          expect(reducer(modState, resetFilters('investigation')).investigation).toEqual(initialState.investigation);
        });

        it('request', () => {
          expect(reducer(modState, resetFilters('request')).request).toEqual(initialState.request);
        });

        it('security', () => {
          expect(reducer(modState, resetFilters('security')).security).toEqual(initialState.security);
        });
      });

      describe('preserves state of other properties in store', () => {
        it('investigation', () => {
          const result = reducer(modState, resetFilters('investigation'));
          expect(result.security).toEqual(modState.security);
          expect(result.request).toEqual(modState.request);
        });

        it('request', () => {
          const result = reducer(modState, resetFilters('request'));
          expect(result.security).toEqual(modState.security);
          expect(result.investigation).toEqual(modState.investigation);
        });

        it('security', () => {
          const result = reducer(modState, resetFilters('security'));
          expect(result.investigation).toEqual(modState.investigation);
          expect(result.request).toEqual(modState.request);
        });
      });
    });
  });

  describe('TOGGLE_FILTERS', () => {
    describe('defaults', () => {
      it('defaults investigation filters isOpen state to false', () => {
        expect(reducer(initialState, {}).isOpen.investigation).toEqual(false);
      });

      it('defaults request filters isOpen state to false', () => {
        expect(reducer(initialState, {}).isOpen.request).toEqual(false);
      });

      it('defaults security filters isOpen state to false', () => {
        expect(reducer(initialState, {}).isOpen.security).toEqual(false);
      });
    });

    describe('toggles', () => {
      it('toggles investigation filters isOpen state', () => {
        expect(reducer(initialState, toggleFilters('investigation')).isOpen.investigation).toEqual(true);
      });

      it('toggles request filters isOpen state', () => {
        expect(reducer(initialState, toggleFilters('request')).isOpen.request).toEqual(true);
      });

      it('toggles security filters isOpen state', () => {
        expect(reducer(initialState, toggleFilters('security')).isOpen.security).toEqual(true);
      });
    });
  });

  describe('SET_FILTERS', () => {
    it('adds filters value to initial state', () => {
      expect(reducer(initialState, setFilters(streamType, { priority: ['high'] }))[streamType].priority).toEqual([
        'high'
      ]);
    });

    it('overwrites data in state when setting filters', () => {
      expect(
        reducer({ investigation: { priority: ['medium'] } }, setFilters(streamType, { priority: ['high', 'low'] }))[
          streamType
        ].priority
      ).toEqual(['high', 'low']);
    });

    it('returns original state when values are empty', () => {
      expect(reducer(initialState, setFilters(streamType, {}))).toEqual(initialState);
    });

    it('remove invalid keys', () => {
      expect(
        reducer(initialState, setFilters(streamType, { invalid: ['foo'], priority: ['high'] }))[streamType].priority
      ).toEqual(['high']);
    });

    it('remove invalid values - when there is only one invalid value', () => {
      expect(reducer(initialState, setFilters(streamType, { priority: ['foo'] }))).toEqual(initialState);
    });

    it('remove invalid values - when there is one invalid value and one valid', () => {
      expect(
        reducer(initialState, setFilters(streamType, { priority: ['foo', 'high'] }))[streamType].priority
      ).toEqual(['high']);
    });

    it('remove invalid values - when there is two keys with one invalid value and one valid', () => {
      expect(
        reducer(initialState, setFilters(streamType, { priority: ['foo', 'high'], status: ['new', 'foo'] }))[streamType]
          .status
      ).toEqual(['new']);
    });
  });
});
