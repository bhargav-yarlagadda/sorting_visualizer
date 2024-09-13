export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, low, high, animations) {
    if (low < high) {
        const pivotIdx = partition(array, low, high, animations);
        quickSortHelper(array, low, pivotIdx - 1, animations);
        quickSortHelper(array, pivotIdx + 1, high, animations);
    }
}

function partition(array, low, high, animations) {
    const pivotValue = array[high];
    let pivotIdx = low;

    for (let i = low; i < high; i++) {
        // Push the indices being compared for visualization (for color change)
        animations.push(['compare', i, high]);
        // Push to revert the color back after comparison
        animations.push(['revert', i, high]);

        if (array[i] < pivotValue) {
            // Push the swap action for visualization
            animations.push(['swap', i, pivotIdx, array[i], array[pivotIdx]]);
            // Swap elements in the array
            [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
            pivotIdx++;
        }
    }
    // Swap the pivot element to its correct position
    animations.push(['swap', pivotIdx, high, array[pivotIdx], array[high]]);
    [array[pivotIdx], array[high]] = [array[high], array[pivotIdx]];

    return pivotIdx;
}
