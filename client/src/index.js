// Importing necessary dependencies from React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";


// 2:05:03
// finally we're going to import persist gate now Redux persist I think I mentioned it
// 2:05:10
// before but this is so we can save all the state so all of this information
// 2:05:17
// will be stored in local state meaning anytime the user like closes the tab or
// 2:05:24
// closes the browser that information will still be stored in there the user information will still be there the only
// 2:05:31
// way they can get rid of it is if they clear their cache and this is good for certain things if
// 2:05:38
// you want to keep the information storage is an alternative that will have
// 2:05:44
// information saved for that particular session but if you close the tab that information will go away
// 2:05:49
// but local storage is perfect for this use case so now I have to resign in

import { Provider } from "react-redux";


// Importing styling for the application
import "./index.css";

// Importing the main App component
import App from "./App";

// Importing the Redux store and reducer
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";

// Importing Redux Persist dependencies
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// Configuration for Redux Persist
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

// Creating the Redux store with middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Ignoring specific actions for Redux Persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Creating a root element for ReactDOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the application within the Redux Provider and PersistGate
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* PersistGate waits for the Redux store to be rehydrated from persisted state */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);




// 2:08:25
// right now when you have some basic application maybe you have
// 2:08:30
// you know you don't really need too much functionality and you don't have a lot of use cases
// 2:08:37
// then those State managements are perfectly fine you can get by and have even less code than this and it's
// 2:08:42
// perfect for those but be careful of those people who are hyping some of those packages they're not considering
// 2:08:49
// they're not going in they're not creating production level applications where you have all these weird edge
// 2:08:54
// cases this happens a lot you when you have a big application you get into these weird little
// 2:09:00
// specific edge cases and it becomes a headache to work around now Redux has
// 2:09:06
// been around longer and this is why having using older libraries sometimes as long as it's good enough
// 2:09:12
// they are usually the desired package to use and I highly recommend Rio because
// 2:09:18
// it's been there for a while a lot of the use cases has been created for example like persist storage using local storage
// 2:09:24
// this has been refined make sure there's no bugs and this is why you would use something like Redux overdose other
// 2:09:31
// State Management tools yes you can get up and running faster with some of those other tools but toolkit makes it easy
// 2:09:37
// enough that it's worth using so that you can always scale your application as
// 2:09:42
// much as you want later on if you ever have a need for it so this is why I highly recommend stay away from those
// 2:09:49
// highly opinionated people saying Redux is gone things like that it's just chances are they haven't tried it they
// 2:09:55