// Types
import { FC } from 'react';

export const Section: FC = () => {
    return (
        <div className="text-xl font-semibold text-center p-12 grid grid-cols-2 gap-4">
            <div className="border-dashed border-4 border-gray-400 rounded-lg h-32 w-full flex items-center justify-center text-sm bg-gray-50"></div>
            <div className="border-dashed border-4 border-gray-400 rounded-lg h-32 w-full flex items-center justify-center text-sm bg-gray-50"></div>
        </div>
    );
};
