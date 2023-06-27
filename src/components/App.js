import { useEffect, useState} from "react";
import { fetchImagesFromAPI } from '../api/api';
import {Searchbar} from "./Searchbar/Searchbar";
import {Modal} from './Modal/Modal';
import {ImageGallery} from "./ImageGallery/ImageGallery";
import PropTypes from "prop-types";


//========================================================================================
export const  App = () => {

  //STATE-------------------------------------------------------
   const [filter, setFilter] = useState("");
   const [page, setPage] = useState(1);
   const [per_page] = useState(12);
   const [gallery, setGallery] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isEmpty, setIsEmpty] = useState(false);
   const [isButtonShown, setIsButtonShown] = useState(false);
   const [err, setErr] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [image, setImage] = useState({src: '', alt: '',});
  //------------------------------------------------------------


    useEffect(()=>{
      const q = (filter.split('/'))[1];
      if (!q) return;
      getImageGallery(q);
    }, [filter, page]);
    
    const resetState = () => {
      setPage(1);
      setGallery([]);
      setIsLoading(false);
      setIsButtonShown(false);
      setIsEmpty(false);
      setErr(null);
    } 

    const getImageGallery = async (query) => {
      try{
          setIsLoading(true);
          const {hits, totalHits} = await fetchImagesFromAPI(query, page, per_page);
          if (!hits.length) return setIsEmpty(true);
          setGallery(gallery=>[...gallery, ...hits]);
          setIsButtonShown(page < Math.ceil(totalHits /per_page));
      }catch(error){ 
          if (error.code !== 'ERR_CANCELED') setErr("Oops! Something went wrong! Try reloading the page!");
      }finally {setIsLoading(false);}
    }

    const SubmitSearchBar = (value) => { 
      if (!value.trim())  alert("Empty request! Please point what you want to find!"); 
      setFilter(`${Date.now()}/${value.trim()}`);
      resetState();
    }

    const showBigImage = (id)=>{ 
      const imageIndex= gallery.findIndex(item => item.id.toString() === id);
      setImage({src: gallery[imageIndex].largeImageURL,  alt: gallery[imageIndex].tags});
      setShowModal(true);
    }

    const ClickLoadMoreBtn = () => setPage(page => page + 1);
    
    const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <Searchbar onSubmit={SubmitSearchBar}/>
      <ImageGallery filter={filter} gallery={gallery} isEmpty={isEmpty} isLoading={isLoading} isButtonShown={isButtonShown} err={err} onGalleryClick={showBigImage} onClickButton={ClickLoadMoreBtn}/>
      {showModal && (<Modal onCloseModal={toggleModal} image={image}/>)}
    </>
  );

};

App.propTypes={
  filter: PropTypes.string,
  page: PropTypes.number,
  per_page: PropTypes.number,
  gallery: PropTypes.array,
  isLoading: PropTypes.bool,
  isEmpty: PropTypes.bool,
  isButtonShown: PropTypes.bool,
  err: PropTypes.string,
  showModal: PropTypes.bool,
  image: PropTypes.object,
}
//========================================================================================