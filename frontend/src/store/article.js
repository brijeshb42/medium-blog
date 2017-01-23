import Api from '../network';

const _ACTIONS = [
  'ARTICLE_LOADING',
  'ARTICLE_LOADED',
  'ARTICLE_LOAD_ERROR',
  'ARTICLE_CHANGE_TITLE',
  'ARTICLE_CHANGE_SUMMARY',
  'ARTICLE_CHANGE_CONTENT',
  'ARTICLE_RESET',
];

const ACTIONS = {};

_ACTIONS.forEach(action => ACTIONS[action] = action);

const INITIAL_STATE = {
  article: {
    id: -1,
    title: '',
    summary: '',
    content: {},
  },
  loading: false,
  loaded: false,
};

export const toggleLoading = () => ({
  type: ACTIONS.ARTICLE_LOADING,
});

export const articleLoaded = (article) => ({
  type: ACTIONS.ARTICLE_LOADED,
  article,
});

export const articleLoadError = () => ({
  type: ACTIONS.ARTICLE_LOAD_ERROR,
});

export const articleChangeTitle = (title) => ({
  type: ACTIONS.ARTICLE_CHANGE_TITLE,
  title,
});

export const articleChangeSummary = (summary) => ({
  type: ACTIONS.ARTICLE_CHANGE_SUMMARY,
  summary,
});

export const articleChangeContent = (content) => ({
  type: ACTIONS.ARTICLE_CHANGE_CONTENT,
  content,
});

export const articleReset = () => ({
  type: ACTIONS.ARTICLE_RESET,
});

export const startLoadingArticle = (id) => {
  return (dispatch, getState) => {
    const { article } = getState();
    if (article.loading) {
      return;
    }
    dispatch(toggleLoading());
    Api.get(`/articles/${id}`)
      .then(resp => {
        dispatch(articleLoaded(resp.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(articleLoadError());
      });
  };
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case ACTIONS.ARTICLE_LOADING:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });
    case ACTIONS.ARTICLE_LOADED:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        article: action.article,
      });
    case ACTIONS.ARTICLE_LOAD_ERROR:
      return Object.assign({}, state, {
        loading: false,
        loaded: false
      });
    case ACTIONS.ARTICLE_CHANGE_TITLE:
      return Object.assign({}, state, {
        article: Object.assign({}, state.article, {
          title: action.title,
        }),
      });
    case ACTIONS.ARTICLE_CHANGE_SUMMARY:
      return Object.assign({}, state, {
        article: Object.assign({}, state.article, {
          summary: action.summary,
        }),
      });
    case ACTIONS.ARTICLE_CHANGE_CONTENT:
      return Object.assign({}, state, {
        article: Object.assign({}, state.article, {
          content: action.content,
        }),
      });
    case ACTIONS.ARTICLE_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};
