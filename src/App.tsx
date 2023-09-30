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

  const onCancelAdding = () => {
    console.log("Dodawanie karty zostało anulowane");
  };

  return (
    <AppLayout>
      <AppHeader cardsAmount={cards.length} />
      <NewCard onAddCard={onAddCard} onCancelAdding={onCancelAdding} />
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
