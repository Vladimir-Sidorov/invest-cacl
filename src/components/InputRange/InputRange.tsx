import {
    ChangeEvent,
    FC,
    MouseEvent as ReactMouseEvent,
    RefObject,
    useCallback,
    useRef,
    useState
} from "react";

import { getPercentageOfNumbers } from "../../helpers";
import { PERCENT_VALUE } from "../../constants";
import { Circle, InputRangeWrapper, WrapRange, Range, NativeInputRange } from "./styled";
import { Rifm } from "rifm";


export interface InputRangeProps {
    min: string;
    max: string;
    value: string;
    step: string;
}

// https://www.npmjs.com/package/recharts  диаграммы

const getCurrentValue = (currentValue: number, min: number, max: number) => {
    let newCurrentValue = currentValue;
    if(currentValue < Number(min)) {
        newCurrentValue = min;
    } else if (currentValue > Number(max)) {
        newCurrentValue = max;
    }

    return newCurrentValue.toString();
}

const getPercent = (newInputValue: string, max: number) => {
    const indentPercent = getPercentageOfNumbers(Number(newInputValue), max);
    const indentPercentMax = Math.min(indentPercent, 100)
    return getCurrentValue(indentPercentMax, Number(PERCENT_VALUE.MIN), Number(PERCENT_VALUE.MAX)); 
}

const getInputValue = ({ event, wrapRangeRef, step, min, max}: {
    event: MouseEvent | ReactMouseEvent<HTMLDivElement>;
    wrapRangeRef: RefObject<HTMLDivElement>;
    step: number;
    min: number;
    max: number;
}) => {
    const { width, left } = wrapRangeRef.current!.getBoundingClientRect();
    const circlePosition = event.pageX - left;
    const stepInPercentage = getPercentageOfNumbers(Number(step), Number(max));
    const indentPercentPageX = getPercentageOfNumbers(circlePosition, width);
    const currentInputValue = Math.round(indentPercentPageX / stepInPercentage) * step;
    return getCurrentValue(currentInputValue, min, max);
}

export const InputRange: FC<InputRangeProps> = ({
    min, max, value, step
}) => {
    const [formatted, setFormatted] = useState('1000');


    const maxValue = Math.max(Number(min), Number(value)).toString();
    const [inputValue, setInputValue] = useState<string>(maxValue);

    const percentByMaxValue = getPercent(maxValue, Number(max));
    const [percent, setPercent] = useState<string>(percentByMaxValue);

    const [isMoveRange, setIsMoveRange] = useState<boolean>(false);

    const wrapRangeRef = useRef<HTMLDivElement>(null);

    const handleChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const changeValue = event.target.value;
        const parseValue = parseInt(changeValue);
        const currInputValue = (parseValue || min).toString();
        setInputValue(currInputValue);
    }, [inputValue, formatted]);

    const handleBlur = useCallback((event: ChangeEvent<HTMLInputElement>) => {        
        const changeValue = event.target.value.match(/\d/g)?.join('');
        console.log(changeValue, 'changeValue 113311');
        

        const currentInputValue = Math.round(Number(changeValue) / Number(step)) * Number(step);
        const qy = Math.max(Number(min), Number(currentInputValue));
        const newInputValue = Math.min(qy, Number(max)).toString();
        const newPercent = getPercent(newInputValue, Number(max));

        setInputValue(newInputValue);
        setFormatted(newInputValue);
        setPercent(newPercent);
    }, [inputValue, formatted]);

    const handleClickRange = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
        const newInputValue = getInputValue({
            event,
            wrapRangeRef,
            step: Number(step),
            min: Number(min),
            max: Number(max)
        })

        const newPercent = getPercent(newInputValue, Number(max));

        setInputValue(newInputValue);
        setFormatted(newInputValue);
        setPercent(newPercent);
    }, [inputValue, formatted])

    const handleMoveCircle = useCallback(() => {
        setIsMoveRange(true);
        const moveAt =(event: MouseEvent) => {
            const newInputValue = getInputValue({
                event,
                wrapRangeRef,
                step: Number(step),
                min: Number(min),
                max: Number(max)
            })

            const newPercent = getPercent(newInputValue, Number(max));

            setInputValue(newInputValue);
            setFormatted(newInputValue);
            setPercent(newPercent);

            document.onmouseup = () => {
                setIsMoveRange(false);
                document.onmousemove = null;
            };
        }

        document.onmousemove = (event: MouseEvent) => {
            moveAt(event);
        };

    }, [inputValue, formatted]);

    const transitionValue = isMoveRange ? 'none' : '0.85s ease-in-out';
    const stylePercentValue = `${percent}%`;

    /////index.ts
    const integerAccept = /\d+/g;
    const parseInteger = (string: any) => (string.match(integerAccept) || []).join('');

    const formatInteger = (string: any) => {
        const parsed = parseInteger(string);
        const number = Number.parseInt(parsed, 10);
        if (Number.isNaN(number)) {
          return '';
        }
        return number.toLocaleString();
    };

      const renderInput = ({ value, onChange }: any) => (
        <NativeInputRange
          type="text"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
        />
      );
    /////index.ts

    return (
        <InputRangeWrapper>
            <Rifm
                accept={/\d/g}
                mask={7 <= formatted.length}
                format={formatInteger}
                value={formatted}
                onChange={setFormatted}
            >
                {renderInput}
            </Rifm>

            <WrapRange
                ref={wrapRangeRef}
                onClick={handleClickRange}
            >
                <Range
                    style={{
                        width: stylePercentValue,
                        transition: transitionValue
                    }}
                />
                <Circle
                    style={{
                        left: stylePercentValue,
                        transition: transitionValue
                    }}
                    onMouseDown={handleMoveCircle}
                />
            </WrapRange>
        </InputRangeWrapper>
    )
}
