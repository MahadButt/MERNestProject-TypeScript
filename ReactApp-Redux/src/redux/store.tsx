import { createStore, applyMiddleware,combineReducers } from 'redux'
// import logger from 'redux-logger'
import adminReducer from './reducers/adminReducer'
const thunkMiddleware = require('redux-thunk').default;

const mainReducer=combineReducers({
    admin:adminReducer
})
const store = createStore(mainReducer,applyMiddleware(thunkMiddleware))

export default store;