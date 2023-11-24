// Import React and sorting algorithms
import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort.js';
import { getHeapSortAnimations } from '../sortingAlgorithms/heapSort.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort.js';
import './SortingVisualizer.css';

// Constants for animation speed and number of bars in the visualizer
const ANIMATION_SPEED_MS = 2;
const NUMBER_OF_ARRAY_BARS = 310;

// Primary and secondary colors for the array bars
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

// Main SortingVisualizer component
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    // Initializing the state with an empty array and number of bars
    this.state = {
      array: [],
      numberOfBars: NUMBER_OF_ARRAY_BARS,
    };
  }

  // Generate a new array when the component mounts
  componentDidMount() {
    this.resetArray();
  }

  // Method to create a new array with random values
  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.numberOfBars; i++) {
      array.push(randomIntFromInterval(5, 600)); // Random values between 5 and 600
    }
    this.setState({ array });
  }

  // Merge Sort visualization
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      // Color change animations
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
        // Height change animations
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }




  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = barOneIdx !== undefined && arrayBars[barOneIdx] ? arrayBars[barOneIdx].style : null;
        const barTwoStyle = barTwoIdx !== undefined && arrayBars[barTwoIdx] ? arrayBars[barTwoIdx].style : null;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          if (barOneStyle) barOneStyle.backgroundColor = color;
          if (barTwoStyle) barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = barOneIdx !== undefined && arrayBars[barOneIdx] ? arrayBars[barOneIdx].style : null;
          if (barOneStyle) barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  



  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        // Check if elements exist before trying to access their style
        const barOneStyle = barOneIdx !== undefined && arrayBars[barOneIdx] ? arrayBars[barOneIdx].style : null;
        const barTwoStyle = barTwoIdx !== undefined && arrayBars[barTwoIdx] ? arrayBars[barTwoIdx].style : null;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          if (barOneStyle) barOneStyle.backgroundColor = color;
          if (barTwoStyle) barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight, barTwoIdx, barTwoNewHeight] = animations[i];
          if (barOneIdx !== undefined && arrayBars[barOneIdx]) {
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }
          if (barTwoIdx !== undefined && arrayBars[barTwoIdx]) {
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barTwoStyle.height = `${barTwoNewHeight}px`;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  
  

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 4 < 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        // Check if barOneIdx and barTwoIdx are defined and elements exist
        const barOneStyle = barOneIdx !== undefined && arrayBars[barOneIdx] ? arrayBars[barOneIdx].style : null;
        const barTwoStyle = barTwoIdx !== undefined && arrayBars[barTwoIdx] ? arrayBars[barTwoIdx].style : null;
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          if (barOneStyle) barOneStyle.backgroundColor = color;
          if (barTwoStyle) barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          // Check if barIdx is defined and element exists
          const barStyle = barIdx !== undefined && arrayBars[barIdx] ? arrayBars[barIdx].style : null;
          if (barStyle) barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  
  

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }


  render() {
    const { array, numberOfBars } = this.state;

    return (
      <div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                height: `${value}px`,
              }}></div>
          ))}
        </div>
        <div className="controls">
          <input
            type="number"
            value={numberOfBars}
            placeholder="Number of Bars"
            aria-label="Set number of bars"
            onChange={(e) => this.setState({ numberOfBars: parseInt(e.target.value) || 5 })}
          />
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.testSortingAlgorithms()}>Test Algorithms</button>
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
