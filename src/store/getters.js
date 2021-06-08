export default {
    currentSystem(state){
        if(!state.currentSystem){
            let json = window.sessionStorage.getItem('currentSystem');
            state.currentSystem = json && JSON.parse(json);
        }
        return state.currentSystem
    }
}