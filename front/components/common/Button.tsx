import * as React from 'react';
import { css } from '@emotion/react';
import { font } from '../../lib/styles/common';

type ButtonProps =
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement>

export interface IButtonProps extends ButtonProps {
}

const Button: React.FunctionComponent<IButtonProps> = ({
    children,
    ...rest
}) => {
    return (
        <button
            css={customButton}
            className='custom-button'
            {...rest}
        >
            {children}
        </button>
    );
};

export const customButton = css`
    font: 400 14px/14px ${font.noto};
    width: 150px;
    height: 32px;
    outline: 0;
    background-color: transparent;
    touch-action: manipulation;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    border: 1.5px solid #000000;
    border-radius: 100px;
    white-space: nowrap;
    transition: all 0.2s;
    cursor: pointer;
    -webkit-appearance: button;
    vertical-align: middle;
    &:hover{
        background-color: #000000;
        color: #ffffff;
    }
    a{
        color: inherit;
    }
`

export default Button;