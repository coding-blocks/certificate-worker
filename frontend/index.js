import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { initStore } from '~/store';
import App from '~/app';

const store = initStore()

const ReactApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDOM.render(<ReactApp />, document.querySelector("#root"))
