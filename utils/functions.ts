
export function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export const getBrowserWidth = function (): string {
    if (window.innerWidth < 768) {
        // Extra Small Device
        return "xs";
    } else if (window.innerWidth < 991) {
        // Small Device
        return "sm"
    } else if (window.innerWidth < 1199) {
        // Medium Device
        return "md"
    } else {
        // Large Device
        return "lg"
    }
};