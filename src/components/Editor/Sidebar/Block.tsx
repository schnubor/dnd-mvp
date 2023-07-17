import { FC } from 'react';

interface Props {
    id: string;
    title: string;
}

export const Block: FC<Props> = ({ id, title }) => {
    return (
        <div className="rounded-lg h-32 w-full border flex items-center justify-center text-sm bg-gray-50">
            <div className="text-center">
                <div className="text-lg font-semibold">{title}</div>
                <div className="text-xs text-gray-400 mt-2">id: {id}</div>
            </div>
        </div>
    );
};
