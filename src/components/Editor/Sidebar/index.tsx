import { nanoid } from 'nanoid';
import { DraggableBlock } from './DraggableBlock.tsx';

export const Sidebar = () => {
    return (
        <div className="border-r col-span-1 p-2 space-y-2">
            <DraggableBlock id={'block-' + nanoid()} type="text" title="Text" />
            <DraggableBlock id={'block-' + nanoid()} type="image" title="Image" />
            <DraggableBlock id={'block-' + nanoid()} type="section" title="Section" />
        </div>
    );
};
