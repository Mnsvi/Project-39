//Create variables here
var database;
var dog, happyDog, foodS, foodStock;
var dogImg, happyDogImg;
var feedTime, lastFed, feed, addFood, foodObj;;

function preload()
{
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydog.png");
}

function setup() {

	createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodObj = new Food();

  feed = createButton("FEED");
  feed.position(500, 80);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(600, 80);
  addFood.mousePressed(addFoodS);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  fedTime = database.ref('fedTime');
  fedTime.on("value", function(data){
  lastFed = data.val();
  });

}

function draw() {  

  background("green");

  foodObj.display();

  //if(keyWentDown(UP_ARROW)){
  //  writeStock(foodS);
  //  dog.addImage(happyDogImg);}

  //fill("white");
  //stroke(2);
  //text("Food remaining : "+foodS, 170, 200);

  //fill("white");
  //textSize(23);
  //textSize(20);
  //text("Note: Press UP_ARROW Key To Feed Drago Milk!", 30, 100);

  drawSprites();

}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

// function to update food stock and last fed time 
function feedDog(){
  dog.addImage(happyDogImg)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(), 
    fedTime:hour()
  })
}

// function to add the food 
function addFoodS(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}