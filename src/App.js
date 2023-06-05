import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProvider from './context/MyProvider';
import Recipes from './components/Recipes/Recipes';

function App() {
  return (
    <div className="meals">
      <Switch>
        <MyProvider>
          <span className="logo">TRYBE</span>
          <object
            className="rocksGlass"
            type="image/svg+xml"
            data={ rockGlass }
          >
            Glass
          </object>
          <Route exact path="/meals" component={ Recipes } />
        </MyProvider>
      </Switch>
    </div>
  );
}

export default App;
