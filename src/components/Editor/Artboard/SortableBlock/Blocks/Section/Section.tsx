import { SectionZone } from './SectionZone.tsx';

// Types
import { FC } from 'react';

interface Props {
    blockId: string;
}

export const Section: FC<Props> = ({ blockId }) => {
    return (
        <div className="text-xl font-semibold text-center p-6 grid grid-cols-2 gap-6">
            <SectionZone blockId={blockId} />
            <SectionZone blockId={blockId} />
        </div>
    );
};
