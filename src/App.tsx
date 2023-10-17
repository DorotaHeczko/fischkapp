import { useState, useEffect } from "react";
import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import NewCard from "./components/NewCard";
import CardList from "./components/CardList";
import CardComponent from "./components/CardComponent";
import "./App.css";

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

async function deleteFlashcard(id: string): Promise<void> {
  const response = await fetch(
    `https://training.nerdbord.io/api/v1/fischkapp/flashcards/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "secret_token",
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.message || "Failed to delete the flashcard.");
  }
}


function App() {
  const [cards, setCards] = useState<Flashcard[]>([]);

useEffect(() => {
  const ids = cards.map((card) => card.id);
  const uniqueIds = new Set(ids);

  if (ids.length !== uniqueIds.size) {
    console.error("Some cards have duplicate IDs!");
  }
}, [cards]);



  // Pobieranie istniejących kart z bazy danych podczas inicjalizacji aplikacji
  useEffect(() => {
    fetch("https://training.nerdbord.io/api/v1/fischkapp/flashcards")
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error("Błąd podczas ładowania kart:", error));
  }, []);

const onEditFunction = (updatedCard: Flashcard) => {
  updateCardInDatabase(updatedCard)
    .then((data) => {
      const returnedCard = data || updatedCard;
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === returnedCard.id ? returnedCard : card
        )
      );
    })
    .catch((error) => {
      console.error("Error updating card:", error);
    });
};

const onDeleteFunction = async (id: string) => {
  try {
    await deleteFlashcard(id);
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  } catch (error) {
    console.error("Error while deleting the flashcard:", error);
  }
};


  const addFlashcardToDatabase = (card: Flashcard) => {
    fetch("https://training.nerdbord.io/api/v1/fischkapp/flashcards", {
      method: "POST",
      headers: {
        Authorization: "secret_token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        front: card.front,
        back: card.back,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nie udało się dodać karty.");
        }
        return response.json();
      })
      .then((data) => {
        card.id = data.id;
        setCards((prevCards) => [...prevCards, card]);
      })
      .catch((error) => console.error("Błąd:", error.message));
  };

  const onAddCard = (newCard: Flashcard) => {
    addFlashcardToDatabase(newCard);
  };

  const [isAdding, setIsAdding] = useState(false);
  const updateCardInDatabase = async (card: Flashcard) => {
    const response = await fetch(
      `https://training.nerdbord.io/api/v1/fischkapp/flashcards/${card.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "secret_token",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: card.id,
          front: card.front,
          back: card.back,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update card in the database");
    }

    return response.json();
  };


  return (
    <AppLayout>
      <AppHeader cardsAmount={cards.length} />

      {isAdding ? (
        <NewCard
          onAddCard={(card: Flashcard) => {
            onAddCard(card);
            setIsAdding(false); 
          }}
          onCancelAdding={() => setIsAdding(false)}
        />
      ) : (
        <button onClick={() => setIsAdding(true)}>+</button>
      )}

      <CardList>
        {cards.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onEdit={onEditFunction}
            onDelete={onDeleteFunction}
          />
        ))}
      </CardList>
    </AppLayout>
  );
}

export default App;
