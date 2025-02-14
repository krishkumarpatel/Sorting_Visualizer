"use strict";

let isSorting = false;

// Centralize DOM selectors
const DOM = {
  warning: document.getElementById('warning'),
  algoMenu: document.querySelector(".algo-menu"),
  sizeMenu: document.querySelector(".size-menu"),
  speedMenu: document.querySelector(".speed-menu"),
  array: document.querySelector(".array"),
  generateBtn: document.querySelector("#random")
};

const showWarning = (message) => {
  const warningText = DOM.warning.querySelector('.warning-text');
  warningText.textContent = message;
  DOM.warning.classList.add('show');
  
  setTimeout(() => {
    DOM.warning.classList.remove('show');
  }, 3000);
};

const start = async () => {
  // Check if array is generated
  if (DOM.array.children.length === 0) {
    showWarning("Please generate an array first");
    return;
  }

  if (isSorting) {
    showWarning("Sorting is already in progress");
    return;
  }

  const algoValue = Number(DOM.algoMenu.value);
  let speedValue = Number(DOM.speedMenu.value);

  if (algoValue === 0) {
    showWarning("Please select an algorithm first");
    return;
  }

  // Use default values
  speedValue = speedValue || 1;

  isSorting = true;
  
  try {
    const algorithm = new sortAlgorithms(speedValue);
    switch(algoValue) {
      case 1: await algorithm.BubbleSort(); break;
      case 2: await algorithm.SelectionSort(); break;
      case 3: await algorithm.InsertionSort(); break;
      case 4: await algorithm.MergeSort(); break;
      case 5: await algorithm.QuickSort(); break;
    }
  } catch (error) {
    console.error('Sorting error:', error);
    showWarning("An error occurred during sorting");
  } finally {
    isSorting = false;
  }
};

const RenderScreen = async () => {
  if (isSorting) {
    showWarning("Please wait for sorting to complete");
    return;
  }
  
  let sizeValue = Number(DOM.sizeMenu.value);
  if (sizeValue === 0) {
    sizeValue = 10;
    DOM.sizeMenu.value = "10";
  }
  
  await RenderList();
};

const RenderList = async () => {
  const sizeValue = Number(DOM.sizeMenu.value);
  await clearScreen();

  const list = await randomList(sizeValue);
  
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    DOM.array.appendChild(node);
  }
};

const randomList = async (length) => {
  const list = [];
  const lowerBound = 1;
  const upperBound = 100;

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(randomNumber);
  }
  return list;
};

const clearScreen = async () => {
  DOM.array.innerHTML = "";
};

// Remove unused function
const RenderArray = async (sorted) => {
  // This function seems unused and can be removed
};

const response = () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("responsive");
};

// Event Listeners
document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
DOM.sizeMenu.addEventListener("change", RenderScreen);
DOM.generateBtn.addEventListener("click", RenderScreen);
