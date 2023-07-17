// Types
import { FC } from 'react';

export const Image: FC = () => {
    return (
        <div className="bg-blue-500 w-full p-6">
            <img src="https://picsum.photos/1200/800" className="w-full cover rounded-md" alt="" />
        </div>
    );
};
