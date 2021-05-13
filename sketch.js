var bird;
var pipes = [];
var count = 0;
var flag = true;
var pipe_flag = true;
var w = 700;
var h = 700;
var cnv;

function preload(){
  song = loadSound("Game Over.mp3"); 
  fundo = loadSound("fundo-musical.mp3");
}

function centerCanvas(){
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x,y);
}

function setup(){
  cnv = createCanvas(w,h);
  centerCanvas();
  bird = new Bird();
  pipes.push(new Pipe());
  fundo.play();
}

function draw(){
  background(176,224,230);
  bird.update();
  bird.show();

  if (frameCount % 150 == 0){
    pipes.push(new Pipe());
  }
  for (var i = 0; i < pipes.length; i ++){
    pipes[i].show();
    if (pipe_flag == true){
      pipes[i].update();
    }
    if (flag == true && pipes[i].x < 0/*(width/15)*/){ //negative?
      flag = false;
      count += 1;
      str = "Pontuação: " + count;
    }

    if (pipes[i].hits(bird)){
      str = "Pontuação: " + count;
      startOver();
      pipe_flag = false;
    }

    if (pipes[i].x < -width/3){  //-width...goes off screen
      pipes.splice(i,1); //deletes element from array
      flag = true;
    }
  }
  
  fill(211,211,211);
  rect(220,105, 210, 50,15);
  fill(0);
  textSize(30);
  str = "Pontuação: " + count;
  text(str, w/3, h/5);
}

function startOver(){
  if (fundo.isPlaying()){
    fundo.stop();
    song.setVolume(0.5);
    song.play();
  }
  var button = createButton("Você Perdeu, deseja jogar novamente?");
  button.size(200,200);
  button.position(350,340);
  button.style("color", "white");
  button.style("font-size", "30px");
  button.style("background-color", "#ED2920");
  button.style("border-radius", "10px");
  button.mousePressed(reset);
}

function reset(){
  window.location.reload()
}

function windowResized(){
  centerCanvas();
}

function touchStarted(){
  if (pipe_flag == true){
    bird.up();
  }
  if (pipe_flag == false){
    reset();
  }
  return false;
}

function keyPressed(){
  if (key == ' ' && pipe_flag == true){
    bird.up();
  }
}