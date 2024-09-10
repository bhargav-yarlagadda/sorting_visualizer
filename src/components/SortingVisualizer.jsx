import React, { useCallback, useEffect, useState } from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/algorithms';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [length, setLength] = useState(10);
    const ANIMATION_SPEED_MS = 50;
    const PRIMARY_COLOR = 'rgb(59 130 246)';
    const SECONDARY_COLOR = 'red';

    const mergeSort = () => {
        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const arrayTexts = document.getElementsByClassName('array-text');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const textElement = arrayTexts[barOneIdx];
                    barOneStyle.height = `${newHeight}px`;
                    textElement.innerHTML = newHeight; // Update the text dynamically
                }, i * ANIMATION_SPEED_MS);
            }
        }
    };

    const generateArray = useCallback(() => {
        const min = 10;
        const max = 500;
        const newArray = [];
        for (let i = 0; i < length; i++) {
            newArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        setArray(newArray);
    }, [length]);

    useEffect(() => {
        generateArray();
    }, [generateArray]);

    return (
        <div className="w-screen">
            <div className="flex w-full justify-between items-center m-2 px-4">
                <div className="flex flex-col">
                    <label>Size of array</label>
                    <input
                        type="range"
                        min="5"
                        max="50"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="h-1 mt-2"
                    />
                </div>
                <div>
                    <button
                        className="bg-green-800 text-white px-3 py-2 rounded-lg"
                        onClick={mergeSort}
                    >
                        Merge Sort
                    </button>
                </div>
                <div>
                    <button
                        onClick={generateArray}
                        className="bg-green-500 text-white p-2 rounded-md"
                    >
                        Generate New Array
                    </button>
                </div>
            </div>
            <h1 className='text-center font-bold'>Original array</h1>
            <div className='flex mx-auto w-auto max-w-80 gap-2'>
                {array.map((item)=>(
                    <p>{item}</p>
                ))}
            </div>
            <div className="flex absolute bottom-16 mt-10 justify-center w-full gap-1">
                {array.map((item, index) => (
                    <div className="flex flex-col-reverse" key={index}>
                        <p className="array-text text-center">{item}</p>
                        <div
                            className="array-bar bg-blue-500"
                            style={{
                                height: `${item}px`,
                                width: `${Math.max(10, 50 - length)}px`,
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SortingVisualizer;
