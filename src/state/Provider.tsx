import { createContext, useReducer } from 'react';

//Types
import type { FC, ReactNode, Dispatch } from 'react';
import type { Block, BlockType } from '../types.ts';

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

export enum ActionTypes {
    Add = 'ADD_BLOCK',
    Move = 'MOVE_BLOCK',
    Remove = 'REMOVE_BLOCK',
    Drag = 'DRAG_BLOCK',
}

type ActionPayload = {
    [ActionTypes.Add]: {
        blockId: string;
        blockType: BlockType;
    };
    [ActionTypes.Move]: {
        blockType: BlockType;
        blockId: string;
        newIndex: number;
    };
    [ActionTypes.Remove]: {
        blockId: string;
        blockType: BlockType;
    };
    [ActionTypes.Drag]: {
        blockId: string;
        blockType: BlockType;
        origin: string;
    };
};

export type Action = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

interface State {
    blocks: Block[];
    draggingBlock: Block | null;
}

//Initial State and Actions
const initialState = {
    blocks: [],
    draggingBlock: null,
};

const actions = {
    ADD_BLOCK: 'ADD_BLOCK',
    MOVE_BLOCK: 'MOVE_BLOCK',
    REMOVE_BLOCK: 'REMOVE_BLOCK',
    DRAG_BLOCK: 'DRAG_BLOCK',
};

//Reducer to Handle Actions
const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case actions.ADD_BLOCK:
            return {
                ...state,
                blocks: [
                    ...state.blocks,
                    {
                        id: action.payload.blockId,
                        type: action.payload.blockType,
                    },
                ],
            };
        case actions.REMOVE_BLOCK: {
            const filteredBlocks = state.blocks.filter(
                (block: Block) => block.id !== action.payload.blockId,
            );

            return {
                ...state,
                blocks: filteredBlocks,
            };
        }
        case actions.MOVE_BLOCK: {
            // TODO
            console.log('move block', action);

            return { ...state, blocks: state.blocks };
        }
        case actions.DRAG_BLOCK: {
            return {
                ...state,
                draggingBlock: {
                    id: action.payload.blockId,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    type: action.payload.blockType, // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    origin: action.payload.origin,
                },
            };
        }
        default:
            return state;
    }
};

export const EditorContext = createContext<{
    state: State;
    dispatch: Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

interface Props {
    children: ReactNode;
}

export const Provider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <EditorContext.Provider value={{ state, dispatch }}>{children}</EditorContext.Provider>;
};
