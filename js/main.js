(function(doc) {
	const gameBoard = doc.querySelector("#board");

	function init(container) {
		// Mix up numbers 1 - 15 into array to be placed in the board squares
		const squareVals = randomize(Array.from({length: 16}).map(Number.call, Number));

		for (let i = 0; i < squareVals.length; i++) {
			let val = squareVals[i];

			const squareContainer = doc.createElement('div');
			const square = doc.createElement('div');

			// Insert HTML structure and number into each square
			squareContainer.className = 'square-container';
			squareContainer.setAttribute('column', (i % 4 + 1));
			squareContainer.setAttribute('row', Math.ceil((i + 1) / 4));
			square.className = val ? 'square' : 'square empty'; // Zero will be the empty slot
			square.innerHTML = val;

			squareContainer.appendChild(square);
			container.appendChild(squareContainer);

			squareContainer.addEventListener('click', makeMove);
		}
	}

	function makeMove(e) {
		const square = e.target.parentNode;
		const row = square.getAttribute('row');
		const column = square.getAttribute('column');
		const squaresInRow = square.parentNode.querySelectorAll(`div[row="${row}"]`);
		const squaresInColumn = square.parentNode.querySelectorAll(`div[column="${column}"`);

		// Look for the empty square along each axis from selected square
		let emptySquare = findEmptySquare(squaresInRow) || findEmptySquare(squaresInColumn);

		// If empty square isn't along either axis, can't move
		if (!emptySquare) {
			return;
		}

		if (emptySquare.getAttribute('row') === row) {
			moveRow(square, emptySquare, squaresInRow);
		} else {
			moveColumn(square, emptySquare, squaresInColumn);
		}
	}

	function moveSquares(square, emptySquare, group, attr) {
		const groupArray = Array.from(group);
		const sequence = integersBetween(emptySquare.getAttribute(attr), square.getAttribute(attr));
		const emptyHTML = emptySquare.innerHTML;
		let newSpot = emptySquare;
		let oldSpot;

		// Shift each square's content over one in the direction of the empty square
		for (let i = 0; i < sequence.length; i++) {
			oldSpot = groupArray.filter((el) => el.getAttribute(attr) == sequence[i + 1])[0]; // jshint ignore:line
			newSpot.innerHTML = oldSpot ? oldSpot.innerHTML : emptyHTML;
			newSpot = oldSpot;
		}
	}

	function moveColumn(square, emptySquare, column) {
		moveSquares(square, emptySquare, column, 'row');
	}

	function moveRow(square, emptySquare, row) {
		moveSquares(square, emptySquare, row, 'column');
	}

	function integersBetween(fromInt, toInt) {
		const higher = fromInt > toInt ? fromInt : toInt;
		const lower = higher === fromInt ? toInt : fromInt;
		let arr = [];

		for (let i = lower; i <= higher; i++) {
			arr.push(i);
		} 

		return (higher === fromInt ? arr.reverse() : arr);
	}

	function findEmptySquare(squares) {
		for (let i = 0; i < squares.length; i++) {
			let current = squares[i];
			if (current.childNodes[0].classList.contains('empty')) {
				return current;
			}
		}
	}

	function randomize(arr) {
		let newArr = arr.slice();
		for (let i = newArr.length; i; i--) {
			let newIndex = Math.floor(Math.random() * i);
			[newArr[i - 1], newArr[newIndex]] = [newArr[newIndex], newArr[i - 1]];
		}

		return newArr;
	}

	init(gameBoard);
})(document);
