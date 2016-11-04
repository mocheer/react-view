import React from 'react';
import ReactDOM from 'react-dom';
//component
import AdvancedDataTable from './components/AdvancedDataTable';
import DataList from './components/DataList';
import ComboBox from './components/ComboBox';
import Pagination from './components/Pagination';
//container
import Panel from './containers/Panel';
//
import { actions } from './ReactActions';
import { stores } from './ReactStores';
//
import { setGlobal } from './utilities/Global';

let views = {
    advanceddatatable: AdvancedDataTable,
    datalist: DataList,
    combobox: ComboBox,
    pagination: Pagination,
    panel: Panel
},
    ReactView = {
        actions: actions,
        stores: stores,
        createStores: null,
        createElement: createElement,
        render: render
    }

setGlobal({ ReactView: ReactView });

function createElement(type, target, props) {
    // get the props config
    if (!props) {
        props = {};
    }
    var attributes = target.attributes;//NamedNodeMap  
    var len = attributes.length;
    for (var i = 0, item; i < len; i++) {
        item = attributes[i];
        props[item.name] = item.value;
    }

    if (!type) {
        type = props.type;
    }
    var component = views[type];
    //use the default aciotns and stores
    var actions = ReactView.actions;
    var stores = ReactView.stores;
    var temp;

    if (!props.actions && (temp = actions[type])) {
        props.actions = temp;
    }
    if (!props.store && (temp = stores[type])) {
        props.store = temp;
    }
    //create children Element
    var children = target.children;
    len = children.length;
    if (len > 0) {
        var elements = [];
        for (var j = 0; j < len; j++) {
            elements.push(createElement(null, children[j]))
        }
        return React.createElement(component, props, elements);
    }

    return React.createElement(component, props);
}

function render(target, props) {
    var element = createElement(null, target, props)
    ReactDOM.render(element, target);
}

function autoRender() {
    for (var type in views) {
        var tags = document.getElementsByTagName(type);
        var len = tags.length;
        for (var i = 0, target, element; i < len; i++) {
            target = tags[i];
            element = createElement(type, target)
            ReactDOM.render(element, target);
        }
    }
}