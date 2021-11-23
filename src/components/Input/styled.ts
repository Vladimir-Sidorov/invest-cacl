import styled from "styled-components";

export const NativeInput = styled.input`
    outline: 1px solid #dedede;
    border: 0px;
    width: 100%;
    padding: 14px;
    font-weight: 500;
    border-radius: 3px;
    transition: outline-color .2s ease-out;
    margin-bottom: 24px;
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