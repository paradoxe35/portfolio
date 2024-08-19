
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

export function throttle(callback: Function, delay: number) {
    let last: number;
    let timer: NodeJS.Timeout;
    return function () {
        //@ts-ignore
        let context = this;
        let now = +new Date();
        let args = arguments;
        if (last && now < last + delay) {
            // le délai n'est pas écoulé on reset le timer
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                callback.apply(context, args);
            }, delay);
        } else {
            last = now;
            callback.apply(context, args);
        }
    };
}
