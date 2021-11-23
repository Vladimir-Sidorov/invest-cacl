import styled from "styled-components";
import InputMask from 'react-input-mask';

import { Input, InputRange, LabelInput } from "../../components"
import { Rifm } from "rifm";
import { useState } from "react";

const Tt = ({...rest}) => {
    return (
        <>
            <input {...rest} />
        </>
    )
}

export const InvestCalc = () => {
    const [formatted, setFormatted] = useState('18-08-1978');

    const parseDigits = (string: any) => (string.match(/\d+/g) || []).join('');

    const formatDate = (string: any) => {
        const digits = parseDigits(string);
        const chars = digits.split('');
        return chars
          .reduce(
            (r: any, v: any, index: any) => (index === 2 || index === 4 ? `${r}-${v}` : `${r}${v}`),
            ''
          )
          .substr(0, 10);
      };

      const renderInput = ({ value, onChange }: any) => (
        <Input
          type="tel"
          placeholder="dd-mm-yyyy"
          value={value}
          onChange={onChange}
        />
      );

    return (
        <WrapInvestCalc>
            <Rifm
                accept={/\d/g}
                mask={10 <= formatted.length}
                format={formatDate}
                value={formatted}
                onChange={setFormatted}
            >
                {renderInput}
            </Rifm>

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