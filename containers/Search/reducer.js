const initialState = {
    loading: false,
    articles: [],
    collections: [],
    error: null
  };
  
export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ARTICLES':
            return { ...state };
        case 'GET_ARTICLES_SUCCESS':
            return { ...state, articles: action.response.collection.items }
        case 'GET_ARTICLES_ERROR':
            return { ...state, error: action.error }
        default:
            return state;
    }
};