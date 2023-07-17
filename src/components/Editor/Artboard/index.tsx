// Types
import { FC } from 'react';

// Hooks
import { useDroppable } from '@dnd-kit/core';

// UI
import { SortableBlock } from './SortableBlock';
import { SortableContext } from '@dnd-kit/sortable';

interface Props {
    blocks: { id: string; type: string }[];
}

export const Artboard: FC<Props> = ({ blocks }) => {
    const { setNodeRef } = useDroppable({
        id: 'artboard',
    });

    return (
        <div
            className="bg-white shadow-xl rounded-lg w-[700px] min-h-[640px] h-auto my-12 mx-auto"
            ref={setNodeRef}
        >
            <SortableContext items={blocks.map((block) => block.id)}>
                {blocks.map((block) => {
                    return <SortableBlock key={block.id} id={block.id} type={block.type} />;
                })}
            </SortableContext>
        </div>
    );
};
