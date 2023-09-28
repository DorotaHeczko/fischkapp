import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import NewCard from "./components/NewCard";


import "./App.css";

function App() {
   const cardsAmount = 0;  
  return (
    <AppLayout>
      <AppHeader cardsAmount={cardsAmount} />
      <NewCard />
    </AppLayout>
  );
}

export default App;




