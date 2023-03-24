import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middelWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middelWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
