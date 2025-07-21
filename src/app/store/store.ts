// store.ts
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {getPersistConfig } from 'redux-deep-persist'

import treeReducer from '@/features/tree/hooks/treeSlice'

const rootReducer = combineReducers({
	tree: treeReducer
})
const persistConfig = getPersistConfig({
	key: 'root',
	storage,
	blacklist: ['tree.node', 'tree.edge'],
	rootReducer: combineReducers({
		tree: treeReducer
	})
	
}, 
)


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER
				]
			}
		})
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
