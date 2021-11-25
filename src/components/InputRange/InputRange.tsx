import {
    ChangeEvent,
    FC,
    MouseEvent as ReactMouseEvent,
    RefObject,
    useCallback,
    useRef,
    useState
} from "react";

import { getPercentageOfNumbers, getPercent, getCurrentValue } from "../../utils";
import { Circle, InputRangeWrapper, WrapRange, Range, NativeInputRange } from "./styled";


export interface InputRangeProps {
    min: string;
    max: string;
    value: string;
    step: string;
}

// https://www.npmjs.com/package/recharts  диаграммы

const integerAccept = /\d+/g;
const parseInteger = (inputValue: string) =>
    (inputValue.match(integerAccept) || []).join('');

const getRoundValue = (changeValue: string, step: string) =>
    Math.round(Number(parseInteger(changeValue)) / Number(step)) * Number(step);

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
    const wrapRangeRef = useRef<HTMLDivElement>(null);

    const maxValue = Math.max(Number(min), Number(value)).toString();
    const [inputValue, setInputValue] = useState<string>(maxValue);

    const percentByMaxValue = getPercent(maxValue, Number(max));
    const [percent, setPercent] = useState<string>(percentByMaxValue);

    const [isMoveRange, setIsMoveRange] = useState<boolean>(false);

    const handleChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const changeValue = event.target.value;        
        
        const currInputValue = (parseInteger(changeValue) || min);
        setInputValue(currInputValue);
    }, [inputValue]);

    const handleBlur = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;        

        const currentRoundValue = getRoundValue(newValue, step);
        const newInputValue = Math.min(currentRoundValue, Number(max)).toString();
        const newPercent = getPercent(newInputValue, Number(max));

        setInputValue(newInputValue);
        setPercent(newPercent);
    }, [inputValue]);

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
        setPercent(newPercent);
    }, [inputValue])

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
            setPercent(newPercent);

            document.onmouseup = () => {
                setIsMoveRange(false);
                document.onmousemove = null;
            };
        }

        document.onmousemove = (event: MouseEvent) => {
            moveAt(event);
        };

    }, [inputValue]);

    const transitionValue = isMoveRange ? 'none' : '0.85s ease-in-out';
    const stylePercentValue = `${percent}%`;

    return (
        <InputRangeWrapper>
            <NativeInputRange
                type="text"
                value={Number(inputValue).toLocaleString()}
                onChange={handleChangeValue}
                onBlur={handleBlur}
            />

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
