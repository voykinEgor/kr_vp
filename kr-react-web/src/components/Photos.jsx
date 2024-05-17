import { useEffect, useState } from "react";
import styles from "./Photos.module.scss";
import * as React from 'react';
import { CardMedia } from '@mui/material';
import Button from '@mui/material/Button';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import Rating from '@mui/material/Rating';


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
    
    const [visibleCount, setVisibleCount] = useState(12);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [cnt_numeric, setCnt_numeric] = useState(1);
    const [value, setValue] = useState(0);
    const handleVisible = () =>{
        setVisibleCount(visibleCount + 12);
    }
    useEffect(()=>{
        const t = photos.filter(item => item.albumId == cnt_numeric);
        setFilteredPhotos(t);
    }, [cnt_numeric])

    return (
        <>
            <h1>Photos from API</h1>
            <NumberInput
                aria-label="Demo number input"
                placeholder="Type a number…"
                min = {0}
                max = {10}
                value = {cnt_numeric}
                onChange={(event, val) => setCnt_numeric(val)}
            />
            <div className={styles.main}>
                {(cnt_numeric == 0) ? 
                    photos.slice(0, visibleCount).map((item)=>(
                        <card key={item.id} className={styles.photo}>
                            <CardMedia
                                sx={{ height: 350, width: 350}}
                                image={item.url}
                                title="wearimage"
                            />
                            <h3>Description: {item.title}</h3>
                            <h3>Album: {item.albumId}</h3>
                            <Rating name="no-value" value={null} />
                        </card>)):
                    filteredPhotos.slice(0, visibleCount).map((item)=>(
                        <card key={item.id} className={styles.photo}>
                            <CardMedia
                                sx={{ height: 350, width: 350}}
                                image={item.url}
                                title="wearimage"
                            />
                            <h3>Description: {item.title}</h3>
                            <h3>Album: {item.albumId}</h3>
                            <Rating name="no-value" value={null} />
                        </card>))
                    }
            </div>
            {visibleCount < photos.length && (
                // <button onClick={handleVisible}>More {visibleCount}</button>
                <Button variant="contained" onClick={handleVisible}>More {visibleCount}</Button>
            )}
        </>
    )
}
export default Photos;