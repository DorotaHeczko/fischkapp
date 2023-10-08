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
  const [editingSide, setEditingSide] = useState<"front" | "back" | null>(null);
  const [editedCard, setEditedCard] = useState({ ...card });

  const handleFlip = () => {
    if (!editMode) {
      setIsFront(!isFront);
    }
  };

  const handleEditModeClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    side: "front" | "back"
  ) => {
    e.stopPropagation();
    setEditingSide(side);
    setEditMode(true);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(card.id);
  };

  return (
    <div className={styles.cardContainer} onClick={handleFlip}>
      {isFront ? (
        <div>
          <p>
            {editMode && editingSide === "front" ? (
              <textarea
                aria-label="Tekst przedni"
                className={styles.cardSide}
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
          {!editMode && (
            <button
              className={styles.btn_edit}
              onClick={(e) => handleEditModeClick(e, "front")}
            >
              <img src={editBtn} alt="edit-button" />
              <span className={styles.visuallyhidden}>Edytuj</span>
            </button>
          )}
        </div>
      ) : (
        <div>
          <p>
            {editMode && editingSide === "back" ? (
              <textarea
                className={styles.cardSide}
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
          {!editMode && (
            <button
              className={styles.btn_edit}
              onClick={(e) => handleEditModeClick(e, "back")}
            >
              <img src={editBtn} alt="edit-button" />
              <span className={styles.visuallyhidden}>Edytuj</span>
            </button>
          )}
        </div>
      )}

      {editMode && (
        <div>
          <button
            className={styles.button}
            onClick={() => {
              setEditMode(false);
              setEditingSide(null);
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
              setEditingSide(null);
            }}
          >
            Save
          </button>
          <button onClick={(e) => handleDeleteClick(e)}>
            <img className={styles.btnDel} src={iconDelete} alt="icon-delete" />
            <span className={styles.visuallyhidden}>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CardComponent;
