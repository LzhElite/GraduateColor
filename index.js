/**
 * Created by Elite on 2015/8/28.
 */
//1) rgb颜色转换为16进制颜色
String.prototype.RGBtoHex=function(){
    var aColor=this.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
    var hexColor="#"
    for(var i=0;i<aColor.length;i++){
        var num=Number(aColor[i]).toString(16);
        if(num==="0"){//如果为0，补位为00
            num+=num;
        }
        hexColor+=num
    }
    return hexColor
}
//2) 16进制颜色转换为RGB颜色
String.prototype.HexToRGB=function(){
    var a=[];
    for(i=1;i<7;i+=2){
        a.push(parseInt("0x"+this.slice(i,i+2)));
    }
    var rgbColor="RGB("+ a.join(",")+")";
    return rgbColor;
}
//3）根据：开始颜色、结束颜色和渐变数量
// 计算：所有的渐变色
// 颜色表示用RGB(R,G,B)
function printColor(start,target,n){
    reg=/(\d+)/g;
    var s=start.match(reg);//得到开始颜色RGB值的数组["R", "G", "B"]
    var t=target.match(reg);//得到目标颜色RGB值的数组["R", "G", "B"]
    var r=(t[0]-s[0])/(n-1);//求出r的等比差值
    var g=(t[1]-s[1])/(n-1);//求出g的等比差值
    var b=(t[2]-s[2])/(n-1);//求出b的等比差值
    var a=[];//定义一个数组，存放渐变的RGB值
    for(var i= 0;i<n;i++){
        tempr=parseInt(Number(s[0])+r*i);//第i项的RGB中的R值
        tempg=parseInt(Number(s[1])+g*i);//第i项的RGB中的G值
        tempb=parseInt(Number(s[2])+b*i);//第i项的RGB中的B值
        var temp="RGB("+tempr+","+tempg+","+tempb+")";//RGB(R,G,B)
        a.push(temp);//将得到的RGB值存入数组
    }
    return a;
}

//4) 将rgb数组中的所有RGB值，逐一转换为16进制颜色值并输出
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

//5）表单验证方法
function validate(ele){//表单验证颜色
    var str=ele.value;
    var reg=/^ +| +$/g; //自动去除前后空格
    if(str){
        str=str.replace(reg,"");
        if(str.length){
            var reg2=/^#[0-9a-fA-f]{6}$/;
            if(reg2.exec(str)){
                next(ele).innerHTML="";
                ele.flag=true;
            }else{
                ele.flag=false;
                next(ele).innerHTML="* 颜色格式错误"
            }
        }
        ele.value=str;
    }else{
        ele.flag=false;
        next(ele).innerHTML="* 颜色值不能为空"
    }
}
function validateNum(ele){//表单验证数字
    var str=ele.value;
    var reg=/^ +| +$/g;//自动去除前后空格
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
                next(ele).innerHTML="* 颜色数量格式错误或大于100"
            }
        }
        ele.value=str;
    }else{
        ele.flag=false;
        next(ele).innerHTML="* 颜色数量不能为空"
    }
}

// 6）获取下一个兄弟元素
function next(ele){//如果是标准浏览器，支持ele.nextElementSibling方法，则返回用该方法。IE 6-8不支持
    if(ele.nextElementSibling){
        return ele.nextElementSibling;
    }
    //如果不支持上面的代码，则会执行到这儿来
    var n=ele.nextSibling;
    while(n){
        if(n.nodeType===1){
            return p;
        }
        n= n.nextSibling();
    }
    return null;//没有弟弟元素返回null（如果函数需要返回值，但是有找不到，一般约定写return null；如果函数不需要返回值，返回值为undefined）
}

var oTable=document.getElementById("tb");
var startcolor=document.getElementById("startcolor");
var endcolor=document.getElementById("endcolor");
var num=document.getElementById("num");
var btn=document.getElementById("btn");

startcolor.onblur=function(){
    validate(this); //如果验证通过 this.flag=true
}
endcolor.onblur=function(){
    validate(this);//如果验证通过 this.flag=true
}
num.onblur=function(){//如果验证通过 this.flag=true
    validateNum(this);
}
btn.onclick=function(){//定义函数，点击生成颜色
    if(startcolor.flag&&endcolor.flag&&num.flag){//每个表单项.flag都未true，就提交表单（也可以是提交执行Ajax）
        oTable.innerHTML="";
        var startColor=startcolor.value; //开始颜色 16进制颜色表示值
        var targetColor=endcolor.value; //结束颜色 16进制颜色表示值
        var colorNum=num.value;//一共生成多少种渐变色 10进制数
        var start=startColor.HexToRGB();//将开始颜色转换为RGB(R,G,B)格式
        var target=targetColor.HexToRGB();//将结束颜色转换为RGB(R,G,B)格式
        if(start&&target&&colorNum){//如果开始颜色、结束颜色和渐变数量不为空
            var rgbColorArray=printColor(start,target,colorNum);
        }
        run(rgbColorArray,colorNum);
    }else{  //如果 某一个表单项.flag不为true，显示提示语
        next(this).innerHTML="请完整填写内容后再提交";
    }
}