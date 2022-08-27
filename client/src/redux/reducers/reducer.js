import {createSlice} from '@reduxjs/toolkit'
import { FETCH_POST,FETCH_POST_USER } from '../actions/actions'
const initialState ={
    posts:"",
    fetch_post_status:"",
    user_posts:"",
    fetch_post_user_status:""
}

const Reducer = createSlice({
    name:"reducer1",
    initialState,
    reducers:{},
    extraReducers : (bind)=>{
        bind

        .addCase(FETCH_POST.pending,(state)=>{
            state.fetch_post_status ="pending"
        })
        .addCase(FETCH_POST.fulfilled,(state,{payload})=>{
            state.fetch_post_status ="success"
            state.posts = payload
        })
        .addCase(FETCH_POST.rejected,(state)=>{
            state.fetch_post_status ="failed"
        })


        .addCase(FETCH_POST_USER.pending,(state)=>{
            state.fetch_post_user_status ="pending"
        })
        .addCase(FETCH_POST_USER.fulfilled,(state,{payload})=>{
            state.fetch_post_user_status ="success"
            state.user_posts = payload
        })
        .addCase(FETCH_POST_USER.rejected,(state)=>{
            state.fetch_post_user_status ="failed"
        })
    }
})


export default Reducer.reducer