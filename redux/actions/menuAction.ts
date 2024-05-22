export const SET_MENU = 'SET_MENU';
export default function setMenu(menu: string) {
    return {
        type: SET_MENU,
        menu
    };
}