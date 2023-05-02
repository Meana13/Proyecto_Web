const menu = document.getElementById("main-menu");

document.querySelector(".hamburguesa").addEventListener("click", ()=>{
        menu.classList.toggle("activo");
    }
);

document.querySelectorAll("#main-menu ul a").forEach((enlace)=>{
    enlace.addEventListener("click", ()=>{
        menu.classList.remove("activo");
    })
});