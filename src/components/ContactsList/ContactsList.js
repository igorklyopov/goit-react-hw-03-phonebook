import PropTypes from "prop-types";
import style from "../ContactsList/ContactsList.module.css";

const ContactsList = ({ contacts, onDeleteContactBtnClick }) => {
  return (
    <ul className={style.contactsList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={style.contactsListItem}>
          <p className={style.contactsName}>{name}: </p>
          <p className={style.contactsNumber}>{number}</p>
          <button
            className={style.btnDelContact}
            type="button"
            onClick={() => onDeleteContactBtnClick(id)}
            aria-label="Delete contact button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContactBtnClick: PropTypes.func.isRequired,
};

export default ContactsList;
