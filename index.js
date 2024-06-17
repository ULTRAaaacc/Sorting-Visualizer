let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let algorithm_select = document.getElementById("algorithm_select");
let bars_container = document.getElementById("bars_container");
let speed_range = document.getElementById("speed_range");

let minRange = 1;
let maxRange = 20;
let numOfBars = 20;
let unsorted_array = new Array(numOfBars);

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
    for (let i = 0; i < numOfBars; i++) {
        unsorted_array[i] = randomNum(minRange, maxRange);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array) {
    bars_container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * 10 + "px";
        bars_container.appendChild(bar);
    }
}

randomize_array.addEventListener("click", function() {
    createRandomArray();
    renderBars(unsorted_array);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "#3498db";
                    }
                }
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bars[j].style.height = array[j] * 10 + "px";
                bars[j].style.backgroundColor = "#e74c3c";
                bars[j + 1].style.height = array[j + 1] * 10 + "px";
                bars[j + 1].style.backgroundColor = "#e74c3c";
                await sleep(100 - speed_range.value);
            }
        }
        await sleep(100 - speed_range.value);
    }
    return array;
}

async function quickSort(array, left, right) {
    if (left < right) {
        let pivotIndex = await partition(array, left, right);
        await quickSort(array, left, pivotIndex - 1);
        await quickSort(array, pivotIndex + 1, right);
    }
    return array;
}

async function partition(array, left, right) {
    let pivot = array[right];
    let i = left - 1;
    let bars = document.getElementsByClassName("bar");
    for (let j = left; j < right; j++) {
        if (array[j] < pivot) {
            i++;
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            bars[i].style.height = array[i] * 10 + "px";
            bars[i].style.backgroundColor = "#e74c3c";
            bars[j].style.height = array[j] * 10 + "px";
            bars[j].style.backgroundColor = "#e74c3c";
            await sleep(100 - speed_range.value);
        }
    }
    let temp = array[i + 1];
    array[i + 1] = array[right];
    array[right] = temp;
    bars[i + 1].style.height = array[i + 1] * 10 + "px";
    bars[i + 1].style.backgroundColor = "#e74c3c";
    bars[right].style.height = array[right] * 10 + "px";
    bars[right].style.backgroundColor = "#e74c3c";
    await sleep(100 - speed_range.value);
    return i + 1;
}

async function mergeSort(array, start, end) {
    if (start < end) {
        let mid = Math.floor((start + end) / 2);
        await mergeSort(array, start, mid);
        await mergeSort(array, mid + 1, end);
        await merge(array, start, mid, end);
    }
    return array;
}

async function merge(array, start, mid, end) {
    let leftArray = array.slice(start, mid + 1);
    let rightArray = array.slice(mid + 1, end + 1);
    let bars = document.getElementsByClassName("bar");
    let i = 0, j = 0, k = start;
    
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            bars[k].style.height = array[k] * 10 + "px";
            bars[k].style.backgroundColor = "#e74c3c";
            i++;
        } else {
            array[k] = rightArray[j];
            bars[k].style.height = array[k] * 10 + "px";
            bars[k].style.backgroundColor = "#e74c3c";
            j++;
        }
        await sleep(100 - speed_range.value);
        k++;
    }

    while (i < leftArray.length) {
        array[k] = leftArray[i];
        bars[k].style.height = array[k] * 10 + "px";
        bars[k].style.backgroundColor = "#e74c3c";
        await sleep(100 - speed_range.value);
        i++;
        k++;
    }

    while (j < rightArray.length) {
        array[k] = rightArray[j];
        bars[k].style.height = array[k] * 10 + "px";
        bars[k].style.backgroundColor = "#e74c3c";
        await sleep(100 - speed_range.value);
        j++;
        k++;
    }
}

async function insertionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j + 1] * 10 + "px";
            bars[j + 1].style.backgroundColor = "#e74c3c";
            j--;
            await sleep(100 - speed_range.value);
        }
        array[j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * 10 + "px";
        bars[j + 1].style.backgroundColor = "#e74c3c";
        await sleep(100 - speed_range.value);
    }
    return array;
}

async function selectionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        let temp = array[minIndex];
        array[minIndex] = array[i];
        array[i] = temp;
        bars[minIndex].style.height = array[minIndex] * 10 + "px";
        bars[minIndex].style.backgroundColor = "#e74c3c";
        bars[i].style.height = array[i] * 10 + "px";
        bars[i].style.backgroundColor = "#e74c3c";
        await sleep(100 - speed_range.value);
    }
    return array;
}

sort_btn.addEventListener("click", function() {
    let algorithm = algorithm_select.value;
    switch (algorithm) {
        case "bubble":
            bubbleSort(unsorted_array);
            break;
        case "quick":
            quickSort(unsorted_array, 0, unsorted_array.length - 1);
            break;
        case "merge":
            mergeSort(unsorted_array, 0, unsorted_array.length - 1);
            break;
        case "insertion":
            insertionSort(unsorted_array);
            break;
        case "selection":
            selectionSort(unsorted_array);
            break;
    }
});
