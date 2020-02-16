import { useState, useEffect, useRef, memo } from 'react';
import { UsePortalProps } from './models';
import ReactDOM from 'react-dom';

export const Portal = ({ id, children}: any) => {
    const element = useRef(document.getElementById(id) || document.createElement('div'));
    const [current] = useState(!element.current.parentElement);
    useEffect(() => {
        if (current) {
            element.current.id = id;
            document.body.appendChild(element.current);
        }
        //https://medium.com/@jc_perez_ch/dynamic-react-portals-with-hooks-ddeb127fa516
        return () => {
            if (current && element.current.parentElement) {
                element.current.parentElement.removeChild(element.current);
            }
        }
    }, [id]);

    return ReactDOM.createPortal(children, element.current);
}

export default memo(Portal);