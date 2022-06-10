import { cloneDeep } from 'lodash-es';
import { createContext, useReducer } from 'react';

const ContextStore = createContext();

const initStore = {
  list: localStorage.getItem('watching-list')
    ? JSON.parse(localStorage.getItem('watching-list'))
    : [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      localStorage.setItem(
        'watching-list',
        JSON.stringify([...state.list, action.payload]),
      );

      return Object.assign({}, state, {
        list: [...state.list, action.payload],
      });
    case 'REMOVE_LIST':
      const c = cloneDeep(state.list);
      const idx = c.findIndex((v) => v.id === action.payload.id);

      if (idx !== -1) {
        c.splice(idx, 1);

        localStorage.setItem('watching-list', JSON.stringify(c));

        return Object.assign({}, state, {
          list: [...c],
        });
      } else {
        return state;
      }

    default:
      return state;
  }
};

const WrapContext = (props) => {
  const [store, dispatch] = useReducer(reducer, initStore);

  return (
    <ContextStore.Provider
      value={{
        ...store,
        dispatch,
      }}
    >
      {props.children}
    </ContextStore.Provider>
  );
};

export default ContextStore;
export { WrapContext };
