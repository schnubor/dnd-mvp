import { Editor } from './components/Editor';
import { Provider } from './state/Provider';

function App() {
    return (
        <Provider>
            <Editor />
        </Provider>
    );
}

export default App;
