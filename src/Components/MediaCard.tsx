import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {deleteCard, PicturesType, setLike} from "../Pages/Pictures/picturesSlice";
import {IconButton, Tooltip, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import './MediaCard.css'
import {useDispatch} from "react-redux";

export function MediaCard(props: PicturesType) {
    const dispatch = useDispatch()

    const likeHandler = ( id: number, isLike: boolean ) => {
        dispatch(setLike({cardElement: {id, isLike}}))
    }

    const deleteButtonHandler = (id: number) => {
        dispatch(deleteCard({id}))
    }

    return (
        <div className="Card">
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    width="200"
                    image={props.pictureLink}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title={ props.isLike ? "Забрать лайк" : "Лайкнуть" }>
                        <IconButton aria-label="add to favorites" onClick={()=>likeHandler(props.id, !props.isLike)}>
                            <FavoriteIcon color={props.isLike ? 'error' : 'inherit'}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                        <IconButton aria-label="add to favorites" onClick={()=>deleteButtonHandler(props.id)}>
                            <DeleteIcon color='inherit'/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </div>
    );
}
