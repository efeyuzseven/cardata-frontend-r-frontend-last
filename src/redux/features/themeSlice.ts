// themeSlice.ts
import { createSlice, Middleware } from '@reduxjs/toolkit';


interface ITheme {
    isDarkMode: boolean;
}

const loadState = (): ITheme => {
    try {
        const serializedState = localStorage.getItem('theme');
        if (serializedState === null) {
            return { isDarkMode: false }; // Varsayılan tema ayarı
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading theme state from localStorage:', err);
        return { isDarkMode: false }; // Hata durumunda varsayılan tema ayarı
    }
};

const initialState: ITheme = loadState();

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleLightDarkTheme: state => {
            state.isDarkMode = !state.isDarkMode;
        },
    },
});

export const { toggleLightDarkTheme } = themeSlice.actions;

// Middleware: Tema durumunu localStorage'a kaydet
export const saveState: Middleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    if (themeSlice.actions.toggleLightDarkTheme.match(action)) {
        try {
            const serializedState = JSON.stringify(state.theme);
            localStorage.setItem('theme', serializedState);
        } catch (err) {
            console.error('Could not save theme state to localStorage:', err);
        }
    }
    return result;
};

export default themeSlice.reducer;
