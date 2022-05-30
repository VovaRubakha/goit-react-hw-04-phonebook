import { Component } from 'react'
import PropTypes from 'prop-types';

import styles from './contactForm.module.css'

class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({ name: '', number: ''})
    }

    render() {
        const {name, number} = this.state
        const {handleSubmit, handleChange } = this
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
}

export default ContactForm;

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
