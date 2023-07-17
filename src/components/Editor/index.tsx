import { Sidebar } from './Sidebar';
import { Artboard } from './Artboard';

export const Editor = () => {
    return (
        <main className="grid grid-cols-4 w-full h-screen bg-white">
            <Sidebar />

            <div className="col-span-3 bg-gray-100 flex items-center justify-center">
                <Artboard />
            </div>
        </main>
    );
};
