import styled from "styled-components";

import { NativeInput } from '../Input/styled';

export const NativeInputRange = styled(NativeInput)`
    margin-bottom: 0;
`;

export const InputRangeWrapper = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 24px;
`;

export const WrapRange = styled.div`
    position: absolute;
    width: 100%;
    height: 7px;
    bottom: -2px;
    cursor: pointer;
`;

export const Range = styled.div`
    position: absolute;
    height: 1px;
    margin: 0;
    bottom: 0px;
    padding: 0;
    transform: translateY(-50%);
    background-repeat: no-repeat;
    background-color: #0790cf;
    cursor: pointer;
    transition: 0.85s ease-in-out;
`;

export const Circle = styled.div`
    width: 14px;
    height: 14px;
    cursor: pointer;
    top: -2px;
    border-radius: 50%;
    background: #1da5e3;
    box-shadow: 0px 0px 6px 0px #1da5e3;
    z-index: 2;
    position: absolute;
    transition: 0.85s ease-in-out;
    transform: translateX(-7px);
`;
