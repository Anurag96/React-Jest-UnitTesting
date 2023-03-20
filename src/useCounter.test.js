import { useCounter } from './useCounter'
import { act, renderHook } from '@testing-library/react-hooks'

describe('Increment', () => {
    it('increment acount by 1', () => {
        const { result } = renderHook(useCounter)

        act(() => {
            result.current.increment()
        })

        expect(result.current.count).toBe(1)
        act(() => {
            result.current.decrement()
        })
        expect(result.current.count).toBe(0)
    })
})