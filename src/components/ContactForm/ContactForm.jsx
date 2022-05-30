import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './contactForm.module.css'

const ContactForm = ({ onSubmit }) => {
    const [state, setState] = useState({
        name: '',
        number: '',
    });


    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState({
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(state);
        setState({ name: '', number: ''})
    }
    
        const {name, number} = state
        return (
            <form className={styles.form}
                onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="" className={styles.label}>Name</label>
                    <input
                    className={styles.input}
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="" className={styles.label}>Number</label>
                    <input
                    className={styles.input}
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleChange}
                    />
                </div>
                <button type="submit" className={styles.button}>Add contact</button>
            </form>
        );
    
}

export default ContactForm;

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
