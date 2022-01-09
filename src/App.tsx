import BriefList from "./features/briefs/components/BriefList";
import BriefForm from "./features/form/components/BriefForm";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <BriefForm />
      <BriefList />
    </div>
  );
}

export default App;
