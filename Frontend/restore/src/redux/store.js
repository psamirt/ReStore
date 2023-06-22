import { createStore, applyMiddleware, compose } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import { reducer } from './reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea sirve para conectar nuestra App con la extensión REDUX DEVTOOLS DEL NAVEGADOR

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //despues agregar middleware, hay que instalarlo.
);

export default store;
