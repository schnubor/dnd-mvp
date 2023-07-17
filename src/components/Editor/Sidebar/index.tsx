import { nanoid } from 'nanoid';
import { DraggableBlock } from './DraggableBlock.tsx';

export const Sidebar = () => {
    return (
        <div className="border-r col-span-1 p-2 space-y-2">
            <DraggableBlock id={nanoid()} type="text" title="Text" />
            <DraggableBlock id={nanoid()} type="image" title="Image" />
            <DraggableBlock id={nanoid()} type="section" title="Section" />
        </div>
    );
};
