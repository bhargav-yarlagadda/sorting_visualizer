import { getInsertionSortAnimations } from '../sortingAlgorithms/insertionSort';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort';
import { getBubbleSortAnimations } from '../sortingAlgorithms/BubbleSort';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [length, setLength] = useState(10);
    const [ANIMATION_SPEED_MS,SET_ANIMATION_SPEED_MS] = useState(50) ;
    const PRIMARY_COLOR = 'rgb(59 130 246)';
    const SECONDARY_COLOR = 'red';
    const timeoutsRef = useRef([]);

    const stopSort = () => {
        timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId)); 
        timeoutsRef.current = [];
    };


const insertionSort = () => {
    stopSort(); // Stop any ongoing sort before starting a new one
    const animations = getInsertionSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const arrayTexts = document.getElementsByClassName('array-text');
        const [barOneIdx, barTwoIdx, action] = animations[i];

        if (action === 'compare') {
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const timeoutId = setTimeout(() => {
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
            }, i * ANIMATION_SPEED_MS);
            timeoutsRef.current.push(timeoutId);
        } else if (action === 'swap') {
            const timeoutId = setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const textOne = arrayTexts[barOneIdx];
                const textTwo = arrayTexts[barTwoIdx];

                // Swap the heights and inner text
                let tempHeight = barOneStyle.height;
                barOneStyle.height = barTwoStyle.height;
                barTwoStyle.height = tempHeight;

                let tempText = textOne.innerHTML;
                textOne.innerHTML = textTwo.innerHTML;
                textTwo.innerHTML = tempText;

                // Revert the colors back to normal
                barOneStyle.backgroundColor = PRIMARY_COLOR;
                barTwoStyle.backgroundColor = PRIMARY_COLOR;
            }, i * ANIMATION_SPEED_MS);
            timeoutsRef.current.push(timeoutId);
        }
    }
};

    const mergeSort = () => {
        stopSort(); // Stop any ongoing sort before starting a new one
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
                const timeoutId = setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
                timeoutsRef.current.push(timeoutId);
            } else {
                const timeoutId = setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const textElement = arrayTexts[barOneIdx];
                    barOneStyle.height = `${newHeight}px`;
                    textElement.innerHTML = newHeight;
                }, i * ANIMATION_SPEED_MS);
                timeoutsRef.current.push(timeoutId);
            }
        }
    };

    const bubbleSort = () => {
        stopSort(); // Stop any ongoing sort before starting a new one
        const animations = getBubbleSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const arrayTexts = document.getElementsByClassName('array-text');
            const isColorChange = i % 4 < 2; // Change color during comparison
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                const timeoutId = setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
                timeoutsRef.current.push(timeoutId);
            } else {
                const timeoutId = setTimeout(() => {
                    const [barIdx, newHeight] = animations[i];
                    const barStyle = arrayBars[barIdx].style;
                    const textElement = arrayTexts[barIdx];
                    barStyle.height = `${newHeight}px`;
                    textElement.innerHTML = newHeight;
                }, i * ANIMATION_SPEED_MS);
                timeoutsRef.current.push(timeoutId);
            }
        }
    };

    const quickSort = () => {
        stopSort(); // Stop any ongoing sort before starting a new one
        const animations = getQuickSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const arrayTexts = document.getElementsByClassName('array-text');
            const [action, barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
    
            if (action === 'compare') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const timeoutId = setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
                timeoutsRef.current.push(timeoutId);
            } else if (action === 'revert') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const timeoutId = setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
                timeoutsRef.current.push(timeoutId);
            } else if (action === 'swap') {
                const timeoutId = setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const textOne = arrayTexts[barOneIdx];
                    const textTwo = arrayTexts[barTwoIdx];
    
                    // Swap the heights and inner text
                    barOneStyle.height = `${barTwoHeight}px`;
                    barTwoStyle.height = `${barOneHeight}px`;
                    textOne.innerHTML = barTwoHeight;
                    textTwo.innerHTML = barOneHeight;
                }, i * ANIMATION_SPEED_MS);
                timeoutsRef.current.push(timeoutId);
            }
        }
    };

    const generateArray = useCallback(() => {
        stopSort(); // Stop any ongoing sort when generating a new array
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
        <div className="w-screen overflow-hidden">
            <div className="flex w-[90%] mt-5 flex-wrap gap-2 justify-around items-center mx-auto my-2 px-4">
                <div className="flex mb-10 flex-col">
                    <label>Size of array</label>
                    <input
                        type="range"
                        min="5"
                        max="50"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        className="h-1 mt-2"
                    />
                    <div className='flex flex-col relative gap-2 top-4 ' >
                    <label>Animation Speed</label>
                    <input
                        type="range"
                        min="5"
                        max="100"
                        value={ANIMATION_SPEED_MS}
                        onChange={(e) => SET_ANIMATION_SPEED_MS(Number(e.target.value))}
                        className="h-1"
                    />
                    </div>

                </div>
                <div className='flex mx-auto justify-between gap-4'>
                    <button
                        className="bg-green-800 w-[120px] text-white px-3 py-2 rounded-lg"
                        onClick={mergeSort}
                    >
                        Merge Sort
                    </button>
                    <button
                        className="bg-green-800 w-[120px] text-white px-3 py-2 rounded-lg"
                        onClick={bubbleSort}
                    >
                        Bubble Sort
                    </button>
                    <button
                        className="bg-green-800 w-[120px] text-white px-3 py-2 rounded-lg"
                        onClick={quickSort}
                    >
                        Quick Sort
                    </button>
                    <button
                        className="bg-green-800 w-[120px] text-white px-3 py-2 rounded-lg"
                        onClick={insertionSort}
                    >
                        Insertion Sort
                    </button>
                </div>
                <div className='flex mx-auto w-[350px] gap-2'>
                    <button
                        onClick={generateArray}
                        className="bg-green-500 w-1/2 text-white p-2  rounded-md"
                    >
                        Generate New Array
                    </button>
                    <button
                        onClick={stopSort}
                        className="bg-red-500 w-1/2 text-white p-2 rounded-md"
                    >
                        Stop Sorting
                    </button>
                </div>
                <div></div>
            </div>
            <h1 className='font-bold text-center'>Original array</h1>
            <div className='flex text-[14px] flex-wrap justify-center max-w-screen px-2 gap-2'>
                {array.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
            <div className={`flex ${array.length > 20 ? "gap-0" : "gap-2"} absolute bottom-[20px] px-2 justify-center w-full`}>
                {array.map((item, index) => (
                    <div className="flex items-center flex-col-reverse" key={index}>
                        <p className="array-text text-center mx-auto w-[30px]">{item}</p>
                        <div
                            className="array-bar bg-blue-500 hover:bg-blue-600 rounded-t-md"
                            style={{
                                height: `${item}px`,
                                width: `${Math.max(15, 50 - length)}px`,
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SortingVisualizer;
