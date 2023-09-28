import styles from "./AppLayout.module.css";
import PropTypes from "prop-types";

export const AppLayout = (props) => (
  <div className={styles.layout}>{props.children}</div>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
