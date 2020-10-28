import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Layout } from "..";


describe('<Layout>', () => {
    it("shows children", () => {
        const child = <div data-testid="child">Test</div>;
        render(<Layout>{child}</Layout>)
        expect(screen.getByTestId("child")).toBeDefined();
    })

    it("style pass correctly", () => {
        const child = <div data-testid="child">Test</div>;
        const { container } = render(<Layout className={"foo"}>{child}</Layout>)
        expect(container.firstChild).toHaveClass('foo');
    })

    it("scroll var change height property", () => {
        const child = <div data-testid="child">Test</div>;
        render(<Layout scroll={true}>{child}</Layout>)
        const props = {
            scroll: true,
            children: child
        }
        const layoutClass = Layout(props).type.styledComponentId;
        const layoutRoots = document.getElementsByClassName(layoutClass);
        const style = window.getComputedStyle(layoutRoots[0]);
        expect(style.height).toBe('110%');
    })
});