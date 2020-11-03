import { renderHook, act } from '@testing-library/react-hooks';

import { useAlerts } from '..'

describe('AlertsProvider', () => {
    it("default state", () => {
        const { result } = renderHook(() => useAlerts());

        expect(result.current.alert).toBe(null);
        expect(result.current.alerts.length).toBe(0);
    })

    it("add alert", () => {
        const { result } = renderHook(() => useAlerts());

        expect(result.current.alerts.length).toBe(0);

        act(() => {
            () => result.current.addAlert("alert1", "error");
        })

        expect(result.current.alerts.length).toBe(0);
    })
})