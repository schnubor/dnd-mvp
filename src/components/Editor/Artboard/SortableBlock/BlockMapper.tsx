import { Text } from './Blocks/Text.tsx';
import { Image } from './Blocks/Image.tsx';
import { Section } from './Blocks/Section/Section.tsx';

// Types
import { FC } from 'react';

interface Props {
    blockId: string;
    type: string;
}

export const BlockMapper: FC<Props> = ({ type, blockId }) => {
    let Content;

    switch (type) {
        case 'text':
            Content = Text;
            break;
        case 'image':
            Content = Image;
            break;
        case 'section':
            Content = Section;
            break;
        default:
            Content = null;
    }

    return Content ? <Content blockId={blockId} /> : null;
};
