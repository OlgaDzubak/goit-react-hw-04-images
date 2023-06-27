import css from './imageGalleryItem.module.css'


//========================================================================================
export const ImageGalleryItem = ({src, alt, id, onGalleryItemClick}) => {

    return (
        <li className={css.galleryItem} onClick={(e)=>{onGalleryItemClick(e.target.id)}}>
            <img className={css.galleryItem_image} 
                    src={src}
                    alt={alt}
                    id={id}
            ></img>
        </li>
    );
};
//========================================================================================