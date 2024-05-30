import logo from './logo.svg';
import './App.css';
import SliderComponent from './components/mainpage/header/SliderComponent';
import MainPage from './components/mainpage/contents/bestmovie';

function App() {
  return (
    <div className="App">
      <SliderComponent />
      <hr/>
      <MainPage/>
    </div>
  );
}

export default App;
