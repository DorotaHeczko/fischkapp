import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import NewCard from "./components/NewCard";
// import CardList from "./components/CardList"
// import Card from "./components/Card";
import CardComponent from "./components/CardComponent"



import "./App.css";

function App() {
   const cardsAmount = 0;  
  return (
    <AppLayout>
      <AppHeader cardsAmount={cardsAmount} />
      <NewCard />
      {/* <CardList>
        <Card content="Treść karty 1" />
        <Card content="Treść karty 2" />
        <Card content="Treść karty 3" />
      </CardList> */}
      <CardComponent/>
    </AppLayout>
  );
}

export default App;




