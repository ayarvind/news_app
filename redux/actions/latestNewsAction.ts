export const SET_LATEST_NEWS = 'SET_LATEST_NEWS';

export const setLatestNews = (category:string, news:any) => {
    return {
        type: SET_LATEST_NEWS,
        payload: {
            category,
            news
        }
    };
};
