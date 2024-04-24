import InputShortener from "./InputShortener";
import LinkResult from "./LinkResult";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen background-animated">
      <InputShortener />
      <LinkResult />
    </div>
  );
}

export default App;

