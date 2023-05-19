const menu = document.getElementById("main-menu");

// cuando la hamburguesa reciba click
document.querySelector(".hamburguesa").addEventListener("click", ()=>{
        // asignar la clase activo a menu para que aparezca
        menu.classList.toggle("activo");
    }
);

document.querySelectorAll("#main-menu ul a").forEach((enlace)=>{
    // cuando uno de los enlaces del menu reciba click
    enlace.addEventListener("click", ()=>{
        // quitar la clase activo a menu para que desaparezca
        menu.classList.remove("activo");
    })
});