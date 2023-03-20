import pizzas from './data.json';

it('the pizza data is correct ', () => {
    expect(pizzas).toMatchSnapshot();
    expect(1).toEqual(1)
    expect(pizzas).toHaveLength(4)
    expect(pizzas.map((pizza) => pizza.name)).toEqual([
        "Chicago Pizza",
        "Neapolitan Pizza",
        "New York Pizza",
        "Sicilian Pizza"
    ])
    expect(pizzas.map(pizza => pizza.price)).toEqual([9, 7, 8, 9])
})

pizzas.forEach(element => {
    //    console.log(element);
    describe('Properties Check', () => {
    it(`${element.name} should have properties (id,name,image,desc,price)`, () => {
        expect(element).toHaveProperty('id')
        expect(element).toHaveProperty('image')
        expect(element).toHaveProperty('name')
        expect(element).toHaveProperty('desc')
    })
});
});

pizzas.forEach(element => {
    //    console.log(element);
    describe('Properties Check', () => {
    it(`${JSON.stringify(element.name)} should have properties (id,name,image,desc,price)`, () => {
        expect(element).toHaveProperty('id')
        expect(element).toHaveProperty('image')
        expect(element).toHaveProperty('name')
        expect(element).toHaveProperty('desc')
    })
});
}); 


test('',()=>{
    const mock = jest.fn().mockImplementation(()=>'United States')
    expect(mock('Location')).toBe('United States')
    expect(mock).toHaveBeenCalledWith('Location')
})