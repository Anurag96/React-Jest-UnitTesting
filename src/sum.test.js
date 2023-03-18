import sum from './sum';

it("when a & b is number",()=>{
    const result = sum(1,2)
    //result===3
    expect(result).toBe(3)
})

it("when a &  b is string",()=>{
   const result = sum("1","2")
    expect(result).toBe(3)
})