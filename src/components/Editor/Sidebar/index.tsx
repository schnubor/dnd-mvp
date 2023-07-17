import { nanoid } from 'nanoid';
import { Block } from './Block';

export const Sidebar = () => {
    return (
        <div className="border-r col-span-1 p-2 space-y-2">
            <Block id={nanoid()} title="Text" />
            <Block id={nanoid()} title="Image" />
            <Block id={nanoid()} title="Image" />
        </div>
    );
};
