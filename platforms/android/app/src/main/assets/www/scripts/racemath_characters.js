Quintus.RacemathCharacter = function(Q){
    Q.Sprite.extend("Rival",{
        init:function(p){
            this._super(p,{
                type:Q.SPRITE_RACER,
                collisionMask:Q.SPRITE_OTHER
            });
            this.add("2d");
           // this.p.vx = 0 + Math.random()*40;
            this.p.vx = 10;
             this.on("hit.sprite",function(collision) {
                if(collision.obj.isA("Flower")) {
                    collision.obj.destroy();
                    this.p.vx = 10;
                    Q.stageScene("endGame",1, {label:"Perdiste"});
                    
                }
            });
        }
    });
    Q.Sprite.extend("Player",{
        init:function(p){
            this._super(p,{
                sheet:'player',
                type:Q.SPRITE_RACER,
                collisionMask:Q.SPRITE_OTHER,
                x: 110, y: 50, jumpSpeed: -400, lives: 3,coins: 0
            });
            this.add("2d");
           // this.p.vx = 10;
            this.on("hit.sprite",function(collision) {
                if(collision.obj.isA("Flower")) {
                    collision.obj.destroy();
                    this.p.vx = 10;
                    this.p.coins++;
                    var coinsLabel = Q("UI.Text",1).items[1];
                    coinsLabel.p.label = 'Nivel  '+this.p.coins;
                    localStorage.setItem("nivel",this.p.coins );
                    
                }
            });
        }
    });
    Q.Sprite.extend("Flower",{
        init:function(p){
            this._super(p,{
                type:Q.SPRITE_OTHER,
                collisionMask:Q.SPRITE_OTHER,
                asset: "coin.png"
            });
            this.add("2d");
           // this.p.vx = 0 + Math.random()*40;
            //this.p.vx = 10;
        }
    });
    Q.Sprite.extend("Princess",{
        init:function(p){
            this._super(p,{
                sheet:'girl',
                type:Q.SPRITE_OTHER,
                collisionMask:Q.SPRITE_OTHER
            });
            this.add("2d");
            this.on('hit',function(collision){
                if(collision.obj.isA("Player")){
                    Q.stageScene("endGame",1, {label:"Ganaste",color:"white",fill:"#4CAF5",});
                    this.destroy();
                    console.log('ganaste');
                }else if (collision.obj.isA('Rival')){
                    Q.stageScene("endGame",1, {label:"Perdiste"});
                    this.destroy();
                    console.log("perdiste");
                }
            })
        }
    });
};