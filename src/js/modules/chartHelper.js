/* globals Chart */

const backgroundColorFromData = (context, highlightedValues) => {
    if (context.type !== 'data') {
        return 'transparent';
    }
    const value = context.raw.v;
    let alpha = (1 + Math.log(value)) / 5;
    const color = highlightedValues && highlightedValues.includes(value) ? 'rgb(255, 99, 132)' : 'rgb(100, 100, 100)';
    return Chart.helpers.color(color)
            .alpha(alpha)
            .rgbString();
}

export { backgroundColorFromData };
