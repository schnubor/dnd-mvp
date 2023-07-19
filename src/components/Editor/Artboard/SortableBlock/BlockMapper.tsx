import { Text } from './Blocks/Text';
import { Image } from './Blocks/Image';
import { Button } from './Blocks/Button';
import { Section } from './Blocks/Section';
import { Placeholder } from './Blocks/Placeholder';

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
        case 'button':
            Content = Button;
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
