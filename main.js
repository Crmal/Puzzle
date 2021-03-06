const container = document.querySelector(".image-container")
const startButton = document.querySelector(".start-button")
const gameText = document.querySelector(".game-text")
const playTime = document.querySelector(".play-time")
const cheatButton = document.querySelector(".cheat-button")
const tileCount = 16;
const dragged = {
  el: null,
  class: null,
  index: null,
}
let tiles = [];
let isPlaying = false;
let timeInterval = null;
let time = 0;

//function
function checkStatus(){
  const currentList= [...container.children];
  const unMatchedList = currentList.filter((child, index) =>Number(child.getAttribute("data-index")) !== index)
  if(unMatchedList.length === 0){
    gameText.getElementsByClassName.display = "block";
    isPlaying = false;
    clearInterval(timeInterval)
  }
}

function setGame(){
  isPlaying = true;
  time=0;
  container.innerHTML = "";
  gameText.style.display = 'none'
  clearInterval(timeInterval);
  tiles = createImageTiles();
  tiles.forEach(tile => container.appendChild(tile))
  setTimeout(() => {
    container.innerHTML = "";
    shuffle(tiles).forEach(tile => container.appendChild(tile))
    timeInterval = setInterval(()=>{
      playTime.innerText = time;
      time++;
    },1000)
  }, 5000)
}

function createImageTiles(){
  const tempArray = [];
  Array(tileCount).fill().forEach( (_, i)=>{
    const li = document.createElement("li");
    li.setAttribute('data-index', i)
    li.setAttribute('daraggable','true')
    li.classList.add(`list${i}`);
    tempArray.push(li)
  })
  return tempArray;
}

function shuffle(array){
  let index = array.length -1;
  while(index > 0){
      const randomIndex = Math.floor(Math.random() * (index+1));
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]]
      index--;
  }
  return array;
}

// events
container.addEventListener('dragstart', e =>{
  if(!isPlaying) return;
  const obj = e.target
  dragged.el = e.target;
  dragged.class = e.target.className;
  dragged.index = [...e.target.parentNode.children].indexOf(e.target);
  console.log(obj)
})
container.addEventListener('dragover', e =>{
  e.preventDefault()
})
container.addEventListener('drop', e =>{
  if(!isPlaying) return;
  const obj = e.target
  let originPlace;
  let isLast = false;
  console.log(obj)

  if(obj.className !== dragged.class){
    let originPlace;
    let isLast = false;
    if(dragged.el.nextSibling){
      originPlace = dragged.el.nextSibling
    } else{
      originPlace = dragged.el.previousSibling
      isLast = true;
    }
    const droppedIndex = [...obj.parentNode.children].indexOf(obj);
    dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el)
    isLast ? originPlace.after(obj) : originPlace.before(obj)
  }
  checkStatus()
  
})

startButton.addEventListener('click', () => {
  setGame()
})
cheatButton.addEventListener('click', () => {
  
})
