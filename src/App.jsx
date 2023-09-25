import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";

import "./App.css";

function App() {
   const cardsAmount = 0;  
  return (
    <AppLayout>
      <AppHeader cardsAmount={cardsAmount} />
    </AppLayout>
  );
}

export default App;




