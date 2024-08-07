
import { configureStore } from '@reduxjs/toolkit';
import themeReducer, { saveState } from './features/themeSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(saveState),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
