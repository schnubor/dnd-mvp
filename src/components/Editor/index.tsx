import { Sidebar } from './Sidebar';
import { Artboard } from './Artboard';
import { BlockMapper } from './Artboard/SortableBlock/BlockMapper.tsx';

// Utils
import { createPortal } from 'react-dom';
import {
    DndContext,
    DragOverlay,
    useSensors,
    useSensor,
    PointerSensor,
    DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Hooks
import { useRef, useState } from 'react';
import { useImmer } from 'use-immer';

// Types
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import type { Block, BlockType } from '../../types.ts';

const createPlaceholder = ({ id }: { id: string }): { id: string; type: BlockType } => {
    return {
        id,
        type: 'placeholder',
    };
};

export const Editor = () => {
    const placeholderInsertedRef = useRef<boolean>();
    const currentDraggedBlockRef = useRef<Block | null>();
    const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(Date.now());
    const [activeSidebarBlockType, setActiveSidebarBlockType] = useState<BlockType | null>(); // only for blocks from the sidebar
    const [activeBlock, setActiveBlock] = useState<Block | null>(); // only for blocks that are in the artboard
    const [data, updateData] = useImmer<{ blocks: Block[] }>({
        blocks: [],
    });

    const { blocks } = data;

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
    );

    const cleanUp = () => {
        setActiveSidebarBlockType(null);
        setActiveBlock(null);
        currentDraggedBlockRef.current = null;
        placeholderInsertedRef.current = false;
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const activeData = active.data.current as {
            block: Block;
            index: number;
            origin: 'sidebar' | 'artboard';
        };

        // This is where the cloning starts.
        // We set up a ref to the field we're dragging
        // from the sidebar so that we can finish the clone
        // in the onDragEnd handler.
        if (activeData?.origin === 'sidebar') {
            const { block } = activeData;
            const { type, title } = block;

            setActiveSidebarBlockType(type);

            // Create a new field that'll be added to the fields array
            // if we drag it over the canvas.
            currentDraggedBlockRef.current = {
                id: active.id as string,
                title,
                type,
            };

            return;
        }

        // We aren't creating a new element so go ahead and just insert the placeholder
        // since this field already belongs to the canvas.

        const { block, index } = activeData;

        setActiveBlock(block);
        currentDraggedBlockRef.current = block;

        updateData((draft: { blocks: Block[] }) => {
            draft.blocks.splice(index, 1, createPlaceholder({ id: active.id as string }));
        });
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        const activeData = active.data.current as {
            block: Block;
            index: number;
            origin: 'sidebar' | 'artboard';
        };

        // Once we detect that a sidebar field is being moved over the artboard
        // we create the placeholder using the sidebar fields id with a placeholder suffix and add into the
        // blocks array so that it'll be rendered on the artboard.

        // 🐑 CLONING 🐑
        // This is where the clone occurs. We're taking the id that was assigned to
        // sidebar field and reusing it for the placeholder that we insert to the canvas.
        if (activeData?.origin === 'sidebar') {
            const overData = over?.data.current as {
                block: Block;
                index: number;
                origin: 'sidebar' | 'artboard';
            };

            if (!placeholderInsertedRef.current) {
                const placeholder = createPlaceholder({
                    id: `${active.id}-placeholder`,
                });

                updateData((draft: { blocks: Block[] }) => {
                    if (!draft.blocks.length) {
                        draft.blocks.push(placeholder);
                    } else {
                        const nextIndex =
                            overData?.index > -1 ? overData?.index : draft.blocks.length;

                        draft.blocks.splice(nextIndex, 0, placeholder);
                    }

                    placeholderInsertedRef.current = true;
                });
            } else if (!over) {
                // This solves the issue where you could have a placeholder handing out in the canvas if you drug
                // a sidebar item on and then off
                updateData((draft: { blocks: Block[] }) => {
                    draft.blocks = draft.blocks.filter((block) => block.type !== 'placeholder');
                });
                placeholderInsertedRef.current = false;
            } else {
                // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
                // we need to make sure we're updating the placeholder position to reflect where our drop will occur.
                // We find the placeholder and then swap it with the over skipping the op if the two indexes are the same
                updateData((draft: { blocks: Block[] }) => {
                    const placeholderIndex = draft.blocks.findIndex(
                        (block) => block.id === `${active.id}-placeholder`,
                    );

                    const nextIndex =
                        overData.index > -1 ? overData.index : draft.blocks.length - 1;

                    if (nextIndex === placeholderIndex) {
                        return;
                    }

                    draft.blocks = arrayMove(draft.blocks, placeholderIndex, overData.index);
                });
            }
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { over } = event;

        // We dropped outside of the over so clean up so we can start fresh.
        if (!over) {
            cleanUp();

            updateData((draft: { blocks: Block[] }) => {
                draft.blocks = draft.blocks.filter((block) => block.type !== 'placeholder');
            });
            return;
        }

        // This is where we commit the clone.
        // We take the field from the this ref and replace the spacer we inserted.
        // Since the ref just holds a reference to a field that the context is aware of
        // we just swap out the spacer with the referenced field.
        const nextBlock = currentDraggedBlockRef.current;

        if (nextBlock) {
            const overData = over.data.current as {
                block: Block;
                index: number;
                origin: 'sidebar' | 'artboard';
            };

            updateData((draft: { blocks: Block[] }) => {
                const spacerIndex = draft.blocks.findIndex((block) => block.type === 'placeholder');
                draft.blocks.splice(spacerIndex, 1, nextBlock);

                draft.blocks = arrayMove(draft.blocks, spacerIndex, overData.index || 0);
            });
        }

        setSidebarFieldsRegenKey(Date.now());
        cleanUp();
    };

    return (
        <main className="grid grid-cols-4 w-full h-screen bg-white">
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                sensors={sensors}
                onDragOver={handleDragOver}
                autoScroll
            >
                <Sidebar fieldsRegKey={sidebarFieldsRegenKey} />

                <div className="col-span-3 bg-gray-100 overflow-scroll">
                    <SortableContext
                        items={blocks.map((block) => block.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <Artboard blocks={blocks} />
                    </SortableContext>
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeSidebarBlockType ? (
                            <BlockMapper type={activeSidebarBlockType} />
                        ) : null}
                        {activeBlock ? <BlockMapper type={activeBlock.type} /> : null}
                    </DragOverlay>,
                    document.body,
                )}
            </DndContext>
        </main>
    );
};
