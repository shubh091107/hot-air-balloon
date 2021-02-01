var bg
var bimg1,bimg2,bimg3, balloon
var img1,img2,img3,img4
var up,down,left,right
var database , pos

function preload(){
bg = loadImage("bg.png")
bimg1 = loadImage("1.png")
bimg2 = loadImage("2.png")
bimg3 = loadImage("3.png")
img1 = loadImage("up.png")
img2 = loadImage("do.png")
img3 = loadImage("le.png")
img4 = loadImage("ri.png")
}

function setup() {
  createCanvas(1000,600);

  database = firebase.database()
  var ballonpos= database.ref("ballon/position")
  ballonpos.on("value",readPos,showError)
 balloon =  createSprite(100, 400, 50, 50);
 balloon.addImage(bimg1)
 balloon.scale= 0.5
up = createSprite(900,500,10,10)
up.addImage(img1)
up.scale = 0.03
down = createSprite(900,560,10,10)
down.addImage(img2)
down.scale = 0.04
left = createSprite(850,550,10,10)
left.addImage(img3)
left.scale = 0.09
right = createSprite(950,550,10,10)
right.addImage(img4)
right.scale = 0.15
}

function draw() {
  background(bg);  
  drawSprites();
  textSize(20)
  text("!! Press ARROW keys to move ",100,50)

  if (mousePressedOver(up) || keyDown(UP_ARROW)){
    writeData(0,-2)
    balloon.scale -= 0.001
  }
  if (mousePressedOver(down) || keyDown(DOWN_ARROW)){
    writeData(0,2)
    balloon.scale += 0.001
  }
  if (mousePressedOver(left) || keyDown(LEFT_ARROW)){
    writeData(-1,0)
    balloon.addImage(bimg2)
  }
  if (mousePressedOver(right) || keyDown(RIGHT_ARROW)){
    writeData(1,0)
    balloon.addImage(bimg3)
  }
  
}

function writeData(x,y){
    database.ref("ballon/position").set({
      x: balloon.x +x,
      y: balloon.y+y
    })
}

function readPos(data){
  pos= data.val();
  balloon.x= pos.x
  balloon.y = pos.y
}

function showError(){
  console.log("ERROR ERROR ERROR . . . . . . . .")
}