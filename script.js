// selectors
const body = document.querySelector('body')
const boxes = document.querySelectorAll('.griditem')
const gamearea = document.querySelector('.gamearea')

let gameOps = {
    mode: '',
    name1: '',
    name2: '',
    symbol1: '',
    symbol2: ''
}



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

// game logic for 2 players
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

// window for player name and symbol
const windowsPage = document.createElement('div')
windowsPage.className = 'windowsPage'
body.appendChild(windowsPage)
const playersOps = document.createElement('div')
playersOps.className = 'playersOps'
windowsPage.appendChild(playersOps)
const lablePlayerOps = document.createElement('label')
lablePlayerOps.for = 'playerOps'
lablePlayerOps.textContent = 'Against who do you wanna play?'
playersOps.appendChild(lablePlayerOps)
const ai = document.createElement('div')
ai.className = 'ai'
playersOps.appendChild(ai)
const twoPlayers = document.createElement('div')
twoPlayers.className = 'twoplayers'
playersOps.appendChild(twoPlayers)


const startGameBtn = function(){
    body.insertAdjacentHTML('beforeend',
        `<div class="startgame">
            <div class="btn"></div>
        </div>`
    )
    const startgame = document.querySelector('.startgame')
    const btn = document.querySelector('.btn')
    btn.addEventListener('click', e=>{
        startgame.remove()
        if(gameOps.mode == 'ai'){
            console.log('ai')
        }
    })
}
const getSymbolWindow = function(){
    windowsPage.innerHTML = 
    `<div class="symbols">
    <div class="header">pick your symbol:</div>
    <div class="symbolCon">
    <div class="symbol x"></div>
    <div class="symbol o"></div>`
    const xsymbol = document.querySelector('.x')
    const osymbol = document.querySelector('.o')
    const symbolCon = document.querySelector('.symbolCon')
    function close(){windowsPage.remove()}
    symbolCon.addEventListener('click', e=>{
        if(e.target == xsymbol){
            gameOps.symbol1 = 'X'
            gameOps.symbol2 = 'O'
            close()
        }
        if(e.target == osymbol){
            gameOps.symbol2 = 'X'
            gameOps.symbol1 = 'O'
            close()
        }
        startGameBtn()
    })
}


playersOps.addEventListener('click', e=>{
    const op = e.target.closest('div')
    if(op.className == 'twoplayers'){
        gameOps.mode = 'twoplayers'
        const form = document.createElement('form')
        windowsPage.appendChild(form)
        const names = document.createElement('div')
        names.className = 'names'
        form.appendChild(names)
        const p1 = document.createElement('div')
        p1.className = 'p1'
        names.appendChild(p1)
        const p1Label = document.createElement('label')
        p1Label.for = 'p1Name'
        p1Label.textContent = '1st Player'
        p1.appendChild(p1Label)
        const p1Input = document.createElement('input')
        p1Input.type = 'text'
        p1Input.id = 'p1Name'
        p1Input.required = true
        p1.appendChild(p1Input)
        const p2 = document.createElement('div')
        p2.className = 'p2'
        names.appendChild(p2)
        const p2Label = document.createElement('label')
        p2Label.for = 'p2Name'
        p2Label.textContent = '2nd Player'
        p2.appendChild(p2Label)
        const p2Input = document.createElement('input')
        p2Input.type = 'text'
        p2Input.id = 'p2Name'
        p2Input.required = true
        p2.appendChild(p2Input)
        const subbtn = document.createElement('button')
        subbtn.type = 'submit'
        subbtn.textContent = 'Submit'
        names.appendChild(subbtn)
        form.addEventListener('submit', e=>{
            e.preventDefault()
            form.remove()
            gameOps.name1 = p1Input.value
            gameOps.name2 = p2Input.value
            getSymbolWindow()
        })
        playersOps.remove()
    }
    else if(op.className == 'ai'){
        gameOps.mode = 'ai'
        windowsPage.innerHTML = 
        (`<div class="names">
        <form>
            <div class="onlyp1">
                <label for="onlyp1Name">Player Name:</label>
                <input type="text">
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>`)
        const form = document.querySelector('form')
        const subbtn = document.querySelector('button')
        const p1Input = document.querySelector('input')
        form.addEventListener('submit', e=>{
            e.preventDefault()
            form.remove()
            playersOps.remove()
            gameOps.name1 = p1Input.value
            gameOps.name2 = 'ai'
            getSymbolWindow()
        })
    }
})
