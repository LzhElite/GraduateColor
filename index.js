/**
 * Created by Elite on 2015/8/28.
 */
//1) rgb��ɫת��Ϊ16������ɫ
String.prototype.RGBtoHex=function(){
    var aColor=this.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
    var hexColor="#"
    for(var i=0;i<aColor.length;i++){
        var num=Number(aColor[i]).toString(16);
        if(num==="0"){//���Ϊ0����λΪ00
            num+=num;
        }
        hexColor+=num
    }
    return hexColor
}
//2) 16������ɫת��ΪRGB��ɫ
String.prototype.HexToRGB=function(){
    var a=[];
    for(i=1;i<7;i+=2){
        a.push(parseInt("0x"+this.slice(i,i+2)));
    }
    var rgbColor="RGB("+ a.join(",")+")";
    return rgbColor;
}
//3�����ݣ���ʼ��ɫ��������ɫ�ͽ�������
// ���㣺���еĽ���ɫ
// ��ɫ��ʾ��RGB(R,G,B)
function printColor(start,target,n){
    reg=/(\d+)/g;
    var s=start.match(reg);//�õ���ʼ��ɫRGBֵ������["R", "G", "B"]
    var t=target.match(reg);//�õ�Ŀ����ɫRGBֵ������["R", "G", "B"]
    var r=(t[0]-s[0])/(n-1);//���r�ĵȱȲ�ֵ
    var g=(t[1]-s[1])/(n-1);//���g�ĵȱȲ�ֵ
    var b=(t[2]-s[2])/(n-1);//���b�ĵȱȲ�ֵ
    var a=[];//����һ�����飬��Ž����RGBֵ
    for(var i= 0;i<n;i++){
        tempr=parseInt(Number(s[0])+r*i);//��i���RGB�е�Rֵ
        tempg=parseInt(Number(s[1])+g*i);//��i���RGB�е�Gֵ
        tempb=parseInt(Number(s[2])+b*i);//��i���RGB�е�Bֵ
        var temp="RGB("+tempr+","+tempg+","+tempb+")";//RGB(R,G,B)
        a.push(temp);//���õ���RGBֵ��������
    }
    return a;
}

//4) ��rgb�����е�����RGBֵ����һת��Ϊ16������ɫֵ�����
function run(rgb,colorNum){
    for(var i=0;i<colorNum;i++){
        var tempHexColor=rgb[i].RGBtoHex();
        var tr=document.createElement("tr");
        var td1=document.createElement("td");
        var td2=document.createElement("td");
        td1.innerHTML=i;
        td2.innerHTML=tempHexColor;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.style.background=tempHexColor;
        oTable.appendChild(tr);
    }
}

//5������֤����
function validate(ele){//����֤��ɫ
    var str=ele.value;
    var reg=/^ +| +$/g; //�Զ�ȥ��ǰ��ո�
    if(str){
        str=str.replace(reg,"");
        if(str.length){
            var reg2=/^#[0-9a-fA-f]{6}$/;
            if(reg2.exec(str)){
                next(ele).innerHTML="";
                ele.flag=true;
            }else{
                ele.flag=false;
                next(ele).innerHTML="* ��ɫ��ʽ����"
            }
        }
        ele.value=str;
    }else{
        ele.flag=false;
        next(ele).innerHTML="* ��ɫֵ����Ϊ��"
    }
}
function validateNum(ele){//����֤����
    var str=ele.value;
    var reg=/^ +| +$/g;//�Զ�ȥ��ǰ��ո�
    var reg3=/^0+/;
    if(str){
        str=str.replace(reg,"");
        str=str.replace(reg3,"");
        if(str.length){
            var reg2=/^[1-9][0-9]*$/;
            if(reg2.exec(str)&&Number(reg2.exec(str))<=100&&Number(reg2.exec(str))>1){
                next(ele).innerHTML="";
                ele.flag=true;
            }else{
                ele.flag=false;
                next(ele).innerHTML="* ��ɫ������ʽ��������100"
            }
        }
        ele.value=str;
    }else{
        ele.flag=false;
        next(ele).innerHTML="* ��ɫ��������Ϊ��"
    }
}

// 6����ȡ��һ���ֵ�Ԫ��
function next(ele){//����Ǳ�׼�������֧��ele.nextElementSibling�������򷵻��ø÷�����IE 6-8��֧��
    if(ele.nextElementSibling){
        return ele.nextElementSibling;
    }
    //�����֧������Ĵ��룬���ִ�е������
    var n=ele.nextSibling;
    while(n){
        if(n.nodeType===1){
            return p;
        }
        n= n.nextSibling();
    }
    return null;//û�еܵ�Ԫ�ط���null�����������Ҫ����ֵ���������Ҳ�����һ��Լ��дreturn null�������������Ҫ����ֵ������ֵΪundefined��
}

var oTable=document.getElementById("tb");
var startcolor=document.getElementById("startcolor");
var endcolor=document.getElementById("endcolor");
var num=document.getElementById("num");
var btn=document.getElementById("btn");

startcolor.onblur=function(){
    validate(this); //�����֤ͨ�� this.flag=true
}
endcolor.onblur=function(){
    validate(this);//�����֤ͨ�� this.flag=true
}
num.onblur=function(){//�����֤ͨ�� this.flag=true
    validateNum(this);
}
btn.onclick=function(){//���庯�������������ɫ
    if(startcolor.flag&&endcolor.flag&&num.flag){//ÿ������.flag��δtrue�����ύ����Ҳ�������ύִ��Ajax��
        oTable.innerHTML="";
        var startColor=startcolor.value; //��ʼ��ɫ 16������ɫ��ʾֵ
        var targetColor=endcolor.value; //������ɫ 16������ɫ��ʾֵ
        var colorNum=num.value;//һ�����ɶ����ֽ���ɫ 10������
        var start=startColor.HexToRGB();//����ʼ��ɫת��ΪRGB(R,G,B)��ʽ
        var target=targetColor.HexToRGB();//��������ɫת��ΪRGB(R,G,B)��ʽ
        if(start&&target&&colorNum){//�����ʼ��ɫ��������ɫ�ͽ���������Ϊ��
            var rgbColorArray=printColor(start,target,colorNum);
        }
        run(rgbColorArray,colorNum);
    }else{  //��� ĳһ������.flag��Ϊtrue����ʾ��ʾ��
        next(this).innerHTML="��������д���ݺ����ύ";
    }
}