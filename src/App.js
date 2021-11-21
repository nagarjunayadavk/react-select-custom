import logo from './logo.svg';
import './App.css';
import CustomSelect from './components/AsyncSelectDropDown';

function App() {
  return (
    <div className="App">
      <div style={{ marginLeft: "100px", marginTop: "100px", width: "200px", height: "200px" }}>
        <CustomSelect />
      </div>
    </div>
  );
}

export default App;
