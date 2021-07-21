


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}





function changeme(){
    
    /*if(event.keyCode == 8){
        if(document.getElementById("finaltest").innerHTML.slice(-6) == "&nbsp;"){
            document.getElementById("finaltest").innerHTML = document.getElementById("finaltest").innerHTML.slice(0, -6);
        }
        else{
            document.getElementById("finaltest").innerHTML = document.getElementById("finaltest").innerHTML.slice(0, -1);
        }
        
    }
    else if(event.keyCode == 32){
        document.getElementById("finaltest").innerHTML += "&nbsp;";
        document.getElementById("inputplace").value = "";
    }
    else{
    const testing = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if(testing.test(document.getElementById("inputplace").value)){
        alert("Please input only in English");
        document.getElementById("inputplace").value = "";
    }*/
    if(document.getElementById("finaltest").innerHTML.length < 95){
        if(event.keyCode != 32 && event.keyCode != 13){
            document.getElementById("finaltest").innerHTML += String.fromCharCode(event.keyCode);
            
        }
        document.getElementById("inputplace").value = "";
    }
    document.getElementById("jb-content").scrollLeft += 1000000;
    document.getElementById("inputplace").value = "";
    
    
}

function changeme2(){
    if(event.keyCode == 8){
        if(document.getElementById("finaltest").innerHTML.slice(-6) == "&nbsp;"){
            document.getElementById("finaltest").innerHTML = document.getElementById("finaltest").innerHTML.slice(0, -6);
        }
        else{
            document.getElementById("finaltest").innerHTML = document.getElementById("finaltest").innerHTML.slice(0, -1);
        }
        
    }
    else if(event.keyCode == 32){
        document.getElementById("finaltest").innerHTML += "&nbsp;";
        document.getElementById("inputplace").value = "";
    }
    else if(event.keyCode == 13){
        document.getElementById("textoutput").innerHTML += "<p>root@game-pc:~$&nbsp;" + document.getElementById("finaltest").innerHTML + "</p>";
        let command = document.getElementById("finaltest").innerHTML;
        document.getElementById("finaltest").innerHTML = "";
        document.getElementById("inputplace").value = "";
        
        if(command == "help"){
            let content = readTextFile("help.txt");
            content.replaceAll("\n", "<br/>");
            document.getElementById("textoutput").innerHTML += content;
        }

    }
    document.getElementById("inputplace").value = "";
    document.getElementById("jb-content").scrollLeft += 10000;
}

function byebye(){
    document.getElementById("inputplace").value = "";
}