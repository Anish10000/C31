const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

var blinkAnimation, eatAnimation, sadAnimation;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;

  blinkAnimation = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eatAnimation = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  eatAnimation.looping = false;
  sadAnimation = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  sadAnimation.looping = false;
  blinkAnimation.frameDelay = 20;
  sadAnimation.frameDelay = 10;

 
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);


  bunny = createSprite(230,620,100,100);
  //bunny.addImage(rabbit)
  bunny.addAnimation("blink", blinkAnimation);
  bunny.addAnimation("eat", eatAnimation);
  bunny.addAnimation("sad", sadAnimation);
  
  bunny.changeAnimation("blink");
  
  bunny.scale = 0.2;

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  image(food,fruit.position.x,fruit.position.y,70,70);

  rope.show();
  Engine.update(engine);
  ground.show();
  //collide(fruit, bunny);

  if(collide(fruit, bunny) == true){
   bunny.changeAnimation("eat");
  }

  if(collide(fruit, ground.body) == true){
   bunny.changeAnimation("sad");
  }

  

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}


function collide(body, sprite){

  if(body!=null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    console.log("d = " + d);
  
    
  
  
    if(d < 105){
    World.remove(world, fruit);
     return true;
    }
    else{
     return false;
    }
  }
  


}