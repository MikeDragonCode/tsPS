import isFinite from './isFinite.js';

export default function isSafeNumber(value: number): boolean {
    return isFinite(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
}
