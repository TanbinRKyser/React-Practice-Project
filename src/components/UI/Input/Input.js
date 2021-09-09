import styles from './Input.module.css';

const input = (props) => {

    let inputElement = null;

    switch( props.inputType ){
        case('input'):
            inputElement = <input className={styles.InputElement} {...props}/>;
            break;
        case('textArea'):
            inputElement = <textarea className={styles.InputElement}{...props}/>;
            break;
        default:
            inputElement = <input className={styles.InputElement}{...props}/>;
    }

    return(
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;