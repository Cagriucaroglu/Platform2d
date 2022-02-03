let mobilmi = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) mobilmi = true;})(navigator.userAgent||navigator.vendor||window.opera);





//setup
var c = document.createElement("canvas");//canvas grafiksel işlemler yapabilceğmiz alanı belirler
c.width = window.innerWidth;//canvasın enini pencerenin iç enine ayarlar
c.height = window.innerHeight;
document.body.appendChild(c);
var ctx = c.getContext("2d");//iki boyutlu resim çizmek için canvasa iki boyutlu resim contextini bağladık yani çizime açık hale getirir contextler 
const scorediv = document.getElementById("score");

var pts = [];
while(pts.length < 254){
    while(pts.includes(var1 = Math.floor(Math.random()*255 )));//Math.floor random çıkan değeri floorluyo * (550-250)+250 kısmı random aralığnı belirliyo
        pts.push(var1);
}
pts.push(pts[0]);//lenght i 254 e küçülttük çünkü son değerin lerpi oluşmaz çizgi küt diye düşer 

var lerp = (a,b,t) => a + (b-a) * (1-Math.cos(t * Math.PI))/2;//a dan bye giderken kaç parçada gitsin onu belirliyorz bu fonksiyonlar a ya math.floor b ye math.ceil diycez ve her noktanın eğimli şekilde oluşmasını sağlıycaz
//lerpi tam anlaamdım

var noise = x=>{
    x = x*0.01%254;//niye %200 dedik anlamadımm tam
    return lerp(pts[Math.floor(x)] , pts[Math.ceil(x)] , x - Math.floor(x));
}


//init
var bgcolor = "#00fdff";
var forecolor = "#3d1607";
var linecolor = "#006000";
var linewidth = 10;
var offset = -10;
var speed = 0;
var t = 0;
var playing = true;
var k={ArrowUp:0,ArrowLeft:0,ArrowRight:0};
var score =0;
var text = "Puan: ";

//character
var player = new function(){

    this.x = c.width/2;
    this.y = 50;
    this.car = new Image();
    this.car.src = "car2.png" ;
    this.rot = 0;
    this.ySpeed = 0;
    this.rSpeed = 0;
    

    //interface
    this.startbtn = new Image();
    this.startbtn.src = "startbtn2.png";
    this.rightbtn = new Image();
    this.rightbtn.src = "sagok.png";
    this.leftbtn = new Image();
    this.leftbtn.src = "solok.png";
    this.firebtn = new Image();
    this.firebtn.src = "gaz.png";  

    this.drawInterface = function(){
    if(playing)
        { 
            
            if(mobilmi){
            //interface
            ctx.drawImage(this.rightbtn, c.width-70,c.height - 70,50,50);
            ctx.drawImage(this.leftbtn, c.width-130 , c.height -70 , 50 , 50);
            ctx.drawImage(this.firebtn, 20 , c.height -70 , 50 , 50);
        }
    }

    }
    

 this.draw = function(){

     var p1 = (c.height*0.9) - noise(this.x + t)*0.43;
     var p2 =(c.height*0.9) - noise(this.x + t +5)*0.43;

     var gnd = 0;
    if(p1-40 > this.y){
     this.ySpeed += 0.1;
        }
     else{
            this.ySpeed -= this.y - (p1-40);
            this.y = p1 - 40;
            gnd = 1;
        }



    if(!playing ||  gnd  &&  Math.abs(this.rot)>Math.PI*0.5)
        {      
     playing = false;
     this.x -= speed*5;
     ctx.textAlign = "center";
     ctx.textBaseline = "middle";
     ctx.font = "30px ımpact";
     ctx.fillStyle = "white";
     ctx.fillText("DEVRİLDİN SKORUN: " + Math.floor(score), c.width/2 , 150);
     ctx.drawImage(this.startbtn,c.width*0.5-25,200,50,50);     

        }
    
         

        //İki tekeri de zeminden hiç ayırmama kodları ,yani arabanın açısını ona göre ayarlama,
        var angle = Math.atan2((p2-40)-this.y , (this.x+5)-this.x);//buraya ilk ylerin farkı sonra xlerin farkını giriyorz o bize ikisini bölüp açıyı veriyo angle=açı demek bize radyan cinsinden değer verir
        //arabanın tam olduğu nokta ile 5px sağındaki noktanın yler farkı bölü xler farkından eğimini aldık 
        if(gnd && playing)
        {
            this.rot -= (this.rot-angle)*0.5;
            this.rSpeed = this.rSpeed - (angle - this.rot);
        }

        this.rSpeed += ( k.ArrowLeft - k.ArrowRight ) * 0.02  ;   

        this.rot -= this.rSpeed *0.1;
        if(this.rot > Math.PI) this.rot = -Math.PI ;
        if(this.rot < -Math.PI) this.rot = Math.PI ;

        
        this.y += this.ySpeed;
        ctx.save();//ctx in mevcut halini kaydeder
        ctx.translate(this.x , this.y);//canvası this.x kadar sağa this.y-40 kadar aşağı kaydırır 
        ctx.rotate(this.rot);//eğimli çiz demek
        ctx.drawImage(this.car , -40 , -40 , 80 , 80);// araba 80 e 80 olduğu için -40 a -40 dersek yeni kanvasın sınırlarına arabanın tam ortası denk gelir
        ctx.restore();//restore = eski haline getirmek


    }
}


// draw ground
function draw(){
    speed -= (speed - k.ArrowUp) * 0.01;
    t += speed*7;

//bg
ctx.fillStyle = bgcolor;// kontekse bgcolorı veriyorz arka planın tamamına verdik-->
ctx.fillRect(0,0,c.width,c.height);

//player arabayı zeminden önce çizersek daha hoş görünür
    player.draw();

//ground
    ctx.fillStyle = forecolor;
    ctx.strokeStyle = linecolor;
    ctx.lineWidth = linewidth;
    ctx.beginPath();
    ctx.moveTo(offset,c.height-offset);

for(let i=offset;i<c.width-offset;i++){
    ctx.lineTo(i,(c.height*0.9) - noise(i + t)*0.43);
}

ctx.lineTo(c.width-offset,c.height-offset);
ctx.closePath();
ctx.fill();//normalde filin içine 4 farklı nokta girilir ilk 2si doldurma işlemine başlancak yerri belirtir x y koordinatı ile son ikisi de bitiş yerini sonra onun hizalarına da noktalar konup dikdörtgen vb şekillerin içi doldurulur ama burda hazır şekil var direk onun içini dolduruyoz
ctx.stroke();//çizginin içini doldurur yani çizgiyi oluşturur


player.drawInterface() ;

console.log(k);
//pointing
if(playing){
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "30px ımpact";
    ctx.fillStyle = "white";
    ctx.fillText("skor: " + Math.floor(score),50 , 50)
}
if(k.ArrowUp>0 && playing)
    score +=0.1;

requestAnimationFrame(draw);

}

draw();


if(mobilmi){
//mobile controls
c.addEventListener("touchstart" , handleStart , false);
c.addEventListener("touchend" , handleEnd , false);

function handleStart(evt){
    evt.preventDefault();
    var touches = evt.changedTouches;
    for (let i = 0 ; i < touches.length ; i++){
        var touch = touches[i];
      //  console.log(touch.pageX + ":" + touch.pageY);
checkBtnPress(touch.pageX , touch.pageY);
    } 
}


function handleEnd(evt){
    evt.preventDefault();
    var touches = evt.changedTouches;
    for (let i = 0 ; i < touches.length ; i++){
        var touch = touches[i];
        //console.log(touch.pageX + ":" + touch.pageY);
        checkBtnRelase(touch.pageX , touch.pageY);

    } 
}
}
else{
    //desktop controls

    onkeydown = d => k[d.key] = 1;//knin içindeki hangi key yani tuşa basıldı ise onu true yapar
    onkeyup = d => k[d.key] = 0;//hangi tuştan el çekildiyse onu false yapar
c.addEventListener("click",handleClick,false);
function handleClick(evt){
checkBtnPress(evt.clientX,evt.clientY);
}
}

window.onresize = function(){
    window.location.reload();//sfyı yeniden yükler 
}

function checkBtnPress(x,y){
if(!playing  &&  x > c.width * 0.50-25 &&  x < c.width * 0.50 + 25   &&  y > 200 && y < 250 )
    window.location.reload();
if(playing  &&  x > c.width-70  &&  x < c.width-20  &&  c.height-70 < y  &&  y < c.height -20)
    k.ArrowRight = 1;
if(playing  &&  x > c.width-130  &&  x < c.width-80  &&  c.height-70 < y  &&  y < c.height -20)
    k.ArrowLeft = 1;
if(playing  &&  x > 20  &&  x < 70   &&  c.height-70 < y  &&  y < c.height -20)
    k.ArrowUp = 1;
}

function checkBtnRelase(x,y){
    if(!playing  &&  x > c.width * 0.50-25 &&  x < c.width * 0.50 + 25   &&  y > 200 && y < 250 )
        window.location.reload();
    if(playing  &&  x > c.width-70  &&  x < c.width-20  &&  c.height-70 < y  &&  y < c.height -20)
        k.ArrowRight = 0;
    if(playing  &&  x > c.width-130  &&  x < c.width-80  &&  c.height-70 < y  &&  y < c.height -20)
        k.ArrowLeft = 0;
    if(playing  &&  x > 20  &&  x < 70   &&  c.height-70 < y  &&  y < c.height -20)
        k.ArrowUp = 0;
    }

    function findRecord(score){
        if(score>record){
            record  = score;
            enb = record;
        }
        else{
            record = enb;
        }
    }
    