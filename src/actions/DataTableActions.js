export const LOADED = 'loaded';
export const LOADING = 'loading';
// redux flux
export function loadingAction(url,store){
    $.getJSON(url,function(result){
        var newState;
        if(result.constructor==Array)
        {
            newState = {dataProvider:result}
        }else
        {
            newState = {};
            var {columns,dataProvider} = result;
            if(columns!==undefined){
                newState.columns = columns;
            }
            if(dataProvider!==undefined){
                newState.dataProvider = dataProvider;
            }
        }
        store.dispatch(loadedAction(newState));
    });
    return {type:LOADING}
}

export function loadedAction(state){
    return {type:LOADED,state:state}
}