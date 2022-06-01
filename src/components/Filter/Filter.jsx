import PropTypes from 'prop-types';

import styles from './filter.module.css'

const Filter = ({ filter, changeFilter }) => {
    return (
        <>
            <label className={styles.label}>
                Find contacts by Name
            </label>
            <input onChange={changeFilter}
                name="filter"
                type="text" value={filter}
                className={styles.input}>
            </input>
        </>
    )
}

export default Filter

Filter.propTypes = {
    filter: PropTypes.string,
    changeFilter: PropTypes.func.isRequired,
};