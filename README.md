# Game of Corners
This is a russian board game for two players where the objective is to move your pieces to the opposite side using one of the 2 types of turns at a time:
1) Move a piece in any direction (including diaganal) by 1 square, if its free
2) Jump over another piece on the board (yours or opponents) to a free square and keep jumping until there are no good jumps left. Jumps can be horizontal, vertical or diaganal in any direction, including backwards, must be over one piece at a time and cannot be mixed with type 1 turn described above. Jumps cannot be L-shaped, they must be in a straigt line, but chaining them together they might form any shape. Example of one turn of type 2), where "O" in the top right corner is jumping first diagonally, and then vertically:

```
--------------------------
|  |  |  |  |  | X |   | O |
--------------------------
|  |  |  |  |  |   | X |   |
--------------------------
|  |  |  |  |  |   |   |   |
--------------------------
|  |  |  |  |  | O |   |   |
--------------------------
|  |  |  |  |  |   |   |   |
```

```
--------------------------
|  |  |  |  |  | X |   |   |
--------------------------
|  |  |  |  |  |   | X |   |
--------------------------
|  |  |  |  |  | O |   |   |
--------------------------
|  |  |  |  |  | O |   |   |
--------------------------
|  |  |  |  |  |   |   |   |
```
```
--------------------------
|  |  |  |  |  | X |   |   |
--------------------------
|  |  |  |  |  |   | X |   |
--------------------------
|  |  |  |  |  |   |   |   |
--------------------------
|  |  |  |  |  | O |   |   |
--------------------------
|  |  |  |  |  | O |   |   |
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run the project:
`yarn install`
`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


