import { sort } from "./index";

function expect(actual: any, expected: any, label: string) {
    const pass = actual === expected;
    console.log(`${pass ? '✓' : '✗'} ${label}${pass ? '' : ` — got "${actual}", expected "${expected}"`}`);
}

function expectThrows(fn: () => void, label: string) {
    try {
        fn();
        console.log(`✗ ${label} — expected an error but none was thrown`);
    } catch {
        console.log(`✓ ${label}`);
    }
}

// STANDARD
expect(sort(10, 10, 10, 5),   'STANDARD', 'small package, light');
expect(sort(99, 99, 99, 19),  'STANDARD', 'just under all limits');
expect(sort(149, 1, 1, 19),   'STANDARD', 'dimension just under 150');

// SPECIAL — bulky by dimension
expect(sort(150, 10, 10, 5),  'SPECIAL', 'width exactly 150');
expect(sort(10, 150, 10, 5),  'SPECIAL', 'height exactly 150');
expect(sort(10, 10, 150, 5),  'SPECIAL', 'length exactly 150');
expect(sort(200, 1, 1, 5),    'SPECIAL', 'width well over 150');

// SPECIAL — bulky by volume
expect(sort(100, 100, 100, 5), 'SPECIAL', 'volume exactly 1,000,000');
expect(sort(1000, 1000, 1, 5), 'SPECIAL', 'volume over limit, flat package');
expect(sort(150, 150, 150, 5), 'SPECIAL', 'oversized dimensions and volume, light');

// SPECIAL — heavy
expect(sort(10, 10, 10, 20),  'SPECIAL', 'mass exactly 20');
expect(sort(10, 10, 10, 50),  'SPECIAL', 'mass well over 20');

// REJECTED — bulky by volume + heavy
expect(sort(100, 100, 100, 20),   'REJECTED', 'volume exactly 1,000,000 and mass exactly 20');
expect(sort(10, 10, 1000000, 20), 'REJECTED', 'volume over limit and heavy');

// REJECTED — bulky by dimension + heavy
expect(sort(150, 1, 1, 20),  'REJECTED', 'width exactly 150 and mass exactly 20');
expect(sort(200, 1, 1, 25),  'REJECTED', 'large dimension and heavy');

// REJECTED — bulky by both conditions + heavy
expect(sort(150, 150, 150, 25), 'REJECTED', 'oversized dimensions and volume and heavy');

// invalid inputs
expectThrows(() => sort('jel' as any, 10, 10, 5), 'throws on non-number width');
expectThrows(() => sort(10, 10, 10, NaN),          'throws on NaN');
