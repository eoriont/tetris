var currentBlock;
var tickSpeed = 40;

function setup() {
  createCanvas(500, 500);
  blockSize = width/blocksWidth;
}

function draw() {
  background(0);
  
  for (let block of blocks) {
    if (frameCount % tickSpeed == 0) {
      block.tick();
    }
    block.render();
  }
  
  if (currentBlock == null) {
    currentBlock = new Block(4, 5, randomBlockType(), blocks.length);
    blocks.push(currentBlock)
  }

  if (currentBlock.down) {
    currentBlock = new Block(4, 5, randomBlockType(), blocks.length);
    blocks.push(currentBlock)
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

