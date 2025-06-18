import { combineReducers } from 'redux';

// project import
import auth from './authSlice';

const reducers = combineReducers({
    auth,
});

export default reducers;
