import $ from 'jquery';

export function toggleMenu(forzaChiudi = null){
    const mobile = $("#cntLogin").css("flexDirection") == "column";

    forzaChiudi = typeof forzaChiudi === "boolean" && forzaChiudi ? forzaChiudi : false;
    const barra = $(".barraLaterale");

    if(barra.css("position") != "absolute")return;

    const btn = forzaChiudi ? $("#btnMenu") : $(event.target).closest("button");
    const cont = btn.parent().siblings();

    if(mobile)   // mobile
    {
        if(barra.hasClass("aperta") || forzaChiudi){
            barra.removeClass("nonCollassatoMobile").addClass("collassatoMobile");
        }
        else{
            barra.removeClass("collassatoMobile").addClass("nonCollassatoMobile");
        }
    }
    else{   // desktop
        if(barra.hasClass("aperta") || forzaChiudi){
            btn.removeClass("nonCollassato").addClass("collassato");
            cont.removeClass("nonCollassato").addClass("collassato");
        }
        else{
            btn.removeClass("collassato").addClass("nonCollassato");
            cont.removeClass("collassato").addClass("nonCollassato");

        }
    }
    barra.toggleClass("aperta");
}