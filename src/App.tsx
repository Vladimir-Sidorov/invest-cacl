import 'normalize.css';
import './global.css';

import { InvestCalc } from './feature';

export const App = () =>
{
    return (
        <>
            <h1>ИНВЕСТИЦИОННЫЙ КАЛЬКУЛЯТОР СЛОЖНОГО ПРОЦЕНТА</h1>
            <InvestCalc />
        </>
    )
}