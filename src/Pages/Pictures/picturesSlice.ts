import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from '../../store'
import {picturesAPI} from "../../picturesAPI";

export type PicturesType = {
    id: number,
    pictureLink: string,
    title: string,
    isLike: boolean
}

type InitialStateType = {
    root: Array<PicturesType>
    pictures: Array<PicturesType>
    isLikeFilterActive: boolean
}

const initialState: InitialStateType = {
    root: [],
    pictures: [],
    isLikeFilterActive: false
}

export const fetchPictures = createAsyncThunk<
    any,
    any,
    {
        dispatch: AppDispatch
        state: RootState
    }
    >('pictures/fetchPictures', async (arg, thunkAPI) => {
    try {
        const response = await picturesAPI.getPictures()
        let pictures = response.map((i, idx)=>{
            return {id: idx, pictureLink: i.src, title: i.title, isLike: false}})
        thunkAPI.dispatch(init({ pictures }))
    } catch (e) {
        console.log(e)
    }
})

const filterPicturesFromRoot = (root: Array<PicturesType>, isLike: boolean) => root.filter((picture)=> picture.isLike || !isLike)

const slice = createSlice({
    name: 'pictures',
    initialState: initialState,
    reducers: {
        init: (state, action: PayloadAction<{ pictures: Array<PicturesType> }>) => {
            state.root = action.payload.pictures
            state.pictures = action.payload.pictures
        },
        setLike: (state, action: PayloadAction<{ cardElement: { id: number, isLike: boolean} }>) => {
            state.root = state.root.map((picture)=>{
                if (picture.id === action.payload.cardElement.id) {
                    return {...picture, isLike: action.payload.cardElement.isLike}
                }
                return picture
            })
            state.pictures = filterPicturesFromRoot(state.root, state.isLikeFilterActive)
        },
        deleteCard: (state, action: PayloadAction<{ id: number }>) => {
            state.root = state.root.filter((picture)=>picture.id !== action.payload.id)
            state.pictures = filterPicturesFromRoot(state.root, state.isLikeFilterActive)
        },
        setFilterPosition: (state, action: PayloadAction<{ filterPosition: boolean }>) => {
            state.isLikeFilterActive = action.payload.filterPosition
            state.pictures = filterPicturesFromRoot(state.root, action.payload.filterPosition)
        },
    },
})

export const {
    init,
    setLike,
    deleteCard,
    setFilterPosition,
} = slice.actions

export const picturesReducer = slice.reducer
