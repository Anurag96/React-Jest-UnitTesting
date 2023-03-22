import doSomething from "./dosomething"
test('doSomething callback behaves correctly', () => {
    const mockCallback = jest.fn()
    doSomething(mockCallback)
    expect(mockCallback.mock.calls).toHaveLength(2)
    expect(mockCallback.mock.calls[0][0]).toBe('foo')
  console.log(mockCallback.mock.calls);
    // expect(mockCallback.mock.calls[0][0]).toBe('foo')
    // expect(mockCallback.mock.calls[1][0]).toBe('bar')
  })