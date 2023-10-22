import React, { useState } from "react";
import styles from "./CardComponent.module.css";
import editBtn from "../assets/editBtn.svg";
import iconDelete from "../assets/iconDelete.svg";

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface CardComponentProps {
  card: Flashcard;
  onEdit(card: Flashcard): void;
  onDelete(id: string): void;
}

const CardComponent: React.FC<CardComponentProps> = ({
  card,
  onEdit,
  onDelete,
}) => {
  const [isFront, setIsFront] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedCard, setEditedCard] = useState({ ...card });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleFlip = () => {
    if (!editMode) {
      setIsFront(!isFront);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(card.id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        className={`${styles.cardContainer} ${!isFront ? styles.flipped : ""}`}
        onClick={handleFlip}
      >
        {isFront ? (
          <div>
            <p>
              {editMode ? (
                <textarea
                  aria-label="Tekst przedni"
                  className={`${styles.cardSide} ${styles.cardFront}`}
                  value={editedCard.front}
                  placeholder=""
                  onChange={(e) =>
                    setEditedCard({ ...editedCard, front: e.target.value })
                  }
                />
              ) : (
                editedCard.front
              )}
            </p>
            <button
              className={styles.btn_edit}
              onClick={() => setEditMode(true)}
            >
              <img src={editBtn} alt="edit-button" />
              <span className={styles.visuallyhidden}>Edit</span>
            </button>
          </div>
        ) : (
          <div className={styles.text}>
            <p>
              {editMode ? (
                <textarea
                  className={`${styles.cardSide} ${styles.cardBack}`}
                  value={editedCard.back}
                  placeholder=""
                  onChange={(e) =>
                    setEditedCard({ ...editedCard, back: e.target.value })
                  }
                />
              ) : (
                editedCard.back
              )}
            </p>
            <button
              className={styles.btn_edit}
              onClick={() => setEditMode(true)}
            >
              <img src={editBtn} alt="edit-button" />
              <span className={styles.visuallyhidden}>Edit</span>
            </button>
          </div>
        )}

        {editMode && (
          <div>
            <button
              className={styles.button}
              onClick={() => {
                setEditMode(false);
                setEditedCard({ ...card });
              }}
            >
              Cancel
            </button>
            <button
              className={styles.btnblack}
              onClick={() => {
                onEdit(editedCard);
                setEditMode(false);
              }}
            >
              Save
            </button>
            <button onClick={(e) => handleDeleteClick(e)}>
              <img
                className={styles.btnDel}
                src={iconDelete}
                alt="icon-delete"
              />
              <span className={styles.visuallyhidden}>Delete</span>
            </button>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className={styles.modal}>
          <p>Are you sure you want to delete this card?</p>
          <button onClick={handleConfirmDelete}>Yes, delete</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default CardComponent;
