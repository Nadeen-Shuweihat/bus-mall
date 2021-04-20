'use strict';

let firstImage = document.getElementById('first-img');
let secondImage = document.getElementById('second-img');
let thirdImage = document.getElementById('third-img');
let container = document.getElementById('imgsec');
let list = document.getElementById('list');


let maxAtt = 25;
let counts = 0;



let firstIndex;
let secondIndex;
let thirdIndex;
let arrIndex=[];

let arrOfnames = [];
let arrOfVotes = [];
let arrOfShown = [];


Mall.arrImages = [];



function Mall(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.shown = 0;
  Mall.arrImages.push(this);
  arrOfnames.push(this.name);

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



  while (firstIndex === secondIndex || firstIndex === thirdIndex || secondIndex === thirdIndex || arrIndex.includes(firstIndex) || arrIndex.includes(secondIndex) || arrIndex.includes(thirdIndex)){
    firstIndex = generateRandomIndex();
    secondIndex = generateRandomIndex();
    thirdIndex = generateRandomIndex();
  }

  arrIndex[0] = firstIndex;
  arrIndex[1] = secondIndex;
  arrIndex[2] = thirdIndex;

  firstImage.setAttribute('src', Mall.arrImages[firstIndex].source ,Mall.arrImages[firstIndex].shown++);
  secondImage.setAttribute('src', Mall.arrImages[secondIndex].source,Mall.arrImages[secondIndex].shown++);
  thirdImage.setAttribute('src', Mall.arrImages[thirdIndex].source, Mall.arrImages[thirdIndex].shown++);


}
renderThreeImages();

container.addEventListener('click',handleClicking);
// firstImage.addEventListener('click', handleClicking);
// secondImage.addEventListener('click', handleClicking);
// thirdImage.addEventListener('click', handleClicking);



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
    Saving();
    renderThreeImages();
  }
  else {


    container.removeEventListener('click',handleClicking);

    // firstImage.removeEventListener('click', handleClicking);
    // secondImage.removeEventListener('click', handleClicking);
    // thirdImage.removeEventListener('click', handleClicking);
  }

}


let button = document.getElementById('btn');
// list.appendChild(button);
button.addEventListener('click', showingList);

function showingList(){
  let ul = document.getElementById('unordered');
  list.appendChild(ul);
  for (let i = 0; i < Mall.arrImages.length; i++) {
    arrOfVotes.push(Mall.arrImages[i].votes);
    arrOfShown.push(Mall.arrImages[i].shown);
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${Mall.arrImages[i].name} had ${Mall.arrImages[i].votes} votes, and was seen ${Mall.arrImages[i].shown}`;
  }

  button.removeEventListener('click',showingList);
  chart();
 
 
}

function Saving(){
  let stData = JSON.stringify(Mall.arrImages);
  localStorage.setItem('Item',stData);

}


function Newsave(){
  let previousCh = JSON.parse(localStorage.getItem('Item'));
  if (previousCh !== null){
    Mall.arrImages = previousCh;
  }
}

Newsave();

function chart(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrOfnames,
      datasets: [{
        label: 'Number Of votes',
        data: arrOfVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderWidth: 1
      },{
        label:'# of Shown',
        data: arrOfShown,
        backgroundColor:[
          'rgb(192,192,192)'
        ],
        borderWidth: 1
      }]
    }
  });
}
