import { DraggableBlock } from './DraggableBlock.tsx';
import { BlockType } from '../../../types.ts';
import { FC } from 'react';

const blocks: { type: BlockType; title: string }[] = [
    {
        type: 'text',
        title: 'Text',
    },
    {
        type: 'image',
        title: 'Image',
    },
    {
        type: 'section',
        title: 'Section',
    },
];

interface Props {
    fieldsRegKey: number;
}

export const Sidebar: FC<Props> = ({ fieldsRegKey }) => {
    return (
        <div className="border-r col-span-1 p-2 space-y-2" key={fieldsRegKey}>
            {blocks.map((block) => (
                <DraggableBlock key={block.type} type={block.type} title={block.title} />
            ))}
        </div>
    );
};
