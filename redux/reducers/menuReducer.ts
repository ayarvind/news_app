import initialState from './index'
export {SET_MENU} from '../actions/menuAction'

const menuReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_MENU':
            
            return {
                ...state,
                menu: action.payload
            };
        default:
            return state;
    }
}

export default menuReducer