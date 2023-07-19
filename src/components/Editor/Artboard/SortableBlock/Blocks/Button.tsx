// Types
import { FC } from 'react';

export const Button: FC = () => {
    return (
        <div className="p-6">
            <div className="font-semibold text-center h-12 text-sm bg-blue-500 rounded-lg flex items-center justify-center text-white w-64 mx-auto">
                Click me!
            </div>
        </div>
    );
};
