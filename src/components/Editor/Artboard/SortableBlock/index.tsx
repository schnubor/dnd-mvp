// Types
import type { FC } from 'react';

// UI
import { BlockMapper } from './BlockMapper';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Block } from '../../../../types.ts';

interface Props {
    id: string;
    block: Block;
    index: number;
}

export const SortableBlock: FC<Props> = ({ id, block, index }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: {
            block,
            index,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
            <BlockMapper type={block.type} />
        </div>
    );
};
