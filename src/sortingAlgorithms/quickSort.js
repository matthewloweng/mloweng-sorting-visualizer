export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(arr, start, end, animations) {
    if (start >= end) return;
  
    let index = partition(arr, start, end, animations);
    quickSortHelper(arr, start, index - 1, animations);
    quickSortHelper(arr, index + 1, end, animations);
  }
  
  function partition(arr, start, end, animations) {
    const pivotValue = arr[end];
    let pivotIndex = start; 
    for (let i = start; i < end; i++) {
        animations.push([i, end]); // Compare: pivot and current element
        animations.push([i, end]); // Revert color
        if (arr[i] < pivotValue) {
            animations.push([i, arr[pivotIndex]]); // Swap elements
            animations.push([pivotIndex, arr[i]]); // Swap elements
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
        }
    }
    animations.push([pivotIndex, arr[end]]); // Swap elements
    animations.push([end, arr[pivotIndex]]); // Swap elements
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    return pivotIndex;
  }