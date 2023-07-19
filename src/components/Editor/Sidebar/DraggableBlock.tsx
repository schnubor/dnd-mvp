import { useDraggable } from '@dnd-kit/core';
import { Block } from './Block';
import { nanoid } from 'nanoid';

// Types
import { FC, useRef } from 'react';
import { BlockType } from '../../../types.ts';

interface Props {
    title?: string;
    type: BlockType;
}

export const DraggableBlock: FC<Props> = ({ type, title }) => {
    const id = useRef(nanoid()).current;

    const { setNodeRef, listeners, attributes } = useDraggable({
        id,
        data: {
            block: {
                id,
                type,
                title,
            },
            origin: 'sidebar',
        },
    });

    return (
        <div ref={setNodeRef} {...listeners} {...attributes}>
            <Block title={title} id={id} />
        </div>
    );
};
