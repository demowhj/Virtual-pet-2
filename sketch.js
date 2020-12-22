var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 700);
  
  database = firebase.database();

  foodObj = new FoodClass();

  foodStock = database.ref("food");
  foodStock.on("value", readStock);

  dog = createSprite(250, 250, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  // foodStock = foodObj.getFoodStock();
  // foodS = foodStock;

  feedPet = createButton("Feed the dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46, 139, 87);
 
  foodObj.display();

  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage(happyDogImg);
  // }

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  textSize(20);
  fill(255);

  // text("Food remaining: "+foodS, 150, 100);

  if(lastFed >= 12){
    text("Last feed: " + lastFed%12 + " PM", 350, 30);
  }
  else if(lastFed === 0){
    text("Last feed: 12 AM", 350, 30);
  }
  else{
    text("Last feed: " + lastFed + " PM", 350, 30);
  }
  // text("Press 'UP' to feed Drago milk!", 120, 450);

  drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImg);

  if(foodS >= 1){
    var d = new Date();
    var h = d.getHours();
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
    FeedTime: h,
    food:foodObj.getFoodStock()
  });
  }
  
}

function addFoods(){
  dog.addImage(dogImg);
  foodS++;
  database.ref("/").update({
    food:foodS
  });
}