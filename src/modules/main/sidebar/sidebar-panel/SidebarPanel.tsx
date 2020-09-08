import React from 'react'

import Cancel from '@material-ui/icons/Cancel';
import { Button } from '@material-ui/core';

import { Logo } from 'ui';

import { SidebarLinks } from '../sidebar-links'

import csx from './SidebarPanel.scss'


export const SidebarPanel = ({ onClose, basePath }) => {

    const renderLink = (icon, label) => {
        return (<Button><div className={csx.tile}>{icon}{label}</div></Button>)
    }

    return (
        <div className={csx.sidebarPanel}>

            <figure className={csx.logo}>
                <Logo /><p>Jupi.io</p><Cancel fontSize='default' onClick={onClose} />
            </figure>

            <SidebarLinks basePath={basePath} component={(icon, label) => renderLink(icon, label)} />

        </div>
    )
}
