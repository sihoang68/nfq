export const getArticles = (keyword ='') => ({
    type: 'GET_ARTICLES',
    keyword
});

export const getArticlesSuccess = response => ({
    type: 'GET_ARTICLES_SUCCESS',
    response
});

export const getArticlesError = error => ({
    type: 'GET_ARTICLES_ERROR',
    error
});