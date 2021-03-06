class Food {
  constructor() {
    this.foodS = database.ref("Food");
    this.image = loadImage('Milk.png');
  }

  getFoodStock(){
    this.foodS.on("value", (data) => {
      foodStock = data.val();
      text("Food Left: " + foodStock + " bottles", 250, 100);
    });
  }

  updateFoodStock(changeVal){
    database.ref("/").update({Food:foodStock-changeVal});
  }

  deductFood(){
    if(foodStock != 0){
      foodStock--;
    }
  }

  display(){
    var x = 40, y = 220;

    imageMode(CENTER);
    image(this.image, 500, 400, 70, 70);

    if (foodStock!=0) {
      for (var i = 0; i < foodStock; i++) {
        if (i % 10 == 0) {
          y+=50;
          x = 40;
        }
        image(this.image, x, y , 50, 50);
        x += 30;
      }
    }

  }

}
