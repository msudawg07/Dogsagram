import {dogs} from "../dog.js";

// console.log(dogs)

const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": "DEMO-API-KEY"
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

let img = document.querySelector("#mainImg");
const likesInfo = document.querySelector("#likes");
const dislikeInfo = document.querySelector("#dislikes");
const commentDisplay = document.querySelector("#commentDisplay");
const textArea = document.querySelector(".addComment");

//get random image using dog api
// let getImage = () => {
//   fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
//   .then(response => response.json())
//   .then(result => {
//     // console.log(result[0].id)
//     // console.log(result[0].url)
//     img.src = result[0].url;
//   })
//   .catch(error => console.log('error', error));
// }

function randNum() {
  return Math.floor(Math.random() * 5) + 1;
}

function randDog() {
  let random = randNum()
  for(let d in dogs) {
    if(dogs[d]['num'] == random) {
      return dogs[d]
    }
  }
}

let dog = randDog()
//get random image using my database in dog.js and all info per dog
let getImage = () => {
  //let dog = randDog();
  img.src = dog.url;
  likesInfo.innerText = `Likes: ${dog.likes}`;
  dislikeInfo.innerText = `Dislikes: -${dog.dislikes}`;
  populateComments();
  //commentDisplay.innerText = dog.comments
  //return dogs["r1f_ll5VX"].url
};

window.onload = getImage()

document.querySelector("#newImage").addEventListener("click", event => {
  dog = randDog()
  getImage();
});

document.querySelector("#likeB").addEventListener("click", event => {
  dog.likes++;
  likesInfo.innerText = `Likes: ${dog.likes}`
});

document.querySelector("#dislikeB").addEventListener("click", event => {
  dog.dislikes++;
  dislikeInfo.innerText = `Dislikes: -${dog.dislikes}`;
})


document.querySelector(".addCbutton").addEventListener("click", event => {
  dog.comments.push(textArea.value);
  //commentDisplay.innerText = dog.comments;
  textArea.value = "";
  populateComments();

})

function populateComments() {
  let h1 = document.querySelector(".commentsHead")
  let ul = document.querySelector(".oldChild")
  if(dog.comments.length == 0) {
    ul.style.visibility = 'hidden';
    commentDisplay.style.visibility = 'hidden';
    h1.style.visibility = 'hidden';
  } else {
    ul.style.visibility = 'visible';
    commentDisplay.style.visibility = 'visible';
    h1.style.visibility = 'visible'
    h1.innerText = 'Comments'
    ul.innerHTML = '';
    for(let i = 0; i < dog.comments.length; i++) {
      let li = document.createElement("li");
      li.innerText = `UserID: ${dog.comments[i]}`
      ul.appendChild(li)
  }
  }
}

// function populateComments() {
//   let oldChild = document.querySelector(".oldChild");

//   if(oldChild) {
//     let ul = document.createElement("ul")
//     ul.setAttribute("class", "listOfComments");
//     for(let i = 0; i < dog.comments.length; i++) {
//       let li = document.createElement("li");
//       li.innerText = `UserID: ${dog.comments[i]}`
//       ul.appendChild(li)
//     }
//     commentDisplay.replaceChild(ul, oldChild)
//   } else {
//     for(let i = 0; i < dog.comments.length; i++) {
//       let li = document.createElement("li");
//       li.innerText = `UserID: ${dog.comments[i]}`
//       oldChild.appendChild(li)
//     }
//     //commentDisplay.appendChild(ul)
//   }




//   // let oldChild = document.querySelector("")
//   // commentDisplay.replaceChild(ul)
// }
