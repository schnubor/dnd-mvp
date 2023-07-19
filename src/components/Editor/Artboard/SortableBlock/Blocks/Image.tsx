// Types
import { FC } from 'react';

export const Image: FC = () => {
    return (
        <div className="w-full p-6">
            <div className="w-96 mx-auto">
                <img src="https://picsum.photos/1200/800" className="w-full rounded-md" alt="" />
            </div>
        </div>
    );
};
