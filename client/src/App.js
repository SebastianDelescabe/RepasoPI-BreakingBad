import './App.css';
import { Route , Switch} from 'react-router-dom'
import LandingPage from './componets/LandingPage';
import Home from './componets/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/" component = {LandingPage}/>
        <Route path ="/home" component = {Home}/>
      </Switch>
    </div>
  );
}

export default App;
