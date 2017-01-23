import Api from '../network';

const _ACTIONS = [
  'ARTICLES_LOADING',
  'ARTICLES_LOADED',
  'ARTICLES_LOAD_ERROR'
];

const ACTIONS = {};

_ACTIONS.forEach(action => ACTIONS[action] = action);

const INITIAL_STATE = {
  articles: [],
  settings: {},
  loading: false,
  loaded: false,
};

export const toggleLoading = () => ({
  type: ACTIONS.ARTICLES_LOADING,
});

export const articlesLoaded = (articles) => ({
  type: ACTIONS.ARTICLES_LOADED,
  articles,
});

export const articlesLoadError = () => ({
  type: ACTIONS.ARTICLES_LOAD_ERROR,
});

export const startLoadingArticles = () => {
  return (dispatch, getState) => {
    const { home } = getState();
    if (home.loading) {
      return;
    }
    dispatch(toggleLoading());
    Api.get('/articles')
      .then(resp => {
        dispatch(articlesLoaded(resp.data.result));
      })
      .catch(err => {
        console.log(err);
        dispatch(articlesLoadError());
      });
  };
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case ACTIONS.ARTICLES_LOADING:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });
    case ACTIONS.ARTICLES_LOADED:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        articles: action.articles,
      });
    case ACTIONS.ARTICLES_LOAD_ERROR:
      return Object.assign({}, state, {
        loading: false,
        loaded: false
      });
    default:
      return state;
  }
};
