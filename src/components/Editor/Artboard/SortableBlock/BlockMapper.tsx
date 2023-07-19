import { Text } from './Blocks/Text.tsx';
import { Image } from './Blocks/Image.tsx';
import { Section } from './Blocks/Section/Section.tsx';
import { Placeholder } from './Blocks/Placeholder.tsx';

// Types
import { FC } from 'react';
import { BlockType } from '../../../../types.ts';

interface Props {
    type: BlockType;
}

export const BlockMapper: FC<Props> = ({ type }) => {
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
        case 'placeholder':
            Content = Placeholder;
            break;
        default:
            Content = null;
    }

    return Content ? <Content /> : null;
};
