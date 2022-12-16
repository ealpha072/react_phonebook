import for_testing from '../utils/for_testing.js'

test('reverse of alpha ', () => {
    const result = for_testing.reverse('alpha')
    expect(result).toBe('ahpla')
})