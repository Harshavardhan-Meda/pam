import * as types from '../actionTypes/investigations';

const getInvestigations = (filters = {}, isInfiniteScroll = false, offset = 0, limit = 20) => ({
  type: types.GET_INVESTIGATIONS,
  filters: JSON.stringify(filters),
  isInfiniteScroll,
  offset,
  limit
});

const getInvestigationById = (id) => ({ type: types.GET_INVESTIGATION_BY_ID, id });

const getInvestigationsSuccess = (investigations) => ({
  type: types.GET_INVESTIGATIONS_SUCCESS,
  items: investigations.items,
  hasMore: investigations.hasMore,
  offset: investigations.offset,
  newPosts: investigations.newPosts,
  initialOffset: investigations.initialOffset
});

const getInvestigationByIdSuccess = (investigation) => ({
  type: types.GET_INVESTIGATIONS_BY_ID_SUCCESS,
  investigation
});

const setInvestigation = (investigation) => ({
  type: types.SET_INVESTIGATION,
  investigation
});

const getInvestigationsFailure = (error) => ({
  type: types.GET_INVESTIGATIONS_FAILED,
  error
});

const addInvestigationComment = (id, comment) => ({
  type: types.ADD_INVESTIGATIONS_COMMENT,
  id,
  comment
});

const addInvestigationCommentSuccess = (investigation) => ({
  type: types.ADD_INVESTIGATIONS_COMMENT_SUCCESS,
  investigation
});

const addInvestigationCommentFailed = (error) => ({
  type: types.ADD_INVESTIGATIONS_COMMENT_FAILED,
  error
});

export {
  getInvestigations,
  getInvestigationById,
  getInvestigationByIdSuccess,
  setInvestigation,
  getInvestigationsSuccess,
  getInvestigationsFailure,
  addInvestigationComment,
  addInvestigationCommentSuccess,
  addInvestigationCommentFailed
};
