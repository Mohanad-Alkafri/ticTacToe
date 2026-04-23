// selectors
const boxes = document.querySelectorAll('.griditem')
const gamearea = document.querySelector('.gamearea')



// win condition
function boxCon(n){
    return boxes[n].textContent
}
function diagnal(symbol){
    if(boxCon(4) == symbol){
        if(boxCon(0) == symbol && boxCon(8) == symbol){
            alert(`${symbol} won`)
        }
        else if(boxCon(2) == symbol && boxCon(6) == symbol){
            alert(`${symbol} won`)
        }
    }
}
function vertical(symbol){
    for(let i = 0; i<=2; i++){
        if(boxCon(i) == symbol &&
            boxCon(i) == boxCon(i+3) 
            && boxCon(i) == boxCon(i+6) 
            && boxCon(i) != ''){
            alert(`${symbol} won`)
        }
    }
}
function horizantal(symbol){
    for(let i = 0; i<=6; i += 3){
        if(boxCon(i) == symbol &&
            boxCon(i) == boxCon(i+1) 
            && boxCon(i) == boxCon(i+2) 
            && boxCon(i) != ''){
            alert(`${symbol} won`)
        }
    }
}

// eventlistener for x & o
let isXturn = true
gamearea.addEventListener('click', e=>{
    const box = e.target.closest('.griditem')
    if(box.textContent != ''){return}
    box.textContent = isXturn ? 'X' : 'O'
    box.style.color = isXturn ? 'var(--xcolor)' : 'var(--ocolor)'
    isXturn = !isXturn
    setTimeout(() => {
        diagnal('X')
        diagnal('O')
        vertical('X')
        vertical('O')
        horizantal('X')
        horizantal('O')
    }, 200)
})