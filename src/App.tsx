import 'normalize.css';
import './global.css';

import { InputRange } from './components';

export const App = () =>
{
    return (
        <>
            <h1>Hello, world!</h1>
            <InputRange min='20' max='80' value='0' step='5' />
        </>
    )
}