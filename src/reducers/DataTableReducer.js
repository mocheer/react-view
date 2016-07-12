export  function DataTableReducer(state, action){
    switch(action.type){
        case 'loading':
           return state;
        case 'loaded':
           return action.state;
        default:
           return state;
    }
}