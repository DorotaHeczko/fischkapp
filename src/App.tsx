import { useState } from "react";
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
  const [cards, setCards] = useState<Flashcard[]>([
    { id: "1", front: "Treść karty 1", back: "Tył karty 1" },
    { id: "2", front: "Treść karty 2", back: "Tył karty 2" },
    // ... reszta kart
  ]);

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

      {/* Wyświetlanie przycisku + lub komponentu NewCard w zależności od stanu isAdding */}
      {isAdding ? (
        <NewCard
          onAddCard={(card: Flashcard) => {
            onAddCard(card);
            setIsAdding(false); // Ukrycie NewCard po dodaniu
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
