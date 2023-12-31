import React, { useState, useRef, useEffect } from "react";
import styles from "./NewCard.module.css";
import iconDelete from "../assets/iconDelete.svg";

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface CreateCardComponentProps {
  onAddCard(card: Flashcard): void;
  onCancelAdding(): void;
}

const NewCard: React.FC<CreateCardComponentProps> = ({
  onAddCard,
  onCancelAdding,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isBackSideShown, setIsBackSideShown] = useState(false);
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  const frontTextareaRef = useRef<HTMLTextAreaElement>(null);
  const backTextareaRef = useRef<HTMLTextAreaElement>(null);


  
  const handleTextareaChange =
    (
      setText: React.Dispatch<React.SetStateAction<string>>,
      ref: React.RefObject<HTMLTextAreaElement>
    ) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
      adjustTextareaHeight(ref.current!);
    };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSaveClick = () => {
    const card: Flashcard = {
      id: Date.now().toString(),
      front: frontText,
      back: backText,
    };
    onAddCard(card);
  };

  const handleDelete = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (frontTextareaRef.current) {
      adjustTextareaHeight(frontTextareaRef.current);
    }
    if (backTextareaRef.current) {
      adjustTextareaHeight(backTextareaRef.current);
    }
  }, []);

  return isVisible ? (
    <div className={styles.newCardContainer}>
      {isBackSideShown ? (
        <>
          <textarea
            ref={backTextareaRef}
            className={styles.cardSide}
            placeholder=""
            value={backText}
            onChange={handleTextareaChange(setBackText, backTextareaRef)}
          />
          <div>
            <button
              className={styles.button}
              onClick={() => setIsBackSideShown(false)}
            >
              Back
            </button>
            <button className={styles.btnblack} onClick={handleSaveClick}>
              Save
            </button>
            <button onClick={handleDelete}>
              <img
                className={styles.btnDelete}
                src={iconDelete}
                alt="icon-delete"
              />
            </button>
          </div>
        </>
      ) : (
        <>
          <textarea
            ref={frontTextareaRef}
            className={styles.cardSide}
            placeholder=""
            value={frontText}
            onChange={handleTextareaChange(setFrontText, frontTextareaRef)}
          />
          <div>
            <button className={styles.button} onClick={onCancelAdding}>
              Cancel
            </button>
            <button
              className={styles.btnblack}
              onClick={() => setIsBackSideShown(true)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  ) : null;
};

export default NewCard;
