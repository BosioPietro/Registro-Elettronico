import $ from "jquery";

const c = console.log;

export const resizeOpzioni = (select, elem) =>{
    let n = select.find(`.${elem}`).length;
    n = n < 3 ? n+2 : n;
    select.find(".selectOptions").css({height: `${n * 1.4}rem`});
}

export const chiudiElemento = (opzione = null, select = null) =>{
    if(!!opzione)select = opzione;
    while(!select.hasClass("pseudoSelect") && select.prop("id") != "root"){
        select = select.parent();   
    }
    select.removeClass("espanso");
    if(!!opzione){
        let val = opzione.closest(".option").attr("valore")
        if(val)
        {
            select.find(".selectBody > .testoSelect").attr("valore", val);
        }
        select.find(".selectBody > .testoSelect").text(opzione.text());
        const opz = opzione.closest(".option");
        select.find(".option").removeClass("selezionata")
        opz.addClass("selezionata");
    }
    select.find(".selectOptions").css({height: 0});
}

export const espandiSelect = (select) =>{
    while(!select.hasClass("pseudoSelect") && select.prop("id") != "root"){
        select = select.parent();   
    }
    if(select.hasClass("espanso")) return chiudiElemento(null, select);
    select.toggleClass("espanso");
    if(select.prop("id") == "root") return alert("s");  
    let opzioni = select.find(".selectOptions");
    if(opzioni.height() > 0) return select.find(".selectBody").blur();
    select.find(".selectBody")
    resizeOpzioni(select, "option");
}

function noDuplicati(a) {
    return [...new Set(a)];
  }

export function selezionaMultipla(e){
    const opz = e.closest(".option");
    const select = opz.closest(".pseudoSelect");
    let classi = select.attr("selezionate").split("-");
    classi = classi.filter(classe => classe != "");
    classi = noDuplicati(classi);
    if(opz.text().trim() == "Tutte"){
        if(opz.hasClass("selezionata")){
            select.attr("selezionate", []);
            select.find(".option:gt(0)").removeClass("selezionata");
            select.find(".testoSelect").text("Seleziona...");
            opz.removeClass("selezionata");
        }else{
            select.find(".option:gt(0)").not(".selezionata").trigger("click");
            opz.addClass("selezionata");
        }
        return;
    }
    if(opz.hasClass("selezionata")){
        classi = classi.filter(classe => classe != opz.text().trim());
        if(select.find(".option").first().hasClass("selezionata")){
            select.find(".option").first().removeClass("selezionata");
            classi = []
            select.find(".option.selezionata").each((i, ref) => {
                if($(ref).is(opz)) return;
                classi.push($(ref).text().trim());
            });
        }
    }else{
        classi.push(opz.text().trim());
        if(select.find(".option.selezionata").length == select.find(".option").length - 1){
            select.find(".option").first().addClass("selezionata");
        }
    }

    if(classi.length == select.find(".option").length - 1){
        select.find(".testoSelect").text("Tutte");
        classi = ["Tutte"];
        select.find(".option").first().addClass("selezionata");
    }else select.find(".testoSelect").text(classi.join(", "));

    classi = classi.join("-");
    select.attr("selezionate", classi);
    opz.toggleClass("selezionata");
}

export function gestisciBlur(e, ref){
    $(window).on("click", function(e){
        if($(e.target).closest(".pseudoSelect").length == 0){
            ref.find(".selectBody").trigger("click");
            $(window).off("click");
        }
    });
}