import React from 'react';
import {createContext, useReducer} from 'react';

import { TransactionResponse } from '@ethersproject/providers';

type NewStickerTx = {
  author: string,
  name: string,
  categories: string[],
  address: string,
  installations: number,
  contribution: number,
  thumbnail: string,
  banner: string,
  price: number,
  stickers: string[],
  metadata: string,
  tx: TransactionResponse
}

type Action = {type: 'ADD_PENDING_STICKER', newStickerTx: NewStickerTx} |
              {type: 'REMOVE_PENDING_STICKER', tx: TransactionResponse} |
              {type: 'MOVE_PENDING_STICKER_TO_FAILED', tx: TransactionResponse}

type State = {
  LastBlockNumber: number,
  PendingStickers: NewStickerTx[],
  FailedStickers: NewStickerTx[],
  SuccessStickersCount: number
}

type Dispatch = (action: Action) => void

const initialState: State = {
  LastBlockNumber: 0,
  PendingStickers: [],
  FailedStickers: [],
  SuccessStickersCount: 0
}

function stickerReducer(state: State, action: Action) : State {
    switch (action.type) {
      case 'ADD_PENDING_STICKER': {
        return {
          ...state,
          PendingStickers: [
            ...state.PendingStickers,
            action.newStickerTx
          ]
        }
      }
      case 'REMOVE_PENDING_STICKER': {
        return {
          ...state,
          PendingStickers: state.PendingStickers.filter(ps => ps.tx.hash !== action.tx.hash),
          SuccessStickersCount: state.SuccessStickersCount + 1
        }
      }
      case 'MOVE_PENDING_STICKER_TO_FAILED': {
        const stToMove = state.PendingStickers.filter(ps => ps.tx.hash === action.tx.hash)
        return {
          ...state,
          PendingStickers: state.PendingStickers.filter(ps => ps.tx.hash !== action.tx.hash),
          FailedStickers: state.FailedStickers.concat(stToMove)
        }
      }
      default: {
        throw new Error('Unhandled action type')
      }
    }
  }


const StickerContext = createContext<State|undefined>(undefined)
const StickerDispatchContext = createContext<Dispatch | undefined>(undefined)


const StickerStateProvider = ( { children } : any ) => {
    const [state, dispatch] = useReducer(stickerReducer, initialState);
  
    return <StickerContext.Provider value={ state }>
        <StickerDispatchContext.Provider value ={ dispatch }>
        {children}
        </StickerDispatchContext.Provider>
        </StickerContext.Provider>;
  };

  function useStickerState() {
    const context = React.useContext(StickerContext)
    if (context === undefined) {
      throw new Error('useCountState must be used within a StickerStateProvider')
    }
    return context
  }
  function useStickerDispatch() {
    const context = React.useContext(StickerDispatchContext)
    if (context === undefined) {
      throw new Error('useCountDispatch must be used within a StickerStateProvider')
    }
    return context
  }

export {StickerStateProvider, useStickerState, useStickerDispatch}