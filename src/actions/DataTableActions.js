export const LOADED = 'loaded';
export const LOADING = 'loading';

export function loadingAction(url,store){
    $.getJSON(url,function(result){
        var newState;
        if(result.constructor==Array)
        {
            newState = {dataProvider:result}
        }else
        {
            newState = {
                columns:result.columns,
                dataProvider:result.dataProvider
            }  
        }
        store.dispatch(loadedAction(newState));
    });
    return {type:LOADING}
}

export function loadedAction(state){
    return {type:LOADED,state:state}
}