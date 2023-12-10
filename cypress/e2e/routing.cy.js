
describe('checking routing operation', () => {
    beforeEach(() => {
        cy.visit(`/`);
    })
    it('opening a page with recursion(string)',()=>{
        cy.get('a[href*="/recursion"]').click();
        cy.contains('Строка');
    })

    it('opening the Fibonacci Sequence page',()=>{
        cy.get('a[href*="/fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи');
    })

    it('opening the Array Sorting page',()=>{
        cy.get('a[href*="/sorting"]').click();
        cy.contains('Сортировка массива');
    })

    it('opening the Stack page',()=>{
        cy.get('a[href*="/stack"]').click();
        cy.contains('Стек');
    })

    it('opening the Queue page',()=>{
        cy.get('a[href*="/queue"]').click();
        cy.contains('Очередь');
    })

    it('opening the Linked List page',()=>{
        cy.get('a[href*="/list"]').click();
        cy.contains('Связный список');
    })
})