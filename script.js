// variables
const body = document.querySelector('body')
const boxes = document.querySelectorAll('.griditem')
const gamearea = document.querySelector('.gamearea')
const infoarea = document.querySelector('.ifoarea')
const nameA = document.querySelector('.nameA')
const nameB = document.querySelector('.nameB')
const symbolA = document.querySelector('.symbolA')
const symbolB = document.querySelector('.symbolB')
const scoreA = document.querySelector('.scoreA')
const scoreB = document.querySelector('.scoreB')
const windowsPage = document.querySelector('.windowsPage')
let name1
let name2
let symbol1
let symbol2


function player(name, symbol){
    return {name, symbol}
}

const gameboard = (function(){
    let board = ['', '', '',
                '', '', '',
                '', '', '']

    function play(index, player){
        board[index] = player
    }

    function getboard(){
        return board
    }

    const winCombos = [[0,1,2], [3,4,5], [6,7,8],
                        [0,3,6], [1,4,7], [2,5,8],
                        [0,4,8], [2,4,6]]
    let won = false
    function checkWin(){
        return winCombos.some(combo=>{
            const [a,b,c] = combo
            if(board[a] != 0 &&
                 board[a] == board[b] &&
                  board[a] == board[c]){
                    won = true
            }
            else won = false
            return won
        })
    }

    function winStatus(){
        return won
    }

    function reset(){
        return board = ['', '', '',
                '', '', '',
                '', '', '']
    }

    return {play, getboard, checkWin, winStatus, reset}
})()

const displayController = (function(){
    // game mode
    function gameMode(){
        windowsPage.insertAdjacentHTML('beforeend', `
            <div class="playersOps">
                <label for="playerOps">Against who do you wanna play?</label>
                <div class="ai op"></div>
                <div class="twoplayers op"></div>
            </div>
            `)
        }

    // names and symbols
    function ainames(){
        windowsPage.insertAdjacentHTML('beforeend', `
        <div class="names">
            <form>
                <div class="onlyp1">
                    <label for="onlyp1Name">Player Name:</label>
                    <input type="text">
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        `)
    }
    function ainamesclick(){
        const namess = document.querySelector('.names')
        const p1 = document.querySelector('input')
        const btn = document.querySelector('button')
        const form = document.querySelector('form')
        form.addEventListener('submit', e=>{
            e.preventDefault()
            name1 = p1.value
            name2 = 'Computer'
            windowsPage.remove()
        })
        return {name1, name2}

    }
    function names(){
        windowsPage.insertAdjacentHTML('beforeend', 
            `<form action="">
                <div class="names">
                    <div class="p1">
                        <label for="p1Name">1st Player Name:</label>
                        <input type="text" id="p1name" required>
                    </div>
                    <div class="p2">
                        <label for="p2Name">2nd Player Name:</label>
                        <input type="text" id="p2name" required>
                    </div>
                    <button type="submit">Submit</button>
                </div>
            </form>`)
    }
    function namesclick(){
        const namess = document.querySelector('.names')
        const p1 = document.querySelector('#p1name')
        const p2 = document.querySelector('#p2name')
        const btn = document.querySelector('button')
        const form = document.querySelector('form')
        form.addEventListener('submit', e=>{
            e.preventDefault()
            name1 = p1.value
            name2 = p2.value
            windowsPage.remove()
        })
        return {name1, name2}
    }
    function getSymbols(){
        windowsPage.insertAdjacentHTML('beforeend',`
                                <div class="symbols">
                                    <div class="header">pick your symbol:</div>
                                    <div class="symbolCon">
                                        <div class="symbol x"></div>
                                        <div class="symbol o"></div>
                                </div>`)        
    }
    function symbolsClick(){
        const symbols = document.querySelector('.symbols')
        const xsymbol = document.querySelector('.x')
        const osymbol = document.querySelector('.o')
        const symbolCon = document.querySelector('.symbolCon')
        symbolCon.addEventListener('click', e=>{
            const tsymbol = e.target.closest('.symbol')
            if(tsymbol.classList.contains('x')){
                symbol1 = 'X'
                symbol2 = 'O'
                symbols.remove()
                if(mode == 'twoPlayers'){
                    names()
                    namesclick()}
                if(mode == 'ai'){
                    ainames()
                    ainamesclick()
                }
            }
            else if(tsymbol.classList.contains('o')){
                symbol1 = 'O'
                symbol2 = 'X'
                symbols.remove()
                if(mode == 'twoPlayers'){
                    names()
                    namesclick()}
                if(mode == 'ai'){
                    ainames()
                    ainamesclick()
                }
            }
        })
        return {symbol1, symbol2}
    }

    // EventListeners and execution
    gameMode()
    const ai = document.querySelector('.ai')
    const twoPlayers = document.querySelector('.twoplayers')
    const playerOps = document.querySelector('.playersOps')
    let mode = 'nothing'
    playerOps.addEventListener('click', e=>{
        const op = e.target.closest('.op')
        if(op == null) {return}
        if(op.className == 'ai op'){
            mode = 'ai'
            playerOps.remove()
            getSymbols()
            symbolsClick()
        }
        if(op.className == 'twoplayers op'){
            mode = 'twoPlayers'
            playerOps.remove()
            getSymbols()
            symbolsClick()
        }
    })    
})()






