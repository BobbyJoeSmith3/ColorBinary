/*
npm install -g p5bots-server
bots-go -d /Users/SeestheEnemy/Dropbox/RISD/Fall2018/GradStudio/02_Archive/ColorBinary */

let cnv;
let fontSize = 84;
let a = 0
let b = 0;
let yPos = 0;
let finished = false;

// let ard = p5.board('/dev/cu.usbmodemFD131', 'arduino');
// let zero;
// let one;
// let submit;
let id_cred = '';
let currentEntry;
let display = false;
let imgurls = ['url(../img/jefferson_grid_1.jpg)', 'url(../img/jefferson_grid_2.jpg)', 'url(../img/jefferson_grid_3.jpg)', 'url(../img/jefferson_grid_4.jpg)', 'url(../img/jefferson_grid_5.jpg)']

let page = document.querySelector('.blah');
let form = document.querySelector('form');
let input = document.querySelector('input');
// page.style.backgroundImage = `${imgurls[3]}`;
// page.style.["background-color"] = "blue";

let letter_archive = {
  'a':'01100001',
  'b':'01100010',
  'c':'01100011',
  'd':'01100100',
  'e':'01100101',
  'f':'01100110',
  'g':'01100111',
  'h':'01101000',
}


let archive = [
  {'name':'Red Jacket',
  'name_binary': ['01010010','01100101','01100100','00100000','01001010','01100001','01100011','01101011','01100101','01110100'],
  'binary_id': ['01100001'],
  'colors':['#984149', '#545456', '#A59F99', '#CD8383', '#CD8F72', '#FDFEE5', '#7E8995', '#A1988E']},
  {'name':'Mohongo',
  'name_binary':['01001101','01101111','01101000','01101111','01101110','01100111','01101111'],
  'binary_id': ['01100010'],
  'colors': ['#A84C4C', '#C9C1BA', '#DEAFAA', '#FBF0E5', '#B8876E', '#B8615A', '#C09D79', '#6E5548']},
  {'name':'Sharitarish',
  'name_binary':['01010011','01101000','01100001','01110010','01101001','01110100','01100001','01110010','01101001','01110011','01101000'],
  'binary_id': ['01100011'],
  'colors': ['#AF5F53', '#603631', '#A3705C', '#804A40', '#3F3732', '#8C887D', '#A6857B', '#AE988B']},
  {'name':'Sequoyah',
  'name_binary':['01010011','01100101','01110001','01110101','01101111','01111001','01100001','01101000'],
  'binary_id': ['01100100'],
  'colors': ['#973E47', '#442727', '#373A41', '#808589', '#FADEA7', '#A9A196', '#443838', '#BD806B']},
  {'name':'Tenskwautawaw',
  'name_binary':['01010100','01100101','01101110','01110011','01101011','01110111','01100001','01110101','01110100','01100001','01110111','01100001','01110111'],
  'binary_id': ['01100101'],
  'colors': ['#613F38', '#9A3F3A', '#4C5969', '#D7BA92', '#71726C', '#393C43', '#825648', '#C08C76']},
  {'name':'Yoholo Micco',
  'name_binary':['01011001','01101111','01101000','01101111','01101100','01101111','00100000','01001101','01101001','01100011','01100011','01101111'],
  'binary_id': ['01100110'],
  'colors': ['#9C4341', '#FFFEE5', '#6C838E', '#7C8375', '#E0A377', '#A3967B', '#896256', '#2D2E2E']},
  {'name':'Mistippee',
  'name_binary':['01001101','01101001','01110011','01110100','01101001','01110000','01110000','01100101','01100101'],
  'binary_id': ['01100111'],
  'colors': ['#702F32', '#84807B', '#241B1C', '#FEFBD8', '#7B7D74', '#6B3C32', '#8F7A6C', '#CC9583']},
  {'name':'Corn Plant',
  'name_binary':['01000011','01101111','01110010','01101110','00100000','01010000','01101100','01100001','01101110','01110100'],
  'binary_id': ['01101000'],
  'colors': ['#B8705F', '#4C4B46', '#C3B9AB', '#748597', '#C0757C', '#F8DEAA', '#8B9884', '#A56E55']},
  {'name':'Test',
  'name_binary':['00000000'],
  'binary_id': [],
  'colors': ['#B8705F', '#4C4B46', '#C3B9AB', '#748597', '#C0757C', '#F8DEAA', '#8B9884', '#A56E55']}
]

let genocide = [
  [0,1,0,0,0,1,1,1],
  [0,1,0,0,0,1,0,1],
  [0,1,0,0,1,1,1,0],
  [0,1,0,0,1,1,1,1],
  [0,1,0,0,0,0,1,1],
  [0,1,0,0,1,0,0,1],
  [0,1,0,0,0,1,0,0],
  [0,1,0,0,0,1,0,1]];

function setup() {
  cnv = createCanvas(720, 400);
  centerCanvas();
  frameRate(8);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  // led = board.pin(9, 'LED');
  // zero = ard.pin(5, 'BUTTON');
  // one = ard.pin(3, 'BUTTON');
  // submit = ard.pin(2, 'BUTTON');
  //
  // zero.read();
  // zero.released(addByte(0));
  // one.read();
  // one.released(addByte(1));
}



// function addByte(byte){
//   id_cred += byte;
//   console.log(`id_cred: ${id_cred}`);
// }

function draw() {
  if (display){
    let bgcolor = currentEntry.colors[getRandomInt(currentEntry.colors.length)];
    background(bgcolor);
    yPos = yPos - (height/(genocide.length * genocide[a].length));
    if (yPos < 0) {
      yPos = height;
    }
    line(0, yPos, width, yPos);
    displayBinary(genocide);
  }
}

function centerCanvas() {
  let cnvX = (windowWidth - width) /2;
  let cnvY = (windowHeight - height) /2;
  cnv.position(cnvX, cnvY);
}

function windowResized() {
  centerCanvas();
}

function displayBinary(binary) {
  console.log(`a = ${a}, b = ${b}`);
  if (b < binary[a].length) {
    text(binary[a][b], 50, 50);
    console.log(`option 1: ${binary[a][b]}`);
  }
  else if (a < binary.length) {
    a++;
    b = 0;
    text(binary[a][b], 50, 50);
    console.log(`option 2: ${binary[a][b]}`);
  }
  b++;
  if (a == binary.length-1 && b == binary[a].length) {
    clear();
    background('rgba(0,255,0, 0)');
    page.style.backgroundImage = `${imgurls[getRandomInt(5)]}`;
    a = 0;
    b = 0;
    console.log("finished");
    display = false;
    finished = true;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}




// function keyPressed() {
//   if (key === '0'){
//     id_cred += '0';
//     console.log(`id_cred: ${id_cred}`);
//   } else if (key === '1') {
//     id_cred += '1';
//     console.log(`id_cred: ${id_cred}`);
//   } else if (keyCode === ENTER){
//     console.log('Checking ID!');
//     checkID();
//   } else if (keyCode === RETURN) {
//     console.log('Checking ID!');
//     checkID();
//   }
// }

function receiveInput(evt) {
  evt.preventDefault();
  checkID(input.value);
  console.log("THIS IS WHAT YOU'RE LOOKING FOR:" + input.value);
}

// function checkID(submittedID) {
//   for (let person in archive) {
//     let s = archive[person].binary_id.join('');
//     console.log(`id_cred = ${id_cred}`);
//     console.log(`s = ${s}`);
//     if (id_cred == s) {
//       id_cred = '';
//       console.log(`${archive[person].name} is a match!`);
//       return displayPerson(archive[person]);
//     } else {
//       console.log(`${archive[person].name} is not a match`);
//     }
//   }
//   id_cred = '';
// }

function checkID(submittedID) {
  for (let person in archive) {
    let s = archive[person].binary_id.join('');
    console.log(`id_cred = ${id_cred}`);
    console.log(`s = ${s}`);
    if (id_cred == s) {
      id_cred = '';
      console.log(`${archive[person].name} is a match!`);
      return displayPerson(archive[person]);
    } else {
      console.log(`${archive[person].name} is not a match`);
    }
  }
  id_cred = '';
}

function displayPerson(person) {
  currentEntry = person;
  display = true;
}
