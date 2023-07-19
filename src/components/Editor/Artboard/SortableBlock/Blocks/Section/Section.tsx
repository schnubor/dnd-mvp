import { SectionZone } from './SectionZone.tsx';

// Types
import { FC } from 'react';

interface Props {}

export const Section: FC<Props> = ({}) => {
    return (
        <div className="text-xl font-semibold text-center p-6 grid grid-cols-2 gap-6">
            <SectionZone />
            <SectionZone />
        </div>
    );
};
