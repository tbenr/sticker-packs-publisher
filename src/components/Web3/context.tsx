import React from 'react';
import {createContext, useReducer} from 'react';

type Action = {type: 'increment'} | {type: 'decrement'}
type State = {count: number}
type Dispatch = (action: Action) => void

const initialState: State = {
    count: 0
}

function countReducer(state: State, action: Action) {
    switch (action.type) {
      case 'increment': {
        return {count: state.count + 1}
      }
      case 'decrement': {
        return {count: state.count - 1}
      }
      default: {
        throw new Error('Unhandled action type')
      }
    }
  }


const StickerContext = createContext<State|undefined>(undefined)
const StickerDispatchContext = createContext<Dispatch | undefined>(undefined)


const StickerStateProvider = ( { children } : any ) => {
    const [state, dispatch] = useReducer(countReducer, initialState);
  
    return <StickerContext.Provider value={ state }>
        <StickerDispatchContext.Provider value ={ dispatch }>
        {children}
        </StickerDispatchContext.Provider>
        </StickerContext.Provider>;
  };

  function useStickerState() {
    const context = React.useContext(StickerContext)
    if (context === undefined) {
      throw new Error('useCountState must be used within a CountProvider')
    }
    return context
  }
  function useStickerDispatch() {
    const context = React.useContext(StickerDispatchContext)
    if (context === undefined) {
      throw new Error('useCountDispatch must be used within a CountProvider')
    }
    return context
  }

export {StickerStateProvider, useStickerState, useStickerDispatch}