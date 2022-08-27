import{ createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {backend_url} from '../../url/url'



export const FETCH_POST = createAsyncThunk(
    'reducer1/FETCH_POST',
    async()=>{
        try{
            let response = await axios.get(`${backend_url}/posts`)
            return response.data
        }
        catch(e){
            alert('Error while fetching POSTs')
        }
    }
)


export const FETCH_POST_USER = createAsyncThunk(
    'reducer1/FETCH_POST_USER',
    async(_id)=>{
        try{
            let response = await axios.get(`${backend_url}/posts/${_id}`)
            return response.data
        }
        catch(e){
            alert('Error while fetching POSTs/user')
        }
    }
)


export const APPLY_POST = createAsyncThunk(
    'reducer1/APPLY_POST',
    async({lancer_id,details})=>{
        try{
            let response = await axios.patch(`${backend_url}/lancer/apply/post/${lancer_id}`,{
                ...details
            })
            if(response.data.msg){
                alert(response.data.msg)
            }
        }
        catch(e){
            
            alert('Error while fetching POSTs')
        }
    }
)

