import React, { forwardRef } from 'react'

import csx from './ButtonBase.scss'

namespace ButtonBase {
    export interface Props
        extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
        > {
        variant?: 'icon' | 'texticon';
        color?: 'default' | 'transparent' | 'sea' | 'cloud' | 'angry' | 'calm';
        disabled?: boolean;
    }
}

const ButtonBase = forwardRef(
    ({ disabled = false, color = "default", variant, ...btnProps }: ButtonBase.Props, ref) => {
        return <button
            {...(btnProps as any)}
            className={`${csx.button} ${btnProps.className} ${csx[variant]} ${csx[color]} ${disabled && csx.disabled}`}
            ref={ref} />
    }
);
export default ButtonBase;