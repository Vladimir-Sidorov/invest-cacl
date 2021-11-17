import styled from "styled-components";

export const InputRangeWrapper = styled.span`
    display: inline-flex;
    width: 550px;
    position: relative;
    margin-left: 200px;
    cursor: pointer;
`;

export const NumberInput = styled.input`
    outline: 1px solid #dedede;
    border: 0px;
    width: 100%;
    padding: 14px 5px;
    font-weight: 500;
    border-radius: 3px;
    transition: outline-color .2s ease-out;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
    -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        transition: outline-color .2s ease-out;
        outline-color: #a19b9b;
    }
`;

export const WrapRange = styled.div`
    position: absolute;
    width: 100%;
    height: 7px;
    bottom: -2px;
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
