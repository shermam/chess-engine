## Chess Engine

[Click here](https://shermam.github.io/chess-engine/index.html) to see it at work.

**WARNING** This engine does not handle en pasant and castle yet. Also checks and checkmates are not handle directly.

This is an attempt to implement a chess engine in JS.
The idea is to get a better understanding of the minimax algorithm and practice optimization of
long running tasks.

## Done

- [x] Use `jsconfig.json` to get type safety with pure JS files
- [x] Break document scripts and worker scripts into separate folders with their own `jsconfig.json` in order to get correct type check depending on the environment.
- [x] Implement a board representation in JS. For now I am using an array of numbers. More specifically an `Int8Array` with length 64 representing all 64 squares. Then the value `0` represents an empty square. Negative values represent black pieces and positive values represent white pieces. For the specific values I am using for now the commonly agreed upon values of Pawn = 1, Knight and Bishop = 3, Rook = 5, Queen = 9. But since I needed to differentiate knights from bishops I thought about changing the value of bishops to 4, but it seemed too much. I settled for now on multiplying every piece value by 3. So now the knight is worth 9 and the bishop is worth 10. So this way the difference is less significant. And for the king I set the value of 126. This is more than the sum of the value of all other pieces. So to evaluate a position I just sum all of the numbers. It is not perfect, but as a small proof of concept it will do.
- [x] Implement a rendering function that takes an `Int8Array` representation of a chess position and draws the position on the screen. I am using the Unicode chess pieces so that I don't need to load my own images.
- [x] Implement some event listeners that capture a move made with the mouse and translate that to coordinates of the board (from an to index in the array). That then is evaluated to see if it is a valid move, applied to the current position to generate a new current position.
- [x] Implement moves logic. From a given position I want to know what are the possible moves. Each move is a number tuple ([from, to]) that represent coordinates in the array. This means that you can get a piece from the `from` index in the array and place it overriding the value in the `to` index in the array. This already takes care of the capture logic, since if there is an opponent's piece on the destination, that will get overridden/captured. And if there is a friendly piece, then the move is invalid. I consider the moving logic of all of the pieces to determine what are all of the possible moves.
- [x] Implement a random position picker to chose random moves for black
- [x] Implement a position picker that always picks the move that results in a position with best value for black. (This makes black perform every possible capture. Since it looks no further than one move it does not consider recaptures)
- [x] Implement a minimax algorithm that looks ahead multiple levels before deciding on a move. (This is the ultimate goal. But for now, my first implementation is suuuper slow. It takes ~30 for every move and it fries the CPU with the depth set to 3 levels deep)

## To Do

- [ ] Handle castle. For now this game does not handle castle moves
- [ ] Handle en pasant.
- [ ] Handle checks. The evaluation logic should choose the right move since the king is set to have the highest possible value. But the current implementation allows for voluntarily entering in check.
- [ ] Handle checkmate. The game and the recursive evaluation should stop at checkmate.
- [ ] Improve recursive logic speed.
- [ ] Add tests
- [ ] Add CI check
