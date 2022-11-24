import { configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger"

import searchReducer from "./search";


const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer:{
        search: searchReducer,
        
    }
})

export default store