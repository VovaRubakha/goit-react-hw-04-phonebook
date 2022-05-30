import PropTypes from 'prop-types';

import styles from './contactList.module.css'

const ContactList = ({ contacts, deleteContact }) => {
    return (
        <ul className={styles.list}>
            {contacts.map(({id, name, number}) => (
                <li key={id} className={styles.item}>
                    {`${name} ${number}`}
                    <button onClick={() => deleteContact(id)} className={styles.button}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }).isRequired,
    ),
    deleteContact: PropTypes.func.isRequired,
};