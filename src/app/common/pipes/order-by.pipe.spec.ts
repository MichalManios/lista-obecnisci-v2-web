import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  const pipe: OrderByPipe = new OrderByPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort list by property asc', () => {
    const source = [
      { id: 1, firstName: 'Jan', lastName: 'Kowaski' },
      { id: 2, firstName: 'Adam', lastName: 'Nowak' },
      { id: 3, firstName: 'Zygmunt', lastName: 'Andczak' }
    ];

    const expected = [
      { id: 2, firstName: 'Adam', lastName: 'Nowak' },
      { id: 1, firstName: 'Jan', lastName: 'Kowaski' },
      { id: 3, firstName: 'Zygmunt', lastName: 'Andczak' }
    ];

    expect(pipe.transform(source, ['firstName'])).toEqual(expected);
  });

  it('should sort list by property desc', () => {
    const source = [
      { id: 1, firstName: 'Jan', lastName: 'Kowaski' },
      { id: 2, firstName: 'Adam', lastName: 'Nowak' },
      { id: 3, firstName: 'Zygmunt', lastName: 'Andczak' }
    ];

    const expected = [
      { id: 3, firstName: 'Zygmunt', lastName: 'Andczak' },
      { id: 1, firstName: 'Jan', lastName: 'Kowaski' },
      { id: 2, firstName: 'Adam', lastName: 'Nowak' }
    ];

    expect(pipe.transform(source, ['-firstName'])).toEqual(expected);
  });

  it('should sort list by multiply properties asc', () => {
    const source = [
      { id: 2, firstName: 'Adam', lastName: 'Nowak' },
      { id: 1, firstName: 'Adam', lastName: 'Kowaski' },
      { id: 3, firstName: 'Zygmunt', lastName: 'Andczak' }
    ];

    const expected = [
      { id: 1, firstName: 'Adam', lastName: 'Kowaski' },
      { id: 2, firstName: 'Adam', lastName: 'Nowak' },
      { id: 3, firstName: 'Zygmunt', lastName: 'Andczak' }
    ];

    expect(pipe.transform(source, ['firstName', 'lastName'])).toEqual(expected);
  });

  it('should sort list by deep object property', () => {
    const source = [
      { id: 100, name: 'Zadanie', item: { id: 200, description: 'Opis' } },
      { id: 200, name: 'Analiza', item: { id: 500, description: 'Analityka' } },
      { id: 500, name: 'Budżet', item: { id: 300, description: 'Wydatki' } }
    ];

    const expected = [
      { id: 200, name: 'Analiza', item: { id: 500, description: 'Analityka' } },
      { id: 100, name: 'Zadanie', item: { id: 200, description: 'Opis' } },
      { id: 500, name: 'Budżet', item: { id: 300, description: 'Wydatki' } }
    ];

    expect(pipe.transform(source, ['item.description'])).toEqual(expected);
  });

  it('should sort list by multiply deep object properties', () => {
    const source = [
      { id: 100, name: 'Analiza', item: { id: 200, description: 'Opis' } },
      { id: 200, name: 'Analiza', item: { id: 500, description: 'Analityka' } },
      { id: 500, name: 'Budżet', item: { id: 300, description: 'Wydatki' } },
      { id: 600, name: 'Budżet', item: { id: 300, description: 'Budżet' } }
    ];

    const expected = [
      { id: 200, name: 'Analiza', item: { id: 500, description: 'Analityka' } },
      { id: 100, name: 'Analiza', item: { id: 200, description: 'Opis' } },
      { id: 600, name: 'Budżet', item: { id: 300, description: 'Budżet' } },
      { id: 500, name: 'Budżet', item: { id: 300, description: 'Wydatki' } }
    ];

    expect(pipe.transform(source, ['name', 'item.description'])).toEqual(expected);
  });

  it('should sort by Polish letters, nulls and numbers', () => {
    const source = [
      { id: 123, name: 'Łąka' },
      { id: 100, name: 'Źdźbło' },
      { id: 200, name: 'Ącki' },
      { id: 230, name: 2 },
      { id: 500, name: 'Ćwiartka' },
      { id: 600, name: 'Anime' },
      { id: 1111, name: null },
    ];

    const expected = [
      { id: 1111, name: null },
      { id: 230, name: 2 },
      { id: 600, name: 'Anime' },
      { id: 200, name: 'Ącki' },
      { id: 500, name: 'Ćwiartka' },
      { id: 123, name: 'Łąka' },
      { id: 100, name: 'Źdźbło' }
    ];

    expect(pipe.transform(source, ['name'])).toEqual(expected);
  });

  it('sort numbers', () => {
    const source = [
      { id: 4, name: { value: 10 } },
      { id: 1, name: { value: 11 } },
      { id: 2, name: { value: 1 } },
      { id: 3, name: { value: 0 } },
    ];

    const expected = [
      { id: 3, name: { value: 0 } },
      { id: 2, name: { value: 1 } },
      { id: 4, name: { value: 10 } },
      { id: 1, name: { value: 11 } },
    ];

    expect(pipe.transform(source, ['name.value'])).toEqual(expected);
  });

  it('avoid null point exception', () => {
    const source = [
      { id: 123, type: { name: 'Łąka' } },
      { id: 100, type: { name: 'Źdźbło' } },
      { id: 200, type: { name: 'Ącki' } },
      { id: 601 },
      { id: 600, name: 'Anime' },
    ];

    const expected = [
      { id: 601 },
      { id: 600, name: 'Anime' },
      { id: 200, type: { name: 'Ącki' } },
      { id: 123, type: { name: 'Łąka' } },
      { id: 100, type: { name: 'Źdźbło' } },
    ];

    expect(pipe.transform(source, ['type.name'])).toEqual(expected);
  });
});
