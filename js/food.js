class FoodClass{
    constructor(){
        this.milkImg = loadImage("images/Milk.png");
        this.foodStock = 0;
        this.lastFed;
    }

    getFoodStock(){
        return this.foodStock;
    }
    
    updateFoodStock(f){
        this.foodStock = f;
    }
    
    deductFood(){

    }

    display(){
        var x = 80, y = 100;

        imageMode(CENTER);
        image(this.milkImg, 720,220,70,70);

        if(this.feedStock!=0){
            for(var i = 0; i< this.foodStock; i++){
                if(i%10 === 0){
                    x = 80;
                    y += 50;
                }
                image(this.milkImg, x,y,50,50);
                x += 30;
            }
        }
    }
}