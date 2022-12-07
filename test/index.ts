import {Cache} from '../src/index';

describe('Hashtable behaviour', () => {
    it('Able to set and get a simple key/value pair', () => {
        const [key,value] = ["a", "b"]
        Cache.set(key, value)
        const returnedValue = Cache.get(key);
        expect(returnedValue).toStrictEqual(value);
        expect(typeof returnedValue).toEqual('string');
    });

    it('Able to set and get multiple key/value pairs of any type (string, number, object)', () => {
        //  Construct test dataset
        const pairs = [
            ["a", "string"],
            ["b", 1234],
            ["c", {object: 'val'}],
        ];

        //  Set all values by keys
        for(const pair of pairs)
            Cache.set(pair[0] as string, pair[1]);

        //  Test each key/value
        for(const pair of pairs) {
            const [key, expectedValue] = [...pair];
            const returnedValue = Cache.get(key as string);
            expect(returnedValue).toStrictEqual(expectedValue);
            expect(typeof returnedValue).toEqual(typeof expectedValue);
        }
    });
});

describe('Cache settings', () => {
    it('setEvictionDelay() accepts valid integers', () => {
        const invalidInteger = "string" as any as number;
        //  Test
        Cache.setEvictionDelay(invalidInteger)
        //  Assertion
        expect(Cache.getEvitionDelay()).not.toEqual(invalidInteger);
    });

    it('setEvictionDelay() does not accept negative integer', () => {
        //  Test
        Cache.setEvictionDelay(-150)
        //  Assertion
        expect(Cache.getEvitionDelay()).not.toBeLessThan(0);
    });

    it('setEvictionDelay() should update internal eviction delay', () => {
        const oldDelay = Cache.getEvitionDelay()
        const [newDelay, expectedDelay] = [8452, 8452];
        //  Test
        Cache.setEvictionDelay(newDelay)
        //  Assertion
        expect(Cache.getEvitionDelay()).toEqual(expectedDelay)
        expect(Cache.getEvitionDelay()).not.toEqual(oldDelay)
    })
})

describe('Eviction delay applied', () => {
    
    afterAll(() => {
        jest.spyOn(global.Date, 'now').mockClear()
    });

    it('get outdated value returns undefined', () => {
        const [key, value] = ["email", "john@google.fr"]
        Cache.setEvictionDelay(5000);
        Cache.set(key, value);
        //  Able to get value within 5000 milliseconds
        expect(Cache.get(key)).toEqual(value);

        //  Advance time
        jest.spyOn(global.Date, 'now').mockImplementationOnce(() =>
            new Date('2142-05-14T11:01:58.135Z').valueOf()
        );

        //  When value is outdated then undefined is returned
        expect(Cache.get(key)).toBeUndefined();
    });
})


describe('Internal methods', () => {

})