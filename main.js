const referenceNode = document.querySelector('script');//refecence of script node
let main = document.createElement('div');//container of container('Divs') and containerMenu
const container = document.createElement('div');//container of the grids
let containerMenu = document.createElement('div');//container of the buttons
    
//default values
let numOfDivs = 16;
let sizeOfContainer= 512;
let color= 'black';
let random= false

//functions for change the color
function eraseClick(){
    color = "white";
    random = false;
}
  
  function blackClick(){
    color = "black";
    random = false;
}

 function randomClick(){
     random = true;
 }


//add class
main.classList.add('main');
container.classList.add('content');
containerMenu.classList.add('container__menu');




//Create Title

function createTitle(){
    let title = document.createElement('h1');
    title.innerText='ETCH-A-SKETCH';
    title.classList.add('header');
    document.body.insertBefore(title,main);
}

//create Menu

function createMenu(){
    
    for(let i = 1;  i<=6;i++){

        let container = document.createElement('div');
        container.classList.add('container__content');

        let containerInput = document.createElement('div');
        containerInput.classList.add('container__input');

        let input = document.createElement('input');
        input.setAttribute('name',`input${i}`);

        containerInput.appendChild(input);

        let containerLabel = document.createElement('div');
        containerLabel.classList.add('container__label');

        let label = document.createElement('label');
        label.setAttribute('for', `input${i}`);

        containerLabel.appendChild(label);

        container.appendChild(containerLabel);
        container.appendChild(containerInput);

        containerMenu.appendChild(container);
    }

    main.appendChild(containerMenu);
}
//Create Divs and container Divs

function createDivs(num){
    for(let i=0; i<num;i++){
        let newDivs = document.createElement('div');
        newDivs.classList.add('newDivs');
        for (let j = 0; j < num; j++) {
            let newDiv = document.createElement('div');
            newDiv.classList.add('newDiv');
            newDiv.classList.add('toggleGrid');
            newDiv.style.width= sizeOfContainer/num+'px';
            newDiv.style.height= sizeOfContainer/num+'px';
            newDiv.addEventListener('mouseover',changeColor);
            newDivs.appendChild(newDiv);
        }
        container.appendChild(newDivs)      
    }
    main.appendChild(container);
}

function changeColor(){
    if(random){
    color = `rgb(${Math.random()*256},${Math.random()*256},${Math.random()*256})`;
    }
    this.style.background=color
}

//build the first print
createMenu();
createDivs(numOfDivs);
document.body.insertBefore(main,referenceNode);
createTitle();


//add content to the inputs and labels

let inputs = Array.from(document.querySelectorAll('input'));
let labels = Array.from(document.querySelectorAll('label'));

labels[0].innerText=`Clean all`;
inputs[0].setAttribute('type','button');
inputs[0].setAttribute('value','clean');

inputs[1].setAttribute('type','number');
inputs[1].setAttribute('min','0');
inputs[1].setAttribute('max','64');
inputs[1].setAttribute('value','16');
labels[1].innerHTML='Enter dimensions (one number)';

labels[2].innerText=`Clean a grid`;
inputs[2].setAttribute('type','button');
inputs[2].setAttribute('value','Eraser');

labels[3].innerText=`Black Pen`;
inputs[3].setAttribute('type','button');
inputs[3].setAttribute('value','Pen');

labels[4].innerHTML="Random Colors";
inputs[4].setAttribute('type','button');
inputs[4].setAttribute('value','Colors');

labels[5].innerHTML="Alternate Grids";
inputs[5].setAttribute('type','button');
inputs[5].setAttribute('value','Grids');


// add function to the inputs 

//resize the grids
inputs[1].addEventListener('change',function(e){
    numOfDivs=e.target.value;
    document.querySelectorAll('.newDivs').forEach(e=> e.remove())
    createDivs(numOfDivs);
    const allDivs = Array.from(document.querySelectorAll('.newDiv'));

    inputs[0].addEventListener('click',function(){
   allDivs.forEach(div=>div.style.background='white') 
    })
     
    inputs[5].addEventListener('click',function(){
        allDivs.forEach(div=> div.classList.toggle('toggleGrid'))
    })
})

const allDivs = Array.from(document.querySelectorAll('.newDiv'));

inputs[0].addEventListener('click',function(){
   allDivs.forEach(div=>div.style.background='white') //clean all
});

inputs[2].addEventListener('click',eraseClick);//eraser
inputs[3].addEventListener('click',blackClick);//pen
inputs[4].addEventListener('click',randomClick);//random colors

inputs[5].addEventListener('click',function(){
    allDivs.forEach(div=> div.classList.toggle('toggleGrid'))
})
