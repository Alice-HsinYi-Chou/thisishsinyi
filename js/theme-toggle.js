var icon=document.getElementById("icon__sun")
icon.onclick = function (){
    document.body.classList.toggle("bright-theme")
    if(document.body.classList.contains("bright-theme")){
        icon.src = "/assets/icons/dark mode.svg";
    }else{
        icon.src = "/assets/icons/bright mode2.svg";
    }
}