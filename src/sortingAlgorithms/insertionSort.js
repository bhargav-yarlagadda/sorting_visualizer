// sortingAlgorithms/insertionSort.js

export const getInsertionSortAnimations = (array) => {
    const animations = [];
    const auxArray = array.slice();
    for (let i = 1; i < auxArray.length; i++) {
        let j = i;
        while (j > 0 && auxArray[j] < auxArray[j - 1]) {
            // Push the comparison and swap animations
            animations.push([j, j - 1, 'compare']);
            animations.push([j, j - 1, 'swap']);
            // Swap the values in the auxiliary array
            let temp = auxArray[j];
            auxArray[j] = auxArray[j - 1];
            auxArray[j - 1] = temp;
            j--;
        }
    }
    return animations;
};
