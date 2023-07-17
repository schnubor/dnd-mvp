import { Editor } from './components/Editor';
import { createContext } from 'react';

const initialState = {
    blocks: [],
};

export const EditorContext = createContext(initialState);

function App() {
    return (
        <EditorContext.Provider value={initialState}>
            <Editor />
        </EditorContext.Provider>
    );
}

export default App;
