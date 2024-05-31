import logo from './logo.svg';
import './App.css';
import SliderComponent from './components/mainpage/header/SliderComponent';
import BestMovie from './components/mainpage/contents/BestMovie';

function App() {
  return (
    <div className="App">
      <SliderComponent />
      <div className='page-division'></div>
      <BestMovie />
    </div>
  );
}

export default App;
