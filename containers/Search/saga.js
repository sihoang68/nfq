import { put, takeLatest } from 'redux-saga/effects';

const getArticlesAPI = async ({keyword}) => {
  const result = await fetch(`https://images-api.nasa.gov/search?q=${keyword}`);
  return await result.json();
}

function* getArticles(keyword) {
  try {
    const response = yield getArticlesAPI(keyword);
    yield put({ type: "GET_ARTICLES_SUCCESS", response });
  } catch(error) {
    yield put({ type: 'GET_ARTICLES_ERROR', error });
  }
  
}
 
export default function* getArticlesData(keyword) {
  yield takeLatest('GET_ARTICLES', getArticles)
}

