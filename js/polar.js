var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var imgLoad=0;
var canvasModel=function(id,img)
{
var self=this;
    self.id=document.getElementById(id);
    self.context=self.id.getContext('2d');
    self.img=new Image();
    self.img.src=img;
    self.width=self.id.width;
    self.height=self.id.height;
    self.radius=self.width/2;
    self.center=self.height/2;
    self.current='undefined';
}
var secOb='',
    minOb='',
    hrOb='',
    dayOb='',
    dateOb='',
    monOb='';
var   currentdate = '';
window.onload = function() {

    $('.door').addClass('rotate');
    //seconds context
    secOb=new canvasModel('second','img/wheels/seconds.png');
    minOb=new canvasModel('minute','img/wheels/minutes.png');
    hrOb=new canvasModel('hour','img/wheels/hours.png');
    dayOb=new canvasModel('day','img/wheels/day.png');
    dateOb=new canvasModel('date','img/wheels/date.png');
    monOb=new canvasModel('month','img/wheels/month.png');


    secOb.img.onload=startWheels;
    minOb.img.onload=startWheels;
    hrOb.img.onload=startWheels;
    dayOb.img.onload=startWheels;
    dateOb.img.onload=startWheels;
    monOb.img.onload=startWheels;

}
function startWheels()
{   if(++imgLoad==6)
{
    secOb.img.onload=
    updateTimeWheels();
    setInterval(function()
    {
        updateTimeWheels()
    },1000);
}

}
function updateTimeWheels()
{   currentdate=new Date();
    var seconds=currentdate.getSeconds(),
        minutes=currentdate.getMinutes(),
        hours=currentdate.getHours(),
        day=currentdate.getDay(),
        date=currentdate.getDate(),
        month=currentdate.getMonth(),
        temp= 0,
        wAngle= 0,
        angle=0;
       hours%=12;
     seconds+=1;
    secOb.current=seconds;

    temp= (seconds<5)? seconds+"":(" "+seconds+" SECONDS ");
    wAngle=(seconds<5)?8:33;
    updateWheel(secOb.context,secOb.width,secOb.height,secOb.center,seconds*6,secOb.radius,secOb.img,wAngle,temp);

    if(minOb.current!=(minutes+1)){
        minutes+=1;
       minOb.current=minutes+1;
        temp=(minutes<5)?minutes+"":" "+minutes+" MINUTES "
        wAngle=(minutes<5)?8:38;
    updateWheel(minOb.context,minOb.width,minOb.height,minOb.center,minutes*6,minOb.radius,minOb.img,wAngle,temp);
    };
    if(hrOb.current!=hours){
        hrOb.current=hours;
        wAngle=hours==1?35:40;
    updateWheel(hrOb.context,hrOb.width,hrOb.height,hrOb.center,hours*30,hrOb.radius,hrOb.img,wAngle," "+hours+" HOURS ");
        console.log("hou updated");
    }
    if(dayOb.current!=day){
        //alert("in day")
        dayOb.current=day;
       (day==0)?temp= 8:temp=day;
        //console.log(day);
    updateWheel(dayOb.context,dayOb.width,dayOb.height,dayOb.center,temp*45,dayOb.radius,dayOb.img,50," "+days[day].toUpperCase()+" ");
    }
    if(dateOb.current!=date){
        dateOb.current=date;
        temp=date<4?date+"":" "+date+" TH ";
        wAngle=date<4?20:40;
    updateWheel(dateOb.context,dateOb.width,dateOb.height,dateOb.center,(date*12),dateOb.radius,dateOb.img,wAngle,temp);
        }
    if(monOb.current!=month){
        monOb.current=month;
    updateWheel(monOb.context,monOb.width,monOb.height,monOb.center,(month+1)*30 ,monOb.radius,monOb.img,80," "+months[month].toUpperCase()+" ");
    }
}
function updateWheel(context,width,height,center,angle,radius,img,back,text)
{
    context.save()
    context.clearRect(0,0,width,height);
    context.beginPath();
    context.moveTo(center,center);
    context.lineTo(center,0);
    context.translate(0,height);
    context.rotate(-0.5* Math.PI);
   // context.arc(width/2,height/2,radius,0,20*Math.PI/180);
  //  context.stroke();
   context.arc(width/2,height/2,radius,0,angle*Math.PI/180);
    context.lineTo(center,center)
    context.clip();
    context.drawImage(img,0,0);
    context.globalCompositeOperation="source-atop";
    context.fillStyle="skyblue"
    effectGraph(context,angle-back,angle,center,radius)

    context.font = '15px Bookman Old Style';
    context.textAlign = 'center';
    context.fillStyle = 'black';
    context.strokeStyle = 'blue';
    context.lineWidth = 0;
    drawTextAlongArc(context, text, center,center, radius-28,back*Math.PI/180,(angle-back)*Math.PI/180);

    context.restore();
}
function effectGraph(context,sAngle,eAngle,center,radius)
{
context.save();
    context.beginPath();
    context.moveTo(center,center);
   // context.translate(center,center);
   var points=pointAtAngle(sAngle+90,center,radius);
    context.lineTo(points[0],points[1]);
    context.arc(center,center,radius,sAngle*Math.PI/180,eAngle*Math.PI/180);
    context.lineTo(center,center);
    context.globalAlpha = 0.7;
    context.fill();
    context.restore();
}
function pointAtAngle(angle,center,radius)
{
   var p=[];
 angle=360-angle;

    p[0]=Math.cos(Math.PI * (270 - angle) / 180.0) * radius + center;
    p[1]=Math.sin(Math.PI * (270 - angle) / 180.0) * radius + center;
    return p;
}
    function drawTextAlongArc(context, str, centerX, centerY, radius, angle,bfangle) {
   // context.rotate((bfangle+Math.PI*0.5));
    var len = str.length, s;
    context.save();
    context.translate(centerX, centerY);
    context.rotate((bfangle+Math.PI*0.5));
    context.rotate(-1 * (angle / len) / 2);
    for(var n = 0; n < len; n++) {
        context.rotate(angle / len);
        context.save();
        context.translate(0, -1 * radius);
        s = str[n];
        context.fillText(s, 0, 0);
        context.restore();
    }
    context.restore();
}


