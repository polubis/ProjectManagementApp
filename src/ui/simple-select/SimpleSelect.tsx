import React, { memo } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton } from '@material-ui/core';

import { SelectBase, FieldBase } from 'ui';

import csx from './SimpleSelect.scss';

namespace SimpleSelectControl {
    export interface Props extends Partial<SelectBase.ChildrenInjectedProps> {
        label: string;
        list: SelectBase.Item[];
        value: Object;
    }
}

const SimpleSelect = memo(({ label, list, value, menuOpen, onClick }: SimpleSelectControl.Props) => {

    const selectedRender = (): string => {
        let render = '';
        list.map(e => {
            if (e.value) {
                if (render.length === 0) render += e.label;
                else render = `${render}, ${e.label}`;
            }
        })
        return render;
    }

    return (
        <div>
            <FieldBase className={csx.dataField} label={label}>
                <input
                    className={menuOpen ? csx.open : ''}
                    readOnly
                    placeholder={selectedRender() !== '' ? selectedRender() : label}
                />
                <IconButton className={csx.expandBtn} onClick={onClick}>
                    <ExpandMoreIcon />
                </IconButton>
            </FieldBase>
        </div>
    );
});

export default SimpleSelect;