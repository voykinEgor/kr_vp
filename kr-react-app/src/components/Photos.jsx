import { useEffect, useState } from "react";
import styles from "./Photos.module.scss";
import * as React from 'react';
import { Link } from "react-router-dom";
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



const Photos = () =>{
    const [photos, setPhotos] = useState([]);
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then((response) => response.json())
            .then((json) => 
            {
                setPhotos(json);
            });
    },[])
    
    return (
        <>
            <h1>Photos from API</h1>
            <div>
            {photos.map((item)=>(
                <card key={item.id} className={styles.main}>
                    <CardMedia
                        sx={{ height: 350 }}
                        image={item.url}
                        title="wearimage"
                    />
                    {/* <img src={item.images[0]} alt="wearimage"></img> */}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">{item.title}</Typography>
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small" onClick={()=>{setTextinfo(item.description); handleOpen()}}>View</Button>
                    </CardActions> */}
                    
                </card>
                        ))}
            </div>
        </>
    )
}
export default Photos;