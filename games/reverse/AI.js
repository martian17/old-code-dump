
var boardToBit = function(board){
  var b = [0,0,0,0];
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 16; j++){
      var k = i*16+j;
      b[i] = b[i] | (board[k]<<(j*2));
    }
  }
  return b;
};

var bitToBoard = function(b){
  var board = [];
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 16; j++){
      var k = i*16+j;//2 bits each
      board[k] = 3 & (b[i]>>(j*2));
    }
  }
  return board;
};


//routine functions
var nth2bit = function(bita,n){
  return bita>>(n*2);
};

var boardnth = function(board,n){
  var i = n>>4;
  var j = n&15;
  return board[i]>>(j*2);
};


var maskx = [];

var getAllHands = function(board){
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < board.length; j++){
      if(nth2bit(board[i],n) === 2){//if empty

      }
    }
  }
};

//
var maskX = [
  -1,0,1,
  -1,1,
  -1,0,1
];
var maskY = [
  -1,-1,-1,
  0,0,
  1,1,1,
];

var applyMask = function(mx,my,idx){
  var x1 = idx&7+mx;
  var y1 = idx>>3+my;
  if((x1|x2)&-2147483648 === 0){//if they are both positive
    return x1+(7<<y1);
  }
  //if there is any negative
  return false;
};

var changeBoard = function(board,n,player){
  var i = n>>4;
  var j = n&15;
  //changing the state of one cell on a board
  //still trying to figure out
  board[i] = board[i]&(((player<<(j*2))|(~(3<<(j*2))));
}


var executeHand = function(board,hand,player){
  var board1 = [board[0],board[1],board[2],board[3]];
  //hand is the index;
  var x = hand&7;
  var y = hand>>3;
  for(var i = 0; i < maskx.length; i++){
    var idx1 = applyMask(maskx[i],masky[i],hand);
    if(idx1 !== false){
      var cell1 = boardnth(board,idx1);
      if(cell1 === player^1){//different from player color
        var idx2 = applyMask(maskx[i],masky[i],idx1);
        var cell2 = boardnth(board,idx2);
        while(idx2 !== false){//forward
          if(cell2 === player){
            idx2 = applyMask(maskx[i],masky[i],idx2);
            cell2 = boardnth(board,idx2);
          }else if(cell2 === player^1){
            idx2 = applyMask(-maskx[i],-masky[i],idx2);
            while(idx2 !== hand){//backward
              changeBoard(board,idx2,player);
              idx2 = applyMask(-maskx[i],-masky[i],idx2);
            }
            break;
          }else{
            break;
          }
        }
      }
    }
  }
}


var findFlipped = function(idx){
  var xy = oneDToTwoD(idx);
  var flipped = [];
  for(var i = 0; i < maskX.length; i++){
    if(xyInRange(xy[0]+maskX[i],xy[1]+maskY[i])){//if in range
      var idx2 = twoDToOneD(xy[0]+maskX[i],xy[1]+maskY[i]);
      if(board[idx2] === antiColor){//different color: begin search
        //console.log(idx2,board[idx2],antiColor);
        var j = 2;
        var matches = [idx2];
        while(true){
          if(xyInRange(xy[0]+maskX[i]*j,xy[1]+maskY[i]*j)){
            var idx3 = twoDToOneD(xy[0]+maskX[i]*j,xy[1]+maskY[i]*j)
            if(board[idx3] === antiColor){
              matches.push(idx3);
            }else if(board[idx3] === color){//found match, add pairs
              flipped.push(matches);
              break;
            }
          }else{
            break;
          }
          j++;
        }
      }//else if same color or empty don't search
    }//else if not in range don't search
  }
  return flipped;
};

//





var reverseAI = function(board){
  var board = boardToBit(board);
  var hands = getAllHands(board);
  var maxscore = 0;
  var nextHand = hand[0];
  for(var i = 0; i < hands; i++){
    var score = scoreHand(board,hands[i]);
    if(maxscore < score){
      maxscore = score;
      nextHand = hands[i];
    }
  }
  return hand;
};

var scoreHand = function(board,hand){

};