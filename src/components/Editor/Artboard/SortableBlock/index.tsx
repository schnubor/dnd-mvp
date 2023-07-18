// Types
import type { FC } from 'react';

// UI
import { BlockMapper } from './BlockMapper';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
    id: string;
    type: string;
}

export const SortableBlock: FC<Props> = ({ type, id }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: {
            origin: 'artboard',
            type,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
            <BlockMapper type={type} blockId={id} />
        </div>
    );
};
