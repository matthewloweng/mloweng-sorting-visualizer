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