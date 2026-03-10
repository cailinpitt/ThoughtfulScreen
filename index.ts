const VOLUME_LIMIT: number = 1000000 // cm^3
const DIMENSION_LIMIT: number = 150 // cm
const MASS_LIMIT: number = 20 // kg

enum Stack {
  Standard = 'STANDARD',
  Special = 'SPECIAL',
  Rejected = 'REJECTED',
}

export function sort(width: number, height: number, length: number, mass: number): string {
    const volume: number = width * height * length;

    const isBulky = volume >= VOLUME_LIMIT || width >= DIMENSION_LIMIT || height >= DIMENSION_LIMIT || length >= DIMENSION_LIMIT;
    const isHeavy = mass >= MASS_LIMIT;
    
    if (isHeavy && isBulky) return Stack.Rejected;
    else if (isHeavy || isBulky) return Stack.Special;
    else return Stack.Standard;
}