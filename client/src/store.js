import { createStore } from 'redux';
import slotReducer from './reducers/slotReducer';

const store = createStore(slotReducer);
export default store;