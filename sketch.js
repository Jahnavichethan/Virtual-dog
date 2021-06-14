var foodStock, dog, happyDog, database, dogImg, milkImg, feedTime, lastFed, food, feedButton, addFood;

function preload(){

  dogImg = loadImage("Dog.png");
	
}

function setup() {
  database = firebase.database();

	createCanvas(1000, 700);

	dog = createSprite(630, 400);
	dog.addImage(dogImg);
	dog.scale = 0.3;

  fedTime = database.ref("feed");
  fedTime.on('value', (data) => {
    lastFed = data.val();
  });

  feedButton = createButton('Feed');
  feedButton.position(380,95);
  feedButton.mousePressed(feedDog);

  addFood = createButton('Add food');
  addFood.position(430, 95);
  addFood.mousePressed(moreFood);

  food = new Food();

	textAlign(CENTER);
	textSize(20);
	fill(255);
	stroke(0);
}

function draw() {

  background(46, 139, 87);

  food.getFoodStock();


  if (lastFed) {
    fill(255);
    textSize(15);
    if (lastFed>12) {
      text("Last feed: " + lastFed%12 + " PM", 350,30);
    } else if (lastFed<=12){
      text("Last feed: " + lastFed + " AM", 350,30);
    } else {
      text("Last feed: " + lastFed, 350,30);
    }
  }
  food.display();
  drawSprites();
}

function feedDog() {
 
  if (foodStock) {
    food.updateFoodStock(1);
  }

  lastFed = hour();
  database.ref("/").update({fedTime: lastFed});

}

function moreFood() {
  foodStock++;
  database.ref("/").update({Food: foodStock});
}
