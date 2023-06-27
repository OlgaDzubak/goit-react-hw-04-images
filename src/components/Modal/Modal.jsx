import { useEffect } from "react";
import css from './modal.module.css';


//========================================================================================
export const Modal = ({image, onCloseModal}) => {
   
    useEffect(()=>{
        const onKeyDown = (event) => { if (event.code === 'Escape') onCloseModal(); };
        window.addEventListener('keydown', onKeyDown);
        return () => { window.removeEventListener('keydown', onKeyDown) }
    }, [onCloseModal]);
   
    const onOverlayClick = (event) =>{ 
        if (event.target === event.currentTarget) onCloseModal(); 
    };

    return (
        <div className={css.Overlay} onClick={onOverlayClick}>
            <div className={css.modalContent}>
                <img className={css.modalImage} src={image.src} alt={image.alt}></img> 
            </div>
        </div>
    );
}

//========================================================================================