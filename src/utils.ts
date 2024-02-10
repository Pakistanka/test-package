export function convertStats(labelValue: any, decimal = 2) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(decimal) + "B"
        // Six Zeroes for Millions
        : Math.abs(Number(labelValue)) >= 1.0e+6
            ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(decimal) + "M"
            // Three Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3
                ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(decimal) + "K"
                : Math.abs(Number(labelValue));
}
