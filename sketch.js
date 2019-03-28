var blocksWidth = 15;
var blockSize;

var blocks = [];

class Point {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
  }
}

var blockTypes = [
  [
    new Point(0, 0),
    new Point(1, 0),
    new Point(2, 0),
    new Point(3, 0),
  ],
  [
    new Point(0, 0),
    new Point(1, 0),
    new Point(2, 0),
    new Point(1, -1),
  ]
];

function setup() {
  createCanvas(500, 500);
  blockSize = width/blocksWidth;

  blocks[0] = new LineBlock(5, 10, "right", 1);
  blocks[1] = new LineBlock(4, 5, "left", 2)
}



function draw() {
  background(0);
  for (let block of blocks) {
    block.tick();
    block.render();
  }
  if (frameCount % 5 == 0) {
    if (key == "d" && keyIsPressed) {
      blocks[blocks.length-1].rotateBlocks();
    }

    if (keyCode == RIGHT_ARROW && keyIsPressed) {
      blocks[blocks.length-1].x += 1;
    }
    if (keyCode == LEFT_ARROW && keyIsPressed) {
      blocks[blocks.length-1].x -= 1;
    }

    if (keyCode == UP_ARROW && keyIsPressed) {
      blocks.push(new LineBlock(4, 5, "right", blocks.length))
    }
  }

  // if (frameCount % 200 == 0) {
  //   blocks.push(new LineBlock(4, 5, "right", blocks.length))
  // }
}

function getOtherSubBlocks() {
  let arr = [];
  for(let block of blocks) {
    for (let subBlock of block.blocks) {
      arr.push(new Point(subBlock.x+block.x, subBlock.y+block.y, block.id));
    }
  }
  return arr;
}

class LineBlock {
  constructor(x, y, dir, id) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.id = id;

    this.blocks = blockTypes[Math.floor(Math.random() * 2)]
  }

  tick() {
    let allBlocks = getOtherSubBlocks();
    if (frameCount % 40 == 0) {
      this.y++;
      for (let subBlock of this.blocks) {
        var blockPos = new Point(this.x+subBlock.x, this.y+subBlock.y);
        for (let block of allBlocks) {
          if (block.id == this.id) continue;
          if (blockPos.x == block.x && blockPos.y == block.y) {
            this.y--;
            return;
          }
        }
        if (blockPos.y > blocksWidth-1) {
          this.y--;
          return;
        }
      }
    }
  }

  render() {
    fill(0, 255, 0);
    for (let block of this.blocks) {
      rect((this.x+block.x)*blockSize, (this.y+block.y)*blockSize, blockSize, blockSize);
    }
  }

  rotateBlocks() {
    let newBlocks = [];
    for (let block of this.blocks) {
      let p = new Point(block.y, -block.x);
      newBlocks.push(p);
    }
    this.blocks = newBlocks;
  }
}
