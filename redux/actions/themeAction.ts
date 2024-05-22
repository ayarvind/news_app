export const SET_THEME = 'SET_THEME';
export default function setMenu(theme: string) {
    return {
        type: SET_THEME,
        theme
    };
}