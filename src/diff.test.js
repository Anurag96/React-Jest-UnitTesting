import diff from './diff'

it("a & b are numbers",()=>{
    const result = diff(4,3)
    expect(result).toBe(1)
})

it("a & b are string",()=>{
    const result = diff("4","3")
    expect(result).toBe(1)
})