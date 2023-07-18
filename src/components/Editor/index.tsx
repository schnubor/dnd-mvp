import { Sidebar } from './Sidebar';
import { Artboard } from './Artboard';
import { BlockMapper } from './Artboard/SortableBlock/BlockMapper.tsx';
import { DndContext, DragOverlay, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';

// Utils
import { createPortal } from 'react-dom';
import { useContext } from 'react';

// Types
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { ActionTypes, EditorContext } from '../../state/Provider.tsx';

export const Editor = () => {
    const { state, dispatch } = useContext(EditorContext);
    console.log(state);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    const handleDragStart = (event: DragStartEvent) => {
        dispatch({
            type: ActionTypes.Drag,
            payload: {
                blockId: event.active.id as string,
                blockType: event.active?.data?.current?.type as string,
                origin: event.active?.data?.current?.origin as string,
            },
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const id = event.active.id as string;
        const destination = event.over?.id as string;
        const allowedBlocks = event.over?.data?.current?.allowedBlocks as string[];
        const origin = state?.draggingBlock?.origin;
        const type = state?.draggingBlock?.type;

        if (!destination) return;

        // From Sidebar to Artboard
        if (origin === 'sidebar' && type) {
            dispatch({
                type: ActionTypes.Add,
                payload: {
                    blockId: id,
                    blockType: type,
                },
            });
        }

        // Within Artboard
        if (origin === 'artboard') {
            dispatch({
                type: ActionTypes.Move,
                payload: {
                    blockId: id,
                    blockType: type,
                    oldIndex: state.blocks.findIndex((block) => block.id === id),
                    newIndex: state.blocks.findIndex((block) => block.id === destination),
                },
            });
        }

        console.log('end drag:');
        console.log('id:', id);
        console.log('origin:', origin);
        console.log('destination:', destination);
        console.log('type:', type);
        console.log('allowedBlocks:', allowedBlocks);
        console.log('over:', event.over);
        console.log('------------------');

        dispatch({
            type: ActionTypes.Drag,
            payload: {
                blockId: '',
                blockType: '',
                origin: '',
            },
        });
    };

    return (
        <main className="grid grid-cols-4 w-full h-screen bg-white">
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
                <Sidebar />

                <div className="col-span-3 bg-gray-100 overflow-scroll">
                    <Artboard blocks={state.blocks} />
                </div>

                {createPortal(
                    <DragOverlay>
                        {state.draggingBlock?.id ? (
                            <BlockMapper
                                blockId={state.draggingBlock?.id}
                                type={state.draggingBlock?.type}
                            />
                        ) : null}
                    </DragOverlay>,
                    document.body,
                )}
            </DndContext>
        </main>
    );
};
