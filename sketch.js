var currentBlock;
var tickSpeed = 40;

var mid = new Point(Math.round(blocksWidth/2), 0)

function setup() {
  createCanvas(blockSize*blocksWidth, blockSize*blocksHeight);
}

function draw() {
  background(0);

  for (let block of blocks) {
    if (frameCount % tickSpeed == 0) {
      block.tick();
      testRows();
    }
    block.render();
  }

  if (currentBlock == null) {
    currentBlock = new Block(mid, randomBlockType(), blocks.length);
    blocks.push(currentBlock)
  }

  if (currentBlock.down) {
    currentBlock = new Block(mid, randomBlockType(), blocks.length);
    blocks.push(currentBlock)
  }
}

function testRows() {
  let rows = [];
  for (let block of blocks) {
    if (!block.down) continue
    for (let subblock of block.blocks) {
      var row = rows[subblock.y+block.y];
      if (row == null) rows[subblock.y+block.y] = [];
      console.log(subblock.y+block.y)
      rows[subblock.y+block.y].push({x: subblock.x+block.x, y: subblock.y+block.y, id: block.id});
    }
  }

  let numRowsBroke = 0;

  for (let row of rows) {
    if (row == undefined) continue
    if (row.length >= blocksWidth) {
      numRowsBroke++;
      for (let subblock of row) {
        let block = getBlockById(subblock.id);
        block.blocks.splice(getSubBlockIndex(subblock.x-block.x, subblock.y-block.y, block.blocks), 1);
      }
    }
  }

  for (let block of blocks) {
    block.y+=numRowsBroke;
  }
}

function getSubBlockIndex(x, y, subblocks) {
  let p = new Point(x, y);
  return subblocks.indexOf(p);
}

function getBlockById(id) {
  for (let block of blocks) {
    if (block.id == id) return block;
  }
}



function keyPressed() {
  if (keyCode == UP_ARROW) {
    currentBlock.rotateBlocks();
  }

  if (keyCode == RIGHT_ARROW) {
    currentBlock.testTranslate(currentBlock.x+1, currentBlock.y)
  }

  if (keyCode == LEFT_ARROW) {
    currentBlock.testTranslate(currentBlock.x-1, currentBlock.y)
  }

  if (keyCode == DOWN_ARROW) {
    tickSpeed = 3;
  }

  if (key == "d") ifDebug = true;

  if (keyCode == SHIFT) {
    currentBlock = new Block(4, 5, randomBlockType(), blocks.length);
    blocks.push(currentBlock)
  }
}

function keyReleased() {
  if (keyCode == DOWN_ARROW) {
    tickSpeed = 40;
  }
}
