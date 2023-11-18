import React from 'react';
import {getMergeSortAnimations, getQuickSortAnimations, getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 100;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      numberOfBars: NUMBER_OF_ARRAY_BARS,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.numberOfBars; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
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
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <input
          type="number"
          value={this.state.numberOfBars}
          onChange={(e) => this.setState({ numberOfBars: parseInt(e.target.value)})}
        />
        <button onClick={() => this.resetArray()}>Set Number of Bars and Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
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
