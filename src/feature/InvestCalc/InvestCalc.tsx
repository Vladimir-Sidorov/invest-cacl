import styled from "styled-components";

import { LabelInput } from "../../components"


export const InvestCalc = () => {
    // const formatDate = (string: any) => {
    //     const digits = parseDigits(string);
    //     const chars = digits.split('');
    //     return chars
    //       .reduce(
    //         (r: any, v: any, index: any) => (index === 2 || index === 4 ? `${r}-${v}` : `${r}${v}`),
    //         ''
    //       )
    //       .substr(0, 10);
    //   };

    return (
        <WrapInvestCalc>
            <LabelInput
                title="Стартовая сумма"
                min='0'
                max='1000000'
                value='5000'
                step='1000'
            />

            <LabelInput
                title="Ежемесячное пополнение"
                min='0'
                max='1000000'
                value='0'
                step='1000'
            />

            <LabelInput
                title="Среднегодовая доходность"
                min='0'
                max='100'
                value='1'
                step='1'
            />

            <LabelInput
                title="Срок инвестирования"
                min='0'
                max='100'
                value='1'
                step='1'
            />
        </WrapInvestCalc>
    )
}

const WrapInvestCalc = styled.div`
    width: 30%;
    padding: 30px;
`;