export function getHeapSortAnimations(array) {
    const animations = [];
    let n = array.length;
  
    // Building the heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, animations);
    }
  
    // Extracting elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      animations.push([0, i]);
      animations.push([0, i]);
      animations.push([0, array[i], i, array[0]]); // Swap the root and the last element
      [array[0], array[i]] = [array[i], array[0]]; // Swap
      heapify(array, i, 0, animations);
    }
    return animations;
  }
  
  function heapify(arr, n, i, animations) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
  
    if (l < n && arr[l] > arr[largest]) {
      largest = l;
    }
  
    if (r < n && arr[r] > arr[largest]) {
      largest = r;
    }
  
    if (largest !== i) {
      animations.push([i, largest]);
      animations.push([i, largest]);
      animations.push([i, arr[largest], largest, arr[i]]); // Swap
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest, animations);
    }
  }