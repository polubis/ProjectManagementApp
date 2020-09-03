import React from 'react'

import { Logo } from 'ui';
import Cancel from '@material-ui/icons/Cancel';
import { Button } from '@material-ui/core';

import {SidebarLinks} from '../sidebar-links'

import csx from './SidebarPanel.scss'


export const SidebarPanel = ({close, basePath}) => {

    const link = (icon, label) => {
        return(<Button><div className={csx.tile}>{icon}{label}</div></Button>)
        }

    return (
        <div className={csx.sidebarPanel}>

            <figure className={csx.logo}>
                <Logo /><p>Jupi.io</p><Cancel fontSize='default' onClick={close}/>
            </figure>

            <SidebarLinks basePath={basePath} component={(icon,label) => link(icon,label)}/>
            
        </div>
    )
}
