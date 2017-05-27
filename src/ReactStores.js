import {createStore} from 'redux'
import {DataTableReducer} from "./reducers/DataTableReducer";
//
const DataTableStore = createStore(DataTableReducer);

export var stores = {
    datatable:DataTableStore
};

