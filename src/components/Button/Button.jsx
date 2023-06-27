import css from './button.module.css';

//========================================================================================
export const Button = ({title, onClick}) => {

    return (
        <button className={css.loadMore_btn} 
                type='button' 
                onClick={onClick}>
                {title}
        </button>
    )
};
//========================================================================================