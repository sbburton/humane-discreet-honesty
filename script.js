
const game = {
  xTurn: true,
  xState: [],
  oState: [],
  winningStates: [
      // Rows
      ['0', '1', '2'],
      ['3', '4', '5'],
      ['6', '7', '8'],

      // Columns
      ['0', '3', '6'],
      ['1', '4', '7'],
      ['2', '5', '8'],

      // Diagonal
      ['0', '4', '8'],
      ['2', '4', '6']
  ]
}

document.addEventListener('click', event => {
  const target = event.target
  // console.log(target);
  const isCell = target.classList.contains('gridCell')
  const isDisabled = target.classList.contains('disabled')

  if (isCell && !isDisabled) {
      // The player clicked on a cell that is still empty
    const cellValue = target.dataset.value
    game.xTurn === true
    ? game.xState.push(cellValue)
    : game.oState.push(cellValue)

    target.classList.add('disabled')
    target.classList.add(game.xTurn ? 'x' : 'o')
    game.xTurn = !game.xTurn
  }


  if (!document.querySelectorAll('.gridCell:not(.disabled)').length) {
    document.querySelector('.gameOver').classList.add('visible')
    document.querySelector('.gameOverText').textContent = 'Draw!'
    // console.log('draw');
  }

  game.winningStates.forEach(winningState => {
    const xWins = winningState.every(state => game.xState.includes(state))
    const oWins = winningState.every(state => game.oState.includes(state))

    if (xWins || oWins) {
        document.querySelectorAll('.gridCell').forEach(cell => cell.classList.add('disabled'))
        document.querySelector('.gameOver').classList.add('visible')
        document.querySelector('.gameOverText').textContent = xWins
            ? 'X wins!'
            : 'O wins!'
    }
  })
})






document.querySelector('.restart').addEventListener('click', () => {
  document.querySelector('.gameOver').classList.remove('visible')
  document.querySelectorAll('.gridCell').forEach(cell => {
      cell.classList.remove('disabled', 'x', 'o')
  })

  game.xTurn = true
  game.xState = []
  game.oState = []
})




