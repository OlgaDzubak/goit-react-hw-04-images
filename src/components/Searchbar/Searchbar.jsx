import {useState} from "react";
import css from './searchbar.module.css';
import {ImSearch} from 'react-icons/im';
import PropTypes from "prop-types";

//========================================================================================

export const Searchbar = ({onSubmit}) => {
  
  const [filter, setFilter] = useState("");

  const onChangeFilter = event => {setFilter(event.target.value);}

  const onSubmitForm = event => {
    event.preventDefault();
    setFilter("");
    onSubmit(filter);
    
  };

  return (
    <header className={css.header}>
      <form className={css.SearchForm} onSubmit={onSubmitForm}>

        <button type="submit" className={css.SearchForm_button}>
          <span className={css.button_label}>
              <ImSearch className={css.icon}/>
          </span>
        </button>

        <input className={css.SearchForm_input}
          type="text"
          placeholder="Search images and photos"
          id="input"
          value={filter}
          onChange={onChangeFilter} 
        />

      </form>
    </header>
  );
}

Searchbar.propTypes = { 
  filter: PropTypes.string,
}

//========================================================================================