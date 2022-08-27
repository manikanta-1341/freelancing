import {configureStore} from '@reduxjs/toolkit'
import Reducer from '../reducers/reducer'
const Store = configureStore({
    reducer:Reducer
})

export default Store