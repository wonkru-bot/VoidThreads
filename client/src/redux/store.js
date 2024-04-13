import { configureStore,combineReducers } from '@reduxjs/toolkit'
import currentRoomReducer from './rooms/currentRoomSlice'
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";


const rootReducer = combineReducers({
currentRoom : currentRoomReducer
})


const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  export const persistor = persistStore(store)