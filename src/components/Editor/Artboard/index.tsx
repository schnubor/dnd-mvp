// Hooks
import { useDroppable } from '@dnd-kit/core';

// UI
import { SortableBlock } from './SortableBlock';

// Types
import { FC } from 'react';
import { Block } from '../../../types.ts';

interface Props {
    blocks: Block[];
}

export const Artboard: FC<Props> = ({ blocks }) => {
    const { setNodeRef } = useDroppable({
        id: 'artboard',
    });

    return (
        <div
            className="bg-white shadow-xl rounded-lg w-3/4 min-h-[640px] h-auto my-12 mx-auto"
            ref={setNodeRef}
        >
            {blocks.map((block, index) => {
                return <SortableBlock key={block.id} id={block.id} block={block} index={index} />;
            })}
        </div>
    );
};
