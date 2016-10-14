
var titulo1,titulo2;
var bla;
var animais = [];
var sons = [];
var connections = [];
var cenario;
var clicked1,clicked2,typeOfClicked1;
document.onmousedown= click;

function startGame() {
    titulo1 = new component("14px", "Consolas", "black", 270, 105,"text");
    titulo1.text= "Todos esses animais implementam a interface Animal e sobrescrevem "
    titulo2 = new component("14px", "Consolas", "black", 300, 125,"text");
    titulo2.text= "o método \"emitir som\". Mas qual som cada um vai emitir?";
    cenario = new component(800, 600, "", 0, 0, "image");
    cenario.setImage("./charset/will/cenario.png");
    animais.push(new component(80, 80, "red", Math.floor(myGameArea.width/3*2-50+150), 100, "image"));
    animais[0].setImage("./charset/will/doge.png");
    animais.push(new component(80, 80, "blue", Math.floor(myGameArea.width/3*2-50+150), 100, "image"));
    animais[1].setImage("./charset/will/gato.png");
    animais.push(new component(80, 80, "yellow", Math.floor(myGameArea.width/3*2-50+150), 100, "image"));
    animais[2].setImage("./charset/will/vaca.png");
    animais.push(new component(80, 80, "green", Math.floor(myGameArea.width/3*2-50+150), 100, "image"));
    animais[3].setImage("./charset/will/porco.png");
    sons.push(new component("18", "Consolas", "black", Math.floor(myGameArea.width/3-20+150), 100, "text"));
    sons[0].text= "auau";
    sons.push(new component("18", "Consolas", "black", Math.floor(myGameArea.width/3-20+150), 100, "text"));
    sons[1].text= "miau";
    sons.push(new component("18", "Consolas", "black", Math.floor(myGameArea.width/3-20+150), 100, "text"));
    sons[2].text= "mu";
    sons.push(new component("18", "Consolas", "black", Math.floor(myGameArea.width/3-20+150), 100, "text"));
    sons[3].text= "ronc";
    for (i=0; i<animais.length; i++) {
        animais[i].par= sons[i];
        sons[i].par= animais[i];
    }
    animais= shuffleArray(animais);
    sons= shuffleArray(sons);
    for (i=0; i<animais.length; i++) {
        animais[i].y= 100*i+125;
        sons[i].y= 100*i+160;
    }
    //myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    width: 800,
    height: 600,
    update: 0,
    win: 0,
    start : function() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        document.getElementsByTagName("mini")[0].appendChild(this.canvas);
        typeOfClicked= "none";
        updateGameArea();
        this.update= setInterval(updateGameArea,500);
        this.win= setInterval(win,100);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function updateGameArea() {
    cenario.update();
    titulo1.update();
    titulo2.update();
    for (i=0; i<animais.length; i++) {
        animais[i].update();
        sons[i].update();
    }
    for (i=0; i<connections.length; i+=4) {
        ctx= myGameArea.context;
        x1= connections[i];
        y1= connections[i+1];
        x2= connections[i+2];
        y2= connections[i+3];
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    }
}/*
function updateImages() {
    cenario.update();
    for (i=0; i<animais.length; i++) {
        animais[i].update();
        //sons[i].update();
    }
}*/

function component(width, height, color, x, y, type) {
    this.type = type;
    this.img = null;
    this.text = "";
    this.color= color;
    this.par;
    this.solutioned = false;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        switch(this.type) {
            case "text":
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = this.color;
                ctx.fillText(this.text, this.x, this.y);
                break;
            case "image":
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
                break;
            default:
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.setImage = function(newImage) {
        this.img= document.createElement('img');
        this.img.src= newImage;/*
        this.img.onload= function() {
                                        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
                                    }*/
    }
}

function click(e) {
    var x,y,clicked;
    var typeOfClicked= "none";
    //Detectar coordenadas do click
	
    if (e.pageX || e.pageY) { 
      x = e.pageX;
      y = e.pageY;
    }
    else { 
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    }
    x -= myGameArea.canvas.offsetLeft;
    y -= myGameArea.canvas.offsetTop;
	
	x -= (window.innerWidth-800)/2;
	y -= (window.innerHeight-600)/2;
	
    if ( (x>=(sons[0].x)) && (x<=(sons[0].x+50)) ) {
        for (i=0; i<sons.length; i++) {
            if (y>=(sons[i].y-15) && y<=(sons[i].y+5)) {
                clicked= sons[i];
                typeOfClicked= "som";
            }
        }
    }
    if ( (x>=animais[0].x) && (x<=(animais[0].x+animais[0].width)) ) {
        for (i=0; i<animais.length; i++) {
            if (y>=animais[i].y && y<=animais[i].y+animais[0].height) {
                clicked= animais[i];
                typeOfClicked= "animal";
            }
        }
    }
	
	if(clicked !== undefined && clicked !== null && !pause){		
		if (!clicked.solutioned) {
			if (typeOfClicked=="som") {
				switch(typeOfClicked1) {
					case "som":
						clicked1= clicked;
						break;
					case "animal":
						clicked2= clicked;
						connect();
						break;
					default:
						clicked1= clicked;
						typeOfClicked1= "som";
				}
			}
			if (typeOfClicked=="animal") {
				switch(typeOfClicked1) {
					case "som":
						clicked2= clicked;
						connect();
						break;
					case "animal":
						clicked1= clicked;
						break;
					default:
						clicked1= clicked;
						typeOfClicked1= "animal"; 
				}
			}
		}
	}
}

function connect() {
    if (clicked1.par == clicked2) {
        var ctx= myGameArea.context;
        ctx.beginPath();
        if (typeOfClicked1=="som") {
            ctx.moveTo(clicked1.x+50,clicked1.y+10);
            ctx.lineTo(clicked2.x,clicked2.y+40);
            connections.push(clicked1.x+50);
            connections.push(clicked1.y+10);
            connections.push(clicked2.x);
            connections.push(clicked2.y+40);
        }
        if (typeOfClicked1=="animal") {
            ctx.moveTo(clicked2.x+50,clicked2.y+10);
            ctx.lineTo(clicked1.x,clicked1.y+40);
            connections.push(clicked2.x+50);
            connections.push(clicked2.y+10);
            connections.push(clicked1.x);
            connections.push(clicked1.y+40);
        }
        ctx.stroke();
        clicked1.solutioned= true;
        clicked2.solutioned= true;
        clicked1= null;
        clicked2= null;
        typeOfClicked1= "none";
    }
    else {
		clearInterval(myGameArea.update);
        clearInterval(myGameArea.win);
        quests[3] = 1;
		pauseP = false;
		document.getElementsByTagName("mini")[0].innerHTML = "";
		document.onkeydown = principal;
		document.onkeyup = secundario;
		document.onmousedown = function(){};
		document.getElementsByTagName("head")[0].removeChild(script);
    }
}

function win() {
    var solutioned= 0;
    for (i=0; i<animais.length; i++) {
        if (animais[i].solutioned)
            solutioned++;
    }
    if (solutioned==4) {
        clearInterval(myGameArea.update);
        clearInterval(myGameArea.win);
        quests[3] = 2;
		document.onmousedown = null;
		gui.append(document.createElement("sucesso"));
		gui.setVisible(true);
		var victory = new Audio("./soundfx/missioncomplete.wav");
		victory.volume = volumeE;
		setTimeout(function(){victory.play();}, 1000);
		setTimeout(function () {
			gui.setVisible(false);
			document.getElementsByTagName("mini")[0].innerHTML = "";
			document.getElementsByTagName("head")[0].removeChild(script);
			document.onkeydown = principal;
			document.onkeyup = secundario;
			action = false;
			u_action = true;
			pauseP = false;
		}, 2000);
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}