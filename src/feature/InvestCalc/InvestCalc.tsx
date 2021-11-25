import styled from "styled-components";

import { LabelInput } from "../../components"


export const InvestCalc = () => {
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
                title="Среднегодовая доходность в %"
                min='0'
                max='100'
                value='1'
                step='1'
            />

            <LabelInput
                title="Срок инвестирования в годах"
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