import { FC } from 'react';
import { NativeInput } from './styled';

export interface InputProps {
    type:
        | 'email'
        | 'number'
        | 'password'
        | 'search'
        | 'tel'
        | 'text'
        | 'url';
    placeholder: string;
    value: string;
    onChange: any
}

export const Input: FC<InputProps> = ({ type, ...rest }) => {

    return (
        <NativeInput
            type={type}
            {...rest}
        />
    )
}