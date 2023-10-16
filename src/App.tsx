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

function App() {
  const [cards, setCards] = useState<Flashcard[]>([]);

  useEffect(() => {
    fetch("https://training.nerdbord.io/api/v1/fischkapp/flashcards")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nie udało się pobrać kart.");
        }
        return response.json();
      })
      .then((data) => setCards(data))
      .catch((error) => console.error("Błąd:", error.message));
  }, []);

  const onEditFunction = (updatedCard: Flashcard) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  };

  const onDeleteFunction = (id: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const onAddCard = (newCard: Flashcard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const [isAdding, setIsAdding] = useState(false);

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
