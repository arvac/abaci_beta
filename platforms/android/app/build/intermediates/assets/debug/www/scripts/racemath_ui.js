Quintus.RacemathUI = function(Q){
    var newFood = 2;
//highScore
var boole =  localStorage.setItem("boole", true);
if(boole){
    localStorage.setItem("hight", 0);
}
    console.log('ui escena');
    Q.UI.Text.extend("QuestionText",{
        init:function(){
            this._super({
                color:"black",
                x:10,
                y:10,
              
            });
        },
        generate:function(){
            this.p.num1 = Math.floor(Math.random()*Q.state.get('operations_max')) + Q.state.get('operations_min');
            this.p.num2 = Math.floor(Math.random()*Q.state.get('operations_max')) + Q.state.get('operations_min');
            this.p.label = this.p.num1 + '+' + this.p.num2;

        },
        getAnswer:function(){
            return this.p.num1 + this.p.num2;
        }
    });

    Q.UI.Text.extend("QuestionText1",{
        init:function(){
            this._super({
                color:"black",
                x:10,
                y:100,
                label:''
              
            });
        },
        generate1:function(){
           
            this.p.num1=+10 ;
            this.p.num2 = Q.state.get('operations_max') + Q.state.get('operations_min');
            this.p.label = this.p.num1 + '+' + this.p.num2;


        },
        
       
    });

    Q.UI.Button.extend('NumberButton',{
        init:function(p){
            this._super(Q._defaults(p,{
                fill:"#4CAF50",
              
                border:2,
                shadow:3,
                shadowColor:"rgba(0,0,0,0.5)",
                w:40,
                h:50
            }), 
            function(){
                var currAnsw;
                if(this.p.answerLabel.p.label === '') {
                    currAnsw = 0;
                }
                else {
                    currAnsw = parseInt(this.p.answerLabel.p.label);
                    console.log(currAnsw);
                }
                
                if(currAnsw < 1000000000) {
                    this.p.answerLabel.p.label = ""+(currAnsw*10+parseInt(this.p.label));
                }
            }
          );
        }
       
    });
    Q.scene('ui', function(stage){
        console.log('ui escena');
        var qContainer = stage.insert(new Q.UI.Container({
            fill:"#fff",
            x: 241,
            y: 310,
            border:2,
            shadow:3,
            shadowColor:"rgba(0,0,0,0.5)",
            w:140,
            h:50
        })
    );
   
    var question = stage.insert(new Q.QuestionText(),qContainer);
    var question1 = stage.insert(new Q.QuestionText1(),qContainer);
   
    question.generate();
   
//area answer
    var aContainer = stage.insert(new Q.UI.Container({
        fill: "#4CAF50",
        x: 241,
        y: 430,
        border: 2,
        shadow: 3,
        shadowColor: "rgba(0,0,0,0.5)",
        w: 80,
        h: 50
        })
    );
    
    var answer = stage.insert(new Q.UI.Text({ 
            label: "",
            color: "white",
            x: 225,
            y: 420,
          }));

     var Nivel = stage.insert(new Q.UI.Text({ 
            label: "Nivel",
            color: "white",
            x: 110,
            y: 50
          }));
    var puntos = stage.insert(new Q.UI.Text({ 
            label: "Puntos",
            color: "white",
            x: 260,
            y: 50
          }));
   

    
      //submit answer
      var aButton = stage.insert(new Q.UI.Button({
        fill: "#dd9797",
        label: "sumar",
        x: 241,
        y: 370,
        border: 2,
        shadow: 3,
        shadowColor: "rgba(0,0,0,0.5)",
        w: 80,
        h: 50
        },
         function() {
            var isCorrect = parseInt(answer.p.label) == question.getAnswer();
            question.generate();
            answer.p.label = '';
            var player = Q("Player",0).first();
          
            
           

           
            if(isCorrect) {  
                var boole =  localStorage.setItem("boole", false);
                player.p.vx += 5;
               
                newFood+= 10
                puntos.p.label = 'Puntos '+ newFood;

                var foodKey = "food." + (window.localStorage.length + 1);
                window.localStorage.setItem(foodKey, newFood);
                if(newFood > localStorage.getItem("hight")){
                    localStorage.setItem("hight",newFood );
                    localStorage.setItem("actual", newFood);
                }else{
                    localStorage.setItem("actual", newFood);
                }

                
              
            }
            else {
                player.p.vx = Math.max(0, player.p.vx - 5);
            }
        })
    );

    for(i=1;i<10;i++) {
        stage.insert(
            new Q.NumberButton({
                label: i+'',
               y: 275+Math.ceil(i/3)*45,
                            x: 30+parseInt((i+2)%3)*45,
                answerLabel:answer
                }
            )
        );
    }
   
    stage.insert( new Q.NumberButton({
           
            label: '0',
           
           // y: Math.floor((Math.random() * (400 - 100 + 1)) + 100),
           // x: Math.floor((Math.random() * (400 - 100 + 1)) + 100),//calculate position
            x: 163,
            y: 400,
            answerLabel:answer
         
            },
            console.log(Math.floor((Math.random() * 6660) + 1))
            
        )
    );
    

});
}