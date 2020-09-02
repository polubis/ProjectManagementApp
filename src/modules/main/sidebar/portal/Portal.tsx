import React from 'react'

import { NavLink } from 'react-router-dom';

import { Button } from '@material-ui/core';
import Cancel from '@material-ui/icons/Cancel';

import csx from './Portal.scss'
import csx2 from '../Sidebar.scss'

const LINK_HEIGHT = 80;

const MARKER_HEIGHT = 30;

export const Portal = ({sidebarLinks, basePath, close}) => {
    return (
        <div className={csx.portal}>

            <figure className={csx2.logo}>
                <Cancel fontSize='large' onClick={close}/>
            </figure>

            <div className={csx2.links}>

            {sidebarLinks.map(({ path, label, icon, exact }) => (
                <NavLink
                key={label}
                exact={exact}
                activeClassName={csx2.active}
                className={csx2.link}
                style={{ height: `${LINK_HEIGHT}px` }}
                to={`${basePath}${path}`}
                >
                <Button>
                    <div className={csx.tile}>
                        {icon}
                        <p>{label}</p>
                    </div>
                </Button>

                </NavLink>
            ))}
          
            </div>
        </div>
    )
}
