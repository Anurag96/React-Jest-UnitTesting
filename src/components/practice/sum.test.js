import sum from './sum';
describe('sum module 1', () => {
it("when a & b is number",()=>{
    const result = sum(1,2)
    //result===3
    expect(result).toBe(3)
})
});
describe('sum module 2', () => {
it("when a &  b is string",()=>{
   const result = sum("1","2")
    expect(result).toBe(3)
})
});
describe('sum module 3', () => {
    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
  });