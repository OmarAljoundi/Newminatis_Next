import { combineReducers, configureStore } from '@reduxjs/toolkit'
import CartSlice from './CartItem/Cart-slice'
import AuthSlice from './Auth/Auth-slice'
import WishlistSlice from './Wishlist/Wishlist-slice'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore,
    persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from './logger'
import SettingSlice from './Setting/Setting-slice'
import ContentSlice from './Content/content-slice'
import PushFacebookMWEvent from './PushFacebookMWEvent'

const persistConfig = {
    key: 'newminatis',
    storage,
    blacklist: ['ContentReducer'],
}

const reducers = combineReducers({
    CartReducer: CartSlice.reducer,
    AuthReducer: AuthSlice.reducer,
    WishlistReducer: WishlistSlice.reducer,
    SettingReducer: SettingSlice.reducer,
    ContentReducer: ContentSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
    reducer: { Store: persistedReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }).concat([logger, PushFacebookMWEvent]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
