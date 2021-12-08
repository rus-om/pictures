import React, {ChangeEvent, useEffect} from 'react';
import {fetchPictures, setFilterPosition} from './Pages/Pictures/picturesSlice';
import {useAppSelector} from "./hooks";
import {MediaCard} from "./Components/MediaCard";
import {useDispatch} from "react-redux";
import './App.css'
import {Switch} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export function App() {
    const dispatch = useDispatch()
    const {pictures, isLikeFilterActive} = useAppSelector((state) => state.picturesReducer)

    useEffect(() => {
        dispatch(fetchPictures({}))
    }, [dispatch])

    const switchFilterHandler = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        dispatch(setFilterPosition({filterPosition: checked}))
    }

    return (
        <div className="App">
            <div className="Switch">
                <Switch checked={isLikeFilterActive} onChange={switchFilterHandler}/>
                 <FavoriteIcon color={isLikeFilterActive ? "error" : "action"}/>
            </div>
            <div className="Cards">
                {pictures.map((picture) => <MediaCard key={picture.id} id={picture.id} pictureLink={picture.pictureLink}
                                                      title={picture.title} isLike={picture.isLike}/>)}
            </div>
        </div>
    );
}
