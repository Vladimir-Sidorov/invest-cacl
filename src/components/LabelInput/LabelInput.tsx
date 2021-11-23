import { FC } from "react";
import styled from "styled-components";

import { InputRange, InputRangeProps } from "..";

export interface LabelInputProps extends InputRangeProps {
    title: string;
    [key: string]: string;
}
export const LabelInput: FC<LabelInputProps> = ({ title, ...rest }) => {

    return (
        <NativeLabel>
            <Title>{title}</Title>
            <InputRange {...rest} />
        </NativeLabel>
    );
}

const NativeLabel = styled.label`
    color: #818990;
`;

const Title = styled.span`
    font-size: 15px;
    line-height: 28px;
    letter-spacing: 0.35px;
`;