import {useEffect, useRef } from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import { Loader } from '../Loader/Loader';
import css from './imageGallery.module.css';
import { nanoid } from 'nanoid';

//============================================================================================================================

export const ImageGallery = ({filter, gallery, isEmpty, isLoading, isButtonShown, err, onGalleryClick, onClickButton}) => {
    
    const galleryRef = useRef();
    
    useEffect(()=>{
        const count = gallery.length;
        const top = galleryRef.current.offsetTop;
        window.scrollTo({top: ((top/count)*(count-12)-200),  behavior: "smooth",});
    },[gallery.length]);


    return (
        <main className={css.main}>
            {   !isEmpty
                    ? <>
                        <ul className={css.gallery}>
                        {  
                            gallery.map((item) => { 
                                return <ImageGalleryItem onGalleryItemClick={onGalleryClick} src={item.webformatURL} alt={item.tags} id={item.id} key={nanoid()}/>;
                            })                                
                        }
                        
                        </ul> 
                      
                      </>
                    : <p className={css.p_isEmpty}>Sorry. There are no images for filter "{filter.split('/')[1]}"</p>
            }
            { isLoading && <Loader className={css.loader}/> }
            { err && <p className={css.p_isError}>Error: "{err}"</p> }

            <p ref={galleryRef}></p>
            
            { isButtonShown && <Button title='Load more' onClick={()=>{onClickButton(galleryRef)} }/> }
            
        </main>
    );
}

//============================================================================================================================