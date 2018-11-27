import React, { Component } from 'react';
import './App.css';

// redux
import reducers from '../src/reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';

// Components
import Dashboard from '../src/components/Dashboard/Dashboard';
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider
        store={createStoreWithMiddleware(
          reducers,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
      >
        <div className="App">
          <Dashboard />
        </div>
      </Provider>
    );
  }
}

export default App;
