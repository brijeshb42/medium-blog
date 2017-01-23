import {h, Component} from 'preact'
import { Router, Link } from 'preact-router'
import { Provider } from 'preact-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Title from 'react-document-title';

// import SplitPoint from './SplitPoint';
import Home from './pages/Home';
import NewArticle from './pages/NewArticle';
import reducers from './store';

import './App.css';

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

window.store = store;

export default class App extends Component {
  render() {
    return (
      <Title title={__APPNAME__}>
      <div className="medium-blog">
        <nav className="demo">
          <Link href="/" class="brand">
            {__APPNAME__}
          </Link>
          <input id="bmenug" type="checkbox" className="show" />
          <label for="bmenug" className="burger pseudo button">&#8801;</label>
          <div class="menu">
            <Link
              href="/article"
              class="button icon-picture"
            >New Article</Link>
          </div>
        </nav>
        <div className="app-container">
          <Provider store={store}>
            <Router>
              {/*<SplitPoint
                path="/"
                load={require('bundle?lazy!./pages/Home')}
                fallbackContent={(<div class="loading" />)}
              />
              <SplitPoint
                path="/article"
                load={require('bundle?lazy!./pages/NewArticle')}
                fallbackContent={(<div class="loading" />)}
              />
              <SplitPoint default load={() => <p>Ola</p>} />*/}
              <Home path="/" />
              <NewArticle path="/article" />
              <NewArticle path="/article/:articleID" />
            </Router>
          </Provider>
        </div>
      </div>
      </Title>
    );
  }
}
