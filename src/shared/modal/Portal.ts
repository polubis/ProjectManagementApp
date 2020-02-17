import { useState, useEffect, useRef, memo } from 'react';
import ReactDOM from 'react-dom';
import { PortalProps } from './models';

export const Portal = ({ id, children}: PortalProps) => {
    const element = useRef(document.getElementById(id) || document.createElement('div'));
    const [current] = useState(!element.current.parentElement);
    useEffect(() => {
        if (current) {
            element.current.id = id;
            document.body.appendChild(element.current);
        }
        
        return () => {
            if (current && element.current.parentElement) {
                element.current.parentElement.removeChild(element.current);
            }
        }
    }, [id]);

    return ReactDOM.createPortal(children, element.current);
}

export default memo(Portal);