import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import SlotList from "./components/SlotList";
import DetailsScreen from "./components/DetailsScreen";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <h3 className="text-center mb-3 pt-3">Time Slot Booking</h3>
          <Routes>
            <Route path="/" element={<SlotList />} />
            <Route path="/details/:index" element={<DetailsScreen />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
