var WIDTH=document.documentElement.clientWidth-20;
var HEIGHT=document.documentElement.clientHeight-20;
var RADIUS=Math.round(WIDTH*4/5/108)-1;
var TOP=60;
var LEFT=Math.round(WIDTH/10);
var balls=[];
const colors=["#33b5e5","#09c","a6c","#93c","#9c0","#690","#fb3","#f80","#f44","#c00"];

var currentHours=new Date().getHours();
var currentMinutes=new Date().getMinutes();
var currentSeconds=new Date().getSeconds();

window.onload=function(){
	var canvas=document.getElementById('canvas');
	var context=canvas.getContext("2d");

	canvas.width=WIDTH;
	canvas.height=HEIGHT;

	setInterval(function(){
		render(context);
		update();
	},50) 
}
	
function render(cxt){

	cxt.clearRect(0,0,WIDTH,HEIGHT);
	var date=new Date();
	var hours=date.getHours();
	var minutes=date.getMinutes();
	var seconds=date.getSeconds();

	renderDigit(LEFT,TOP,parseInt(hours/10),cxt);
	renderDigit(LEFT+15*(RADIUS+1),TOP,parseInt(hours%10),cxt);
	renderDigit(LEFT+30*(RADIUS+1),TOP,10,cxt);
	renderDigit(LEFT+39*(RADIUS+1),TOP,parseInt(minutes/10),cxt);
	renderDigit(LEFT+54*(RADIUS+1),TOP,parseInt(minutes%10),cxt);
	renderDigit(LEFT+69*(RADIUS+1),TOP,10,cxt);
	renderDigit(LEFT+78*(RADIUS+1),TOP,parseInt(seconds/10),cxt);
	renderDigit(LEFT+93*(RADIUS+1),TOP,parseInt(seconds%10),cxt);

	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
		cxt.closePath();

		cxt.fill();
	}
}

function renderDigit(x,y,num,cxt){

	cxt.fillStyle="rgb(0,102,153)";

	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+2*(RADIUS+1)*j+RADIUS+1,y+2*(RADIUS+1)*i+RADIUS+1,RADIUS,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();

			}
			
		}
	}
}

function update(){
	var nextHours=new Date().getHours();
	var nextMinutes=new Date().getMinutes();
	var nextSeconds=new Date().getSeconds();

	if(nextSeconds!=currentSeconds){
        addBalls( LEFT + 0 , TOP , parseInt(nextHours/10) );
        addBalls( LEFT + 15*(RADIUS+1) , TOP , parseInt(nextHours/10) );
        addBalls( LEFT + 39*(RADIUS+1) , TOP , parseInt(nextMinutes/10) );
        addBalls( LEFT + 54*(RADIUS+1) , TOP , parseInt(nextMinutes%10) );
        addBalls(LEFT+78*(RADIUS+1),TOP,parseInt(nextSeconds/10) );
		addBalls( LEFT+93*(RADIUS+1),TOP,parseInt(nextSeconds%10));
	}

	currentHours=nextHours;
	currentMinutes=nextMinutes;
	currentSeconds=nextSeconds;

	updateBalls();
}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*6,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}

				balls.push(aBall);
			}
			
		}
	}
}
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if(balls[i].y>HEIGHT-RADIUS){
			balls[i].y=HEIGHT-RADIUS;
			balls[i].vy=-balls[i].vy*0.65;
		}
	}

	var cnt=0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WIDTH){
			balls[cnt++]=balls[i];
			}

		}
		while(balls.length>Math.min(cnt,1500)){
			balls.pop();
			console.log(balls.length);

	}
}
