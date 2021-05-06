class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    
    question.hide();

    background("red");

    textSize(20);
    fill("black");
    text("Result of the quiz...",850/2,30);

    Contestant.getPlayerInfo();

    if (allContestants!==undefined){
    text("winner=green",200,250);
    
    var y=280;

    for(var i in allContestants){

      var rightans="2";
      
      if (rightans===allContestants[i].answer){

        fill("green")

      }else{
        fill(0);
      } 

      text(allContestants[i].name+":"+allContestants[i].answer,150,y);
      y+=20;

    }
    
  }
}
}
