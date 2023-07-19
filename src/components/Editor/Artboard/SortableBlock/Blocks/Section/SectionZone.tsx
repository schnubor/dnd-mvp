import { useDroppable } from '@dnd-kit/core';

// Types
import { FC } from 'react';

interface Props {}

export const SectionZone: FC<Props> = () => {
    return (
        <div className="border-dashed border-4 border-gray-400 rounded-lg h-32 w-full flex items-center justify-center text-sm bg-gray-50"></div>
    );
};
