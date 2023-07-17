// Types
import { FC } from 'react';

// Hooks
import { useDroppable } from '@dnd-kit/core';

// UI
import { Text } from './Blocks/Text';
import { Image } from './Blocks/Image';
import { Section } from './Blocks/Section';

interface Props {
    blocks: { id: string; type: string }[];
}

export const Artboard: FC<Props> = ({ blocks }) => {
    console.log('artboard blocks', blocks);

    const { setNodeRef } = useDroppable({
        id: 'artboard',
    });

    return (
        <div
            className="bg-white shadow-xl rounded-lg w-3/4 min-h-[640px] h-auto my-12 mx-auto"
            ref={setNodeRef}
        >
            {blocks.map((block) => {
                switch (block.type) {
                    case 'text':
                        return <Text key={block.id} />;
                    case 'image':
                        return <Image key={block.id} />;
                    case 'section':
                        return <Section key={block.id} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};
