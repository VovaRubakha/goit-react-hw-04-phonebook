import PropTypes from 'prop-types';

import styles from './filter.module.css'

const Filter = ({ value, changeFilter }) => {
    return (
        <>
            <label className={styles.label}>
                Find contacts by Name
            </label>
            <input onChange={changeFilter}
                type="text" value={value}
                className={styles.input}>
            </input>
        </>
    )
}

export default Filter

Filter.propTypes = {
    value: PropTypes.string,
    changeFilter: PropTypes.func.isRequired,
};