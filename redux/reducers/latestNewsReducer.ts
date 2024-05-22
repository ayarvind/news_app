import initialState from './index';
import { SET_LATEST_NEWS } from '../actions/latestNewsAction';

const latestNewsReducer = (state = initialState, action: { type: any; payload: { category: any; news: any; }; }) => {
    switch (action.type) {
        case SET_LATEST_NEWS:
            const { category, news } = action.payload;
            const existingCategory = state.latestNews.find(item => item.category === category);

            if (existingCategory) {
                return {
                    ...state,
                    latestNews: state.latestNews.map(item =>
                        item.category === category
                            ? { ...item, news }
                            : item
                    )
                };
            } else {
                return {
                    ...state,
                    latestNews: [
                        ...state.latestNews,
                        {
                            category,
                            news
                        }
                    ]
                };
            }
        default:
            return state;
    }
};

export default latestNewsReducer;
