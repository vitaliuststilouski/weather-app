export function debounce(fn: any, DELAY: number) {
    let timeoutID: any;
    return function (...args: any) {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => fn(...args), DELAY);
    };
};
