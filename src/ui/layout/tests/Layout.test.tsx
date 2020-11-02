import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Layout } from "..";


describe('<Layout>', () => {
    it("shows children", () => {
        render(<Layout><div>Test</div></Layout>)
        expect(screen.getByText("Test")).toBeInTheDocument();
    })

    it("style pass correctly", () => {
        const { container } = render(<Layout className={"foo"}><div>Test</div></Layout>)
        expect(container.firstChild).toHaveClass('foo');
    })

    it("displays browser scroll for overgrown property", () => {
        render(<Layout overgrown={true}><div>Test</div></Layout>)
        const props = {
            scroll: true,
            children: <div>Test</div>
        }
        const layoutClass = Layout(props).type.styledComponentId;
        const layoutRoots = document.getElementsByClassName(layoutClass);
        const style = window.getComputedStyle(layoutRoots[0]);
        expect(style.height).toBe('110%');
    })
});