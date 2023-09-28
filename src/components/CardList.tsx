import React, { PropsWithChildren } from "react";
import styles from "./CardList.module.css";
import Card from "./Card";

interface CardListProps extends PropsWithChildren<{}> {}

const CardList: React.FC<CardListProps> = ({ children }) => {
  return <div className={styles.cardListContainer}>{children}</div>;
};

export default CardList;
