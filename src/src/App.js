import { Link, Route, Switch } from 'react-router-dom';

import ListingPage from 'src/page/ListingPage';
import WatchingPage from 'src/page/WatchingPage';

export default function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/listing">ListingPage</Link>
            </li>
            <li>
              <Link to="/watching">WatchingPage</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={() => <h1>home</h1>} />
        <Route exact path="/listing" component={ListingPage} />
        <Route exact path="/watching" component={WatchingPage} />
      </Switch>
    </div>
  );
}
