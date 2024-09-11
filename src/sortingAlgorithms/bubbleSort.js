export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, animations);
    return animations;
}

function bubbleSortHelper(array, animations) {
    const n = array.length;
    let swapped;
    
    // Perform the bubble sort
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            // Push the indices of the elements being compared (for color change)
            animations.push([j, j + 1]);
            // Push again to revert the color back after comparison
            animations.push([j, j + 1]);
            
            if (array[j] > array[j + 1]) {
                // If elements are out of order, push the swap action
                animations.push([j, array[j + 1]]);
                animations.push([j + 1, array[j]]);
                
                // Perform the swap in the array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                
                swapped = true;
            } else {
                // Push no swap (just the same elements to keep visualization flow)
                animations.push([j, array[j]]);
                animations.push([j + 1, array[j + 1]]);
            }
        }
        
        // If no elements were swapped, the array is sorted
        if (!swapped) break;
    }
}
