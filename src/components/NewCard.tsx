import React, { useState } from "react";
import styles from "./NewCard.module.css";
import iconDelete from "../assets/iconDelete.svg";

interface Flashcard {
  frontText: string;
  backText: string;
}

interface CreateCardComponentProps {
  onAddCard(card: Flashcard): void;
  onCancelAdding(): void;
}

const NewCard: React.FC<CreateCardComponentProps> = ({
  onAddCard,
  onCancelAdding,
}) => {
  const [isFront, setIsFront] = useState(true);

  const handleSaveClick = () => {
    const card: Flashcard = {
      frontText: "...",
      backText: "...",
    };
    onAddCard(card);
  };
  

  return (
    <div className={styles.newCardContainer}>
      {isFront ? (
        <div>
          <textarea className={styles.cardSide} placeholder=""></textarea>
          <div>
            <button className={styles.button} onClick={onCancelAdding}>
              Cancel
            </button>
            <button
              className={styles.btnblack}
              onClick={() => setIsFront(false)}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
          <textarea className={styles.cardSide} placeholder=""></textarea>
          <div>
            <button className={styles.button} onClick={() => setIsFront(true)}>
              Back
            </button>
            <button className={styles.btnblack} onClick={handleSaveClick}>
              Save
            </button>
            <button>
              <img
                className={styles.btnDelete}
                src={iconDelete}
                alt="icon-delete"
              />
            </button>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCard;
