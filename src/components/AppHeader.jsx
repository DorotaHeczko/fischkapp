
import styles from "./AppHeader.module.css";
import logo from "../assets/Union.svg";
import cardIcon from "../assets/cardIcon.svg";
import PropTypes from "prop-types";

export const AppHeader = ({ cardsAmount }) => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <span className={styles.cards}>Cards: {cardsAmount} </span>
      <div className={styles.cardInfo}>
          <img src={cardIcon} alt="card-icon" />
    <button className={styles.ctaButton}></button>
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  cardsAmount: PropTypes.number.isRequired,
};