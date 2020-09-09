import React, { memo } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Button, SelectBase, FieldBase } from 'ui';

import csx from './SimpleSelect.scss';

namespace SimpleSelectControl {
    export interface Props extends Partial<SelectBase.ChildrenInjectedProps> {
        label: string;
        value: string[];
    }
}

const SimpleSelect = memo(({ value, label, menuOpen, onClick }: SimpleSelectControl.Props) => {

    const placeholderRender = value.join(', ');

    return (
        <div>
            <FieldBase className={csx.dataField} label={label}>
                <input readOnly placeholder={placeholderRender} />
                <Button className={csx.expandBtn} theme="primaryTransparent" onClick={onClick}>
                    <ExpandMoreIcon />
                </Button>
            </FieldBase>

        </div>
    );
});

export default SimpleSelect;