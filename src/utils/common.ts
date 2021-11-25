import { PERCENT_VALUE } from "../constants";

export const getCurrentValue = (currentValue: number, min: number, max: number) => {
    let newCurrentValue = currentValue;
    if(currentValue < Number(min)) {
        newCurrentValue = min;
    } else if (currentValue > Number(max)) {
        newCurrentValue = max;
    }

    return newCurrentValue.toString();
}

export const getPercent = (newInputValue: string, max: number) => {
    const indentPercent = getPercentageOfNumbers(Number(newInputValue), max);
    const indentPercentMax = Math.min(indentPercent, Number(PERCENT_VALUE.MAX))
    return getCurrentValue(indentPercentMax, Number(PERCENT_VALUE.MIN), Number(PERCENT_VALUE.MAX)); 
}

export const getPercentageOfNumbers = (firstNum: number, secondNum: number) =>
    (firstNum / secondNum) * 100;