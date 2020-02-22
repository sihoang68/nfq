import { all } from 'redux-saga/effects';
import getArticlesData from '../containers/Search/saga';

export default function* rootSaga() {
    yield all([
        getArticlesData(),
    ]);
}