import './App.css';
import { Route , Switch} from 'react-router-dom'
import LandingPage from './componets/LandingPage';
import Home from './componets/Home';
import CharacterForm from './componets/CharacterForm';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/" component = {LandingPage}/>
        <Route path ="/home" component = {Home}/>
        <Route path ="/character" component = {CharacterForm}/>
        {/* <Route path ="/home/:id" component = {Detail}/> */}
      </Switch>
    </div>
  );
}

export default App;
