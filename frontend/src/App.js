import Topbar from "./components/topbar";
import Widget from "./components/widget";

function App() {
  let widgets = [];
  for (let i = 0; i < 15; i++) {
    widgets.push(<Widget />);
  }

  return (
    <div className="App">
      <div>
        <Topbar />
      </div>
      <div
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          display: "grid",
          gap: "64px",
          marginTop: "32px",
          marginLeft: "32px",
        }}
      >
        {widgets.map((w) => {
          return w;
        })}
      </div>
    </div>
  );
}

export default App;
