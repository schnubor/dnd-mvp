import { Sidebar } from './Sidebar';
import { Artboard } from './Artboard';
import { DndContext, DragOverlay, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { useState } from 'react';

// Types
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

export const Editor = () => {
    const [activeDragBlock, setActiveDragBlock] = useState({ id: '', origin: '', type: '' });
    const [artboardBlocks, setArtboardBlocks] = useState<{ id: string; type: string }[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const id = event.active.id as string;
        const destination = event.over?.id as string;
        const origin = activeDragBlock.origin;
        const type = activeDragBlock.type;

        if (!destination) return;

        if (origin === 'sidebar') {
            setArtboardBlocks([...artboardBlocks, { id, type }]);
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveDragBlock({
            id: event.active.id as string,
            origin: event.active?.data?.current?.origin as string,
            type: event.active?.data?.current?.type as string,
        });
    };

    return (
        <main className="grid grid-cols-4 w-full h-screen bg-white">
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
                <Sidebar />

                <div className="col-span-3 bg-gray-100 overflow-scroll">
                    <Artboard blocks={artboardBlocks} />
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeDragBlock ? (
                            <div className="rounded-lg border h-32 w-48 flex items-center justify-center bg-blue-50 text-sm">
                                <div className="text-center">
                                    <p>Block from: {activeDragBlock.origin}</p>
                                    <p>Block id: {activeDragBlock.id}</p>
                                </div>
                            </div>
                        ) : null}
                    </DragOverlay>,
                    document.body,
                )}
            </DndContext>
        </main>
    );
};
