import initialState from './index'
export {SET_THEME} from '../actions/themeAction'

const themeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            };
        default:
            return state;
    }
   
}

export default themeReducer