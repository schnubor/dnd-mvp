import { useDraggable } from '@dnd-kit/core';

import { Block } from './Block';

// Types
import { FC } from 'react';

interface Props {
    id: string;
    title: string;
    type: 'text' | 'image' | 'section';
}

export const DraggableBlock: FC<Props> = ({ id, type, title }) => {
    const { setNodeRef, listeners, attributes } = useDraggable({
        id,
        data: {
            type,
            origin: 'sidebar',
            some: 'data',
        },
    });

    return (
        <div ref={setNodeRef} {...listeners} {...attributes}>
            <Block title={title} id={id} />
        </div>
    );
};
