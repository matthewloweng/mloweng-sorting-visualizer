export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}


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


export function getBubbleSortAnimations(array) {
  let animations = [];
  let auxArray = array.slice();
  for (let i = 0; i < auxArray.length; i++) {
    for (let j = 0; j < auxArray.length - i - 1; j++) {
      // Push them once to change their color
      animations.push([j, j + 1]);
      // Push them again to revert their color
      animations.push([j, j + 1]);
      if (auxArray[j] > auxArray[j + 1]) {
        // Swap these two values
        animations.push([j, auxArray[j + 1]]);
        animations.push([j + 1, auxArray[j]]);
        // Perform the swap
        let temp = auxArray[j];
        auxArray[j] = auxArray[j + 1];
        auxArray[j + 1] = temp;
      } else {
        // Push a redundant swap to maintain animation consistency
        animations.push([j, auxArray[j]]);
        animations.push([j + 1, auxArray[j + 1]]);
      }
    }
  }
  return animations;
}
