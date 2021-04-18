'use strict';

let firstImage = document.getElementById('first-img');
let secondImage = document.getElementById('second-img');
let thirdImage = document.getElementById('third-img');


let maxAtt = 25;
let counts = 0;



let firstIndex;
let secondIndex;
let thirdIndex;

Mall.arrImages = [];


function Mall(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shown = 0;
  Mall.arrImages.push(this);

}
//console.log(Mall.arrImages);

new Mall('bag', '../img/bag.jpg');
new Mall('banana', '../img/banana.jpg');
new Mall('bathroom', '../img/bathroom.jpg');
new Mall('boots', '../img/boots.jpg');
new Mall('breakfast', '../img/breakfast.jpg');
new Mall('bubblegum', '../img/bubblegum.jpg');
new Mall('chair', '../img/chair.jpg');
new Mall('cthulhu', '../img/cthulhu.jpg');
new Mall('dog-duck', '../img/dog-duck.jpg');
new Mall('dragon', '../img/dragon.jpg');
new Mall('pen', '../img/pen.jpg');
new Mall('pet-sweep', '../img/pet-sweep.jpg');
new Mall('scissors', '../img/scissors.jpg');
new Mall('shark', '../img/shark.jpg');
new Mall('sweep', '../img/sweep.png');
new Mall('tauntaun', '../img/tauntaun.jpg');
new Mall('unicorn', '../img/unicorn.jpg');
new Mall('usb', '../img/usb.gif');
new Mall('water-can', '../img/water-can.jpg');
new Mall('wine-glass', '../img/wine-glass.jpg');

function generateRandomIndex() {

  return Math.floor(Math.random() * Mall.arrImages.length);
}

console.log(generateRandomIndex);

function renderThreeImages() {
  firstIndex = generateRandomIndex();
  secondIndex = generateRandomIndex();
  thirdIndex = generateRandomIndex();

  while (firstIndex === secondIndex || firstIndex === thirdIndex || secondIndex === thirdIndex) {
    firstIndex = generateRandomIndex();
    secondIndex = generateRandomIndex();
  }

  firstImage.setAttribute('src', Mall.arrImages[firstIndex].source ,Mall.arrImages[firstIndex].shown++);
  secondImage.setAttribute('src', Mall.arrImages[secondIndex].source,Mall.arrImages[secondIndex].shown++);
  thirdImage.setAttribute('src', Mall.arrImages[thirdIndex].source, Mall.arrImages[thirdIndex].shown++);


}
renderThreeImages();

firstImage.addEventListener('click', handleClicking);
secondImage.addEventListener('click', handleClicking);
thirdImage.addEventListener('click', handleClicking);



function handleClicking(event) {
  counts++;
  //console.log(event.target.id);
  if (maxAtt >= counts) {
    if (event.target.id === 'first-img') {
      Mall.arrImages[firstIndex].votes++;
    } else if (event.target.id === 'second-img') {
      Mall.arrImages[secondIndex].votes++;
    } else if (event.target.id === 'third-img') {
      Mall.arrImages[thirdIndex].votes++;
    }
    renderThreeImages();
  }
  else {
    let ul = document.getElementById('unordered');
    for (let i = 0; i < Mall.arrImages.length; i++) {
      let li = document.createElement('li');
      ul.appendChild(li);
      li.textContent = `${Mall.arrImages[i].name} had ${Mall.arrImages[i].votes} votes, and was seen ${Mall.arrImages[i].shown}`;
    }



    firstImage.removeEventListener('click', handleClicking);
    secondImage.removeEventListener('click', handleClicking);
    thirdImage.removeEventListener('click', handleClicking);
  }
}
