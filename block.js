var blockTypes = [
  [ // Line
    new Point(0, 0),
    new Point(1, 0),
    new Point(2, 0),
    new Point(-1, 0),
  ],
  [ // T
    new Point(0, 0),
    new Point(1, 0),
    new Point(-1, 0),
    new Point(0, -1),
  ],
  [ // L
    new Point(0, 0),
    new Point(1, 0),
    new Point(-1, 0),
    new Point(1, -1),
  ],
  [ // O
    new Point(0, 0),
    new Point(1, 0),
    new Point(0, 1),
    new Point(1, 1),
  ],
  [ // J
    new Point(0, 0),
    new Point(1, 0),
    new Point(-1, 0),
    new Point(-1, -1),
  ],
  [ // S
    new Point(0, 0),
    new Point(1, 0),
    new Point(0, 1),
    new Point(-1, 1),
  ],
  [ // Z
    new Point(0, 0),
    new Point(-1, 0),
    new Point(0, 1),
    new Point(1, 1),
  ],
];

var blockTypeColors = [
  "#3dffff",
  "#8b43f9",
  "#ffb13d",
  "#e8f43f",
  "#3d67ff",
  "#6af943",
  "#ff3a3a",
  "#ffffff"
]

var blocksWidth = 10;
var blockSize = 40;
var blocksHeight = 20

var blocks = [];

var ifDebug = false;

class Block {
  constructor(pos, type, id) {
    this.x = pos.x;
    this.y = pos.y;
    this.type = type;
    this.id = id;

    this.blocks = blockTypes[type].slice(0);
    this.down = false;

    this.color = blockTypeColors[type];
  }

  tick() {
    if (this.down) return;
    var success = this.testTranslate(this.x, this.y+1)
    this.down = !success;
  }

  render() {

    for (let block of this.blocks) {
      let x = (this.x+block.x)*blockSize;
      let y = (this.y+block.y)*blockSize;
      fill(this.color);
      rect(x, y, blockSize, blockSize);
    }
  }

  rotateBlocks() {
    let oldBlocks = this.blocks;
    let newBlocks = [];
    for (let block of this.blocks) {
      let p = new Point(block.y, -block.x);
      newBlocks.push(p);
    }
    this.blocks = newBlocks;
    var test = this.testTranslate(this.x, this.y);
    if (!test) {
      this.blocks = oldBlocks;
    }
  }

  testTranslate(x, y) {
    let allBlocks = getOtherSubBlocks();
    if (!this.down) {
      for (let subBlock of this.blocks) {
        var blockPos = new Point(x+subBlock.x, y+subBlock.y);
        for (let block of allBlocks) {
          if (block.id == this.id) continue;
          if (blockPos.x == block.x && blockPos.y == block.y) {
            return false;
          }
        }
        if (blockPos.y > blocksHeight-1) {
          return false;
        }
        if (blockPos.x > blocksWidth-1 || blockPos.x < 0) {
          return false;
        }
      }
    }
    this.x+=(x-this.x);
    this.y+=(y-this.y);
    return true;
  }
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

function randomBlockType() {
  return Math.floor(Math.random() * blockTypes.length)
}
