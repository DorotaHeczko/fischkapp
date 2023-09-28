import React, { useState } from "react";
import styles from "./Card.module.css";

interface CardProps {
  initialContent?: string; // Możliwość ustawienia początkowej treści karty
}

const Card: React.FC<CardProps> = ({ initialContent = "" }) => {
  const [content, setContent] = useState(initialContent);

  return (
    <div className={styles.cardContainer}>
      <textarea
        className={styles.textArea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default Card;
