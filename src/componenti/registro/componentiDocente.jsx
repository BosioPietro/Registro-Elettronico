import React, {useEffect, useRef} from "react";
import { createRoot } from "react-dom/client";

import $ from 'jquery'

import { inviaRichiesta, errore } from '../../server/libreria';
import {espandiSelect, chiudiElemento, selezionaMultipla, gestisciBlur} from '../select/select';
import Swal from 'sweetalert2';
import '../select/select.css'

import { ottieniColore } from "../lib_colori";

import {stileCheckbox} from "./stile"

const dataInSQL = (data) => {
    const anno = data.getFullYear();
    const mese = String(data.getMonth() + 1).padStart(2, '0');
    const giorno = String(data.getDate()).padStart(2, '0');
    return `${anno}-${mese}-${giorno}`;
}

export const HomeDocente = (props) => {
    
    const nome = props.nome.charAt(0).toUpperCase() + props.nome.slice(1);

    let filtri = []
    for(let i = 0; i < 6; i++){
        filtri.push("hue-rotate(" + (i * 360 / 6) + "deg)");
    }

    function vaiA(indice){
        $(".barraLaterale .opzione").eq(indice).trigger("click")
        $(".barraLaterale").removeClass("aperta")
    }


    return (
    <div className="pagina flex-col" id="home" titolo={`Bentornato, ${nome}`}>
        <h3>Collegamenti Rapidi</h3>
        <div className="flex-row">
            <div className="cartaMenu flex-col" style={{filter : filtri[0]}}>
                <ion-icon name="home"></ion-icon>
                <p>Home</p>
            </div>
            <div className="cartaMenu flex-col" style={{filter : filtri[1]}} onClick={() =>{vaiA(1)}}>
                <ion-icon name="newspaper"></ion-icon>
                <p>Valutazioni</p>
            </div>
            <div className="cartaMenu flex-col"  style={{filter : filtri[2]}} onClick={() =>{vaiA(2)}}>
                <ion-icon name="library"></ion-icon>
                <p>Compiti & Programma</p>
            </div>
            <div className="cartaMenu flex-col" style={{filter : filtri[3]}} onClick={() =>{vaiA(3)}}>
                <ion-icon name="sad"></ion-icon>
                <p>Assenze</p>
            </div>
            <div className="cartaMenu flex-col" style={{filter : filtri[4]}} onClick={() =>{vaiA(5)}}>
                <ion-icon name="person-circle"></ion-icon>
                <p>Anagrafico</p>
            </div>
            <div className="cartaMenu flex-col" style={{filter : filtri[5]}} onClick={() =>{vaiA(4)}}>
                <ion-icon name="information-circle"></ion-icon>
                <p>Comunicazioni</p>
            </div>
        </div>
    </div>)
}

export const VotiDocente = () => {

    return (
    <div className="pagina nascosto flex-col" titolo="Valutazioni" id="docenteValutazioni">
        <div className="flex-row" style={{gap : "1rem"}}>
            <div className="flex-col">
                <h2>Classe</h2>
                <SelectClassi f={cambiaClasse} fOpz={cambiaStudente}/>
            </div>
            <div className="flex-col nascosto">
                <h2>Studente</h2>
                <SelectStudenti/>
            </div>
        </div>
        <div id="contTabellaVoti">
            <div id="tabellaVoti"></div>
        </div>
    </div>)
}

export const ArgomentiDocente = () => {

    function lunedi() {
        const today = new Date();
        const day = today.getDay(); 
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(today.setDate(diff));
        return monday;
    }

    let inizio = lunedi();
    const dataInizio = inizio;
    let fine = new Date(inizio);
    const dataFine = fine;
    fine.setDate(fine.getDate() + 6);
    inizio = inizio.toLocaleString('it-IT', { day: 'numeric', month: 'long' });
    fine = fine.toLocaleString('it-IT', { day: 'numeric', month: 'long' });

    const cambiaData = (indice) => {
        const contInizio = $("#rangeDataInizio");
        const contFine = $("#rangeDataFine");
        const inizio = new Date(contInizio.attr("data"));
        const fine = new Date(contFine.attr("data"));
        inizio.setDate(inizio.getDate() + 7 * indice);
        fine.setDate(fine.getDate() + 7 * indice);
        contInizio.attr("data", inizio).text(inizio.toLocaleString('it-IT', { day: 'numeric', month: 'long' }));
        contFine.attr("data", fine).text(fine.toLocaleString('it-IT', { day: 'numeric', month: 'long' }));
        caricaArgomenti($("#selectClassiArg").find(".testoSelect").text());
    }

    return (
        <div id="docenteArgomenti" className='flex-col pagina nascosto' titolo="Compiti & Argomenti">
            <div className="flex-col">
                <h2>Classe</h2>
                <SelectClassiArg/>
            </div>
            <span className="flex-row" style={{gap : "1rem"}} id="wrapperBottoniData">
                <button className="btnData flex-col" onClick={() => {cambiaData(-1)}}>
                    <ion-icon name="chevron-back"></ion-icon>
                </button>
                    <span className="hl" id="rangeDataInizio" data={dataInizio} defaultd={dataInizio}>{inizio}</span>
                    <span style={{color : "#79809c"}}>e</span>
                    <span className="hl" id="rangeDataFine" data={dataFine} defaultd={dataFine}>{fine}</span>
                <button className="btnData flex-col" onClick={() => {cambiaData(1)}}>
                    <ion-icon name="chevron-forward"></ion-icon>
                </button>
            </span>
            <div className="flex-col" id="wrapperArgomenti">
                <div className='flex-col' id="contArgomenti">
                    <div className="rigaArgomenti flex-row">
                        <div className="cellaData flex-col">
                        </div>
                        <div className="cellaTesto">
                        </div>
                    </div>
                    <div className="rigaArgomenti flex-row">
                        <div className="cellaData flex-col">
                        </div>
                        <div className="cellaTesto">
                        </div>
                    </div><div className="rigaArgomenti flex-row">
                        <div className="cellaData flex-col">
                        </div>
                        <div className="cellaTesto">
                        </div>
                    </div><div className="rigaArgomenti flex-row">
                        <div className="cellaData flex-col">
                        </div>
                        <div className="cellaTesto">
                        </div>
                    </div><div className="rigaArgomenti flex-row">
                        <div className="cellaData flex-col">
                        </div>
                        <div className="cellaTesto">
                        </div>
                    </div><div className="rigaArgomenti flex-row">
                        <div className="cellaData flex-col">
                        </div>
                        <div className="cellaTesto">
                        </div>
                    </div>
                    <div className="rigaArgomenti flex-row">
                        <div className="cellaData flex-col">
                        </div>
                        <div className="cellaTesto">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ottieniGiorno(inizio, offset){
    let giorno = new Date(inizio);
    giorno.setDate(giorno.getDate() + offset);
    return giorno.toLocaleString('it-IT', { weekday : 'long' ,day: 'numeric', month: 'long' });
}

function modifcaArgomento(argomento, colore, materie){
    const html = `
        <div class="flex-col">
            <div class="flex-col">
                <span class="label>">Materia</span>
                <span class="materiaHl" style="filter: hue-rotate(${colore}deg)">${argomento["materia"]}</span>
            </div>
            <div class="flex-col">
                <span class="label>">Data</span>
                <input type="date" id="dataModArg" value="${argomento["data"]}" class='swal-input'">
            </div>
            <div class="flex-col">
                <span class="label>">Descrizione</span>
                <textarea id="descrizioneModArg" class='swal-input' placeholder='Inserisci una descrizione...'>${argomento["argomento"]}</textarea>
            </div>
            <button class="flex-col swalAnnulla swal2-cancel btnCancella">
                <ion-icon name="trash"></ion-icon>
            </button>
            <div class="errore">Sono stati inseriti dati non validi</div>
        </div>`

    Swal.fire({
        title: 'Modifica Argomento',
        html: html,
        confirmButtonText: '',
        showCancelButton: true,
        cancelButtonText: '',
        customClass: {
            popup: 'swal',
            title: 'swal-titolo',
            htmlContainer: 'swal-titolo',
            input: 'swal-input',
            actions: 'wrapperBottoneSwal',
            confirmButton: 'swalConferma',
            cancelButton: 'swalAnnulla',
        },
        willOpen: () => {
            $(".btnCancella").on("click", () => {
                Swal.fire({
                    title: 'Sei Sicuro?',
                    text: "Non potrai tornare indietro!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '',
                    cancelButtonText: '',
                    customClass: {
                        popup: 'swal',
                        title: 'swal-titolo',
                        htmlContainer: 'swal-titolo',
                        input: 'swal-input',
                        actions: 'wrapperBottoneSwal',
                        confirmButton: 'swalConferma',
                        cancelButton: 'swalAnnulla'
                    },
                }).then((result) => {
                    if(!result.isConfirmed) return;
                    inviaRichiesta("POST", "src/server/eliminaArgomento.php", {id : argomento["id"]})
                    .done((data) => {
                        if(data)
                        {
                            caricaArgomenti($("#selectClassiArg").find(".testoSelect").text());
                            mostraConferma("Argomento Eliminato")
                        }
                        else mostraErrore("Errore Eliminazione Voto");
                    })
                    .fail(errore)
                })
            })
        },
        preConfirm: () => {
            if(!$("#descrizioneModArg").val())
                $(".errore").animate({opacity: 1}, 100, () => {setTimeout(() => {$(".errore").css("opacity", "")}, 1000)});
            return !!$("#descrizioneModArg").val()
        }
    }).then((result) => {
        if(!result.isConfirmed) return;
        const data = $("#dataModArg").val()
        const desc = $("#descrizioneModArg").val()
        const classe = argomento["classe"]
        const materia = materie.find((materia) => materia["materia"] == argomento["materia"])["id"]
        inviaRichiesta("POST", "src/server/modificaArgomento.php", {id : argomento["id"], data, desc, classe, materia})
        .done((data) => {
            if(data)
            {
                caricaArgomenti($("#selectClassiArg").find(".testoSelect").text());
                mostraConferma("Argomento Modificato")
            }
            else mostraErrore("Errore");
        })
        .fail(errore)
    })
}
const vRoot = []

async function caricaArgomenti(classe){
    const dataInSQL = (data) => {
        const anno = data.getFullYear();
        const mese = String(data.getMonth() + 1).padStart(2, '0');
        const giorno = String(data.getDate()).padStart(2, '0');
        return `${anno}-${mese}-${giorno}`;
    }
    if(vRoot.length > 0)
    {
        vRoot.forEach((root) => {root.unmount();})
    }

    const cellaTesto = $(".cellaTesto")
    cellaTesto.eq(0).attr("init", true)
    $(".cellaData").empty();

    let dataInizio = new Date($("#rangeDataInizio").attr("data"));
    let dataFine = new Date($("#rangeDataFine").attr("data"));

    const inizio = dataInizio;
    const fine = dataFine;

    dataInizio = dataInSQL(dataInizio);
    dataFine = dataInSQL(dataFine);

    const materie = await inviaRichiesta("GET", "src/server/materie.php")
    
    inviaRichiesta("GET", "src/server/argomenti.php", {range : {dataInizio, dataFine}, classe})
    .done((data) => {
        const arg = new Array(7);
        for (let i = 0; i < arg.length; i++) {
            arg[i] = [];
        }
        for(const argomento of data)
        {
            const materia = materie.find((m) => m["id"] == argomento["materia"])
            argomento["materia"] = materia["materia"];
            const dataArgomento = new Date(argomento["data"]);
            const offset = dataArgomento.getDate() - inizio.getDate();
            arg[offset].push(argomento);
        }
        const frazione = 360 / materie.length;
        let tot = []
        for(const [j, giorno] of Object.entries(arg)){
            let divGiorno = []
            for(let [i, argomento] of Object.entries(giorno)){  
                const materiaArgomento = materie.find((m) => m["materia"] == argomento["materia"])
                const id = materiaArgomento["id"]
                const index = materie.findIndex((m) => m["id"] == id)
                const colore = {filter : `hue-rotate(${frazione * index}deg)`};
                divGiorno.push(<div className="cellaArgomento" key={i}>
                                <span className="materiaHl" name={id} style={colore} onClick={() => {modifcaArgomento(argomento, frazione * index, materie)}}>
                                    {argomento["materia"]}
                                    &nbsp;&nbsp;•&nbsp;&nbsp;
                                    <ion-icon name="pencil"></ion-icon>
                                </span>
                                <span className="argomento">{argomento["argomento"]}</span>
                            </div>)
            }
            divGiorno.push(
            <button className={`btnAggiungiArg flex-col ${giorno.length == 0 ? "solo" : ""}`} key={j + giorno.length} onClick={(e) => {aggiungiArgomento(e, materie)}}>
                <ion-icon name="add"></ion-icon>
            </button>)
            tot.push(divGiorno)
        }
        vRoot.forEach((root) => {root.unmount();})
        tot = tot.map((giorno, i) => { return giorno.length == 0 ? [<div className="cellaArgomento" key={i}>Niente in Programma</div>] : giorno })
        cellaTesto.each((i, ref) => {
            const root = createRoot(ref);
            vRoot.push(root);
            root.render(<>{tot[i]}</>);
            $(ref).prev().html(ottieniGiorno(inizio, i));
        })
    })
    .fail(errore)
}

function aggiungiArgomento(e, materie){
    function stringaInData(stringa) {
        stringa = stringa.trim().split(' ');
        stringa = stringa[1] + ' ' + stringa[2] + ' ' + (new Date()).getFullYear();
        const mesi = { gennaio: 0, febbraio: 1, marzo: 2, aprile: 3, maggio: 4, giugno: 5, luglio: 6, agosto: 7, settembre: 8, ottobre: 9, novembre: 10, dicembre: 11};
        const parti = stringa.split(' ');
        const giorno = parseInt(parti[0]);
        const mese = parti[1];
        const anno = parseInt(parti[2]);
        const indexMese = mesi[mese.toLowerCase()];
        return new Date(anno, indexMese, giorno);
    }

    function stampaOpzioni(){
        let opzioni = [];
        for(const [i, materia] of Object.entries(materie)){
            opzioni.push( 
            <div className="option" valore={materia["id"]} key={i} onClick={(e) => {chiudiElemento($(e.target), null)}}>
                <span>{materia["materia"]}</span>
                <ion-icon name="checkmark-outline"></ion-icon>
            </div>)
        }
        return opzioni;
    }

    let data = $(e.target).closest(".cellaTesto").siblings(".cellaData").text()
    let hl = $(e.target).closest(".cellaTesto").find(".materiaHl")
    let materiePresenti = []
    hl.each((i, ref) => {materiePresenti.push($(ref).text())})
    materiePresenti = materiePresenti.map((m) => m.split(" ")[0].trim())
    materie = materie.filter((m) => !materiePresenti.includes(m["materia"]))
    data = stringaInData(data)
    const dataSQL = dataInSQL(data)
    const html = 
        <div className="flex-col">
            <div className="flex-col">
                <span className="label">Materia</span>
                <div className="pseudoSelect flex-col" id="selectMaterieAA">
                    <div className="selectDesc" onClick={(e) => {espandiSelect($(e.target))}}>&nbsp;Materia</div>
                    <div className="selectBody flex-row" tabIndex="0" 
                    onClick={(e) => {espandiSelect($(e.target))}}
                    onBlur={(e) => {chiudiElemento($(e.target), null)}}>
                        <span className="testoSelect flex-col">Seleziona...</span>
                        <ion-icon name="chevron-down-outline"></ion-icon>
                    </div>
                    <div className="selectOptions flex-col" style={{maxHeight: "25rem"}}>   
                        {stampaOpzioni()}
                    </div>
                </div>
            </div>
            <div className="flex-col">
                <span className="label">Data</span>
                <input type="date" id="dataNuovoArg" className='swal-input' defaultValue={dataSQL}/>
            </div>
            <div className="flex-col">
                <span className="label">Descrizione</span>
                <textarea id="descrizioneNuovoArg" className='swal-input' placeholder='Inserisci una descrizione...'></textarea>
            </div>
            <div className="errore">Sono stati inseriti dati non validi</div>
        </div>
    let root;
    Swal.fire({
        title: `Nuovo Argomento`,
        html: "<input type='hidden'/>",
        confirmButtonText: '',
        showCancelButton: true,
        cancelButtonText: '',
        customClass: {
            popup: 'swal',
            title: 'swal-titolo',
            htmlContainer: 'swal-titolo',
            input: 'swal-input',
            actions: 'wrapperBottoneSwal',
            confirmButton: 'swalConferma',
            cancelButton: 'swalAnnulla'
        },
        willOpen: () => {
            root = createRoot($(".swal2-html-container")[0])
            root.render(<>{html}</>);
        },
        preConfirm: () => {
            let giusto = true;
            giusto &= $("#descrizioneNuovoArg").val() != "";
            giusto &= $("#selectMaterieAA").find(".testoSelect").attr("valore") != undefined;
            if(!giusto) $(".errore").animate({opacity: 1}, 100, () => {setTimeout(() => {$(".errore").css("opacity", "")}, 1000)});
            return !!giusto;
        }
    }).then((result) => {
        if(!result.isConfirmed) return root.unmount();
        const classe = $("#selectClassiArg").find(".testoSelect").text();
        const dataArg = $("#dataNuovoArg").val();
        const idMateria = $("#selectMaterieAA").find(".testoSelect").attr("valore");
        const descrizione = $("#descrizioneNuovoArg").val();
        root.unmount();
        inviaRichiesta("POST", "src/server/aggiungiArgomento.php", {classe, dataArg, idMateria, descrizione})
        .done((data) => {
            if(data)
            {
                caricaArgomenti($("#selectClassiArg").find(".testoSelect").text());
                mostraConferma("Argomento Aggiunto")
            }
            else mostraErrore("Errore");
        })
        .fail(() => {mostraErrore("Errore")});
    })
}

function mostraArgomenti(e){
    let bd = $(e.target).closest(".selectOptions").parent().parent()
    bd.addClass("selectCollassato")
    $("#wrapperArgomenti").animate({maxHeight : "100vh"}, 500).css("overflow-y" , "auto")
    $("#wrapperBottoniData").animate({maxWidth : "100vw"}, 500).css("overflow" , "visible")
    setTimeout(() => {bd.on("click", () => {resetArgomenti(bd)})}, 10)
    const classe = bd.find(".testoSelect").text();
    caricaArgomenti(classe);
}

function resetArgomenti(bd){
    bd.off("click")
    bd.find(".selectBody").trigger("click")
    bd.removeClass("selectCollassato")
    $("#wrapperArgomenti").css({maxHeight : "70vh"}).css("overflow-y" , "hidden")
    $("#wrapperBottoniData").css({maxWidth : "70vw"}).css("overflow" , "hidden")
    setTimeout(() =>{
        $("#wrapperArgomenti").animate({maxHeight : "0"}, 500)
        $("#wrapperBottoniData").animate({maxWidth : "0"}, 500, () => {
            $(".cellaData").empty()
            let i = $("#rangeDataInizio")
            i.attr("data", i.attr("defaultd"))
            let data = new Date(i.attr("defaultd"))
            i.text(data.toLocaleString('it-IT', { day: 'numeric', month: 'long' }))
            let f = $("#rangeDataFine")
            f.attr("data", f.attr("defaultd"))
            data = new Date(f.attr("defaultd"))
            f.text(data.toLocaleString('it-IT', { day: 'numeric', month: 'long' }))
        })
    }, 10) 
}

function resetAssenze(bd, trigger = true){
    chiudiPannelloAssenza()
    bd.removeClass("selectCollassato")
    bd.off("click")
    bd.find(".testoSelect").text("Seleziona...").attr("valore", "")
    $("#contTabellaAssenze").animate({maxHeight : "0px"}, 500, () => {if(rootTabella)rootTabella.unmount()})
    if(trigger)bd.find(".selectBody").trigger("click")
}

export const AssenzeDocente = () => {
    let oggi = new Date();
    oggi = oggi.toLocaleDateString("it-IT", {day: "2-digit", month: "long", year: "numeric"})
    return (
    <div className="pagina nascosto flex-col" id="docenteAssenze" titolo={"Assenze - " + oggi }>
        <div className="flex-row" style={{gap : "1rem"}}>
            <div className="flex-col">
                <h2>Classe</h2>
                <SelectClassi f={assenzeStudente}/>
            </div>
        </div>
        <div id="contTabellaAssenze">
            <div id="tabellaAssenze">

            </div>
            <div id="assenzeStudente">
                <div className="flex-col" 
                     style={{height : "100%", width: "100%", padding : "5rem 1.5rem 2rem 2rem", gap : "1rem", overflowY : "scroll"}}>
                </div>
            </div>
        </div>
    </div>)
}

export const ComunicazioniDocente = () => {

    let puoAnimare = true;

    function toggle(e){
        if(!puoAnimare) return;
        puoAnimare = false;
        const cont = $(e.target).closest(".flex-col")
        const tabella = cont.find(".collassaTabella")
        const icona = cont.find("ion-icon").first()
        if(tabella.hasClass("aperta")){
            tabella.css({height : 0})
            cont.css({overflow : "hidden"})
            tabella.css({overflow : "hidden"})
            icona.css({transform : "rotate(0deg)"})
            setTimeout(() => {puoAnimare = true}, 300)
        }else{
            const alt = tabella.children().eq(0).height()
            tabella.css({height : alt})
            icona.css({transform : "rotate(180deg)"})
            setTimeout(() => {
                cont.css({overflow : "visible"})
                tabella.css({overflow : "visible"})
                puoAnimare = true;
            }, 500)
        }
        tabella.toggleClass("aperta")
    }

    function textareaResize(txt) {
        let resizeInt = null;

        let resizeEvent = function() {
            const alt = txt.parent().parent().height()
            txt.closest(".collassaTabella").css({height : alt})
        };
    
        txt.on("mousedown", function(e) {
            resizeInt = setInterval(resizeEvent, 1000/60);
        });
    
        $(window).on("mouseup", function(e) {
            if (resizeInt !== null) {
                clearInterval(resizeInt);
            }
        });
    };
    let init = false;
    useEffect(() => {
        if(!init){
            init = true;
            textareaResize($("#txtNuovaCircolare"))
        }
    }, [])
      
    function aggiungiCircolare(){
        let oggi = dataInSQL(new Date());
        const titolo = $("#titoloNuovaComunicazione").val().trim();
        const testo = $("#txtNuovaCircolare").val().trim();
        let classi = $("#selectMClassi .testoSelect").text();
        classi = classi.toLowerCase().includes("tutte") ? "*" : classi;

        if(titolo == "" || testo == "" || classi == "Seleziona..."){
            mostraErrore("Dati mancanti");
            return;
        }

        inviaRichiesta("POST", "src/server/aggiungiCom.php", {titolo, testo, classi, data : oggi}).done((data) => {
            if(data === true){
                mostraConferma("Comunicazione aggiunta");
                $("#titoloNuovaComunicazione").val("");
                $("#txtNuovaCircolare").val("");
                $("#selectMClassi").attr("selezionate", "Tutte")
                $("#selectMClassi").find(".option").addClass("selezionata");
            }else mostraErrore("Errore");
        })
    }

    function cercaCircolare(e, val = null){
        const chkNumero = stringa => [...stringa].every(c => '0123456789'.includes(c));

        const mesi = [
            "Gennaio",
            "Febbraio",
            "Marzo",
            "Aprile",
            "Maggio",
            "Giugno",
            "Luglio",
            "Agosto",
            "Settembre",
            "Ottobre",
            "Novembre",
            "Dicembre"
          ];

        function controllaData(s){
            return mesi.some(m => s.toLowerCase().includes(m.toLowerCase()))
        }

        function trasformaData(s){
            const giorno = parseInt(s.split(" ")[0]);
            const mese = mesi.findIndex(m => s.toLowerCase().includes(m.toLowerCase()))
            const anno = s.split(" ")[2] ? parseInt(s.split(" ")[2]) : new Date().getFullYear();
            return dataInSQL(new Date(anno, mese, giorno));
        }

        let stringa = e ? $(e.target).val().trim().toLowerCase() : val;
        let nomeVar = "stringa"
        if(stringa == "*"){
            stringa = "*";
        }
        else if(chkNumero(stringa)){
            nomeVar = "id";
            stringa = parseInt(stringa);
        }else if(controllaData(stringa)){
            nomeVar = "data";
            stringa = trasformaData(stringa);

        }

        inviaRichiesta("GET", "src/server/cercaCom.php", {[nomeVar] : stringa}).done((data) => {
            const cont = $("#cntComunicazioni")
            $("#cntComunicazioni .comunicazione").remove();
            for(const com of data){
                const div = $("<div>").addClass("comunicazione flex-row")
                .on("click", () => {modificaCom(com)}).appendTo(cont)
                let dataC = new Date(com["data"]);
                dataC = dataC.toLocaleDateString("it-IT", {day : "numeric", month : "long", year : "numeric"})
                $("<ion-icon>").attr("name", "pencil").css({order: 2}).appendTo(div)
                $("<span>•</span>").css({order: 3}).appendTo(div)
                $("<span>").text(dataC).appendTo(div).css({fontWeight : "500", fontSize : "1.1rem", order: 4})
                $("<span>•</span>").css({order: 5}).appendTo(div)
                $("<span>").text(com["titolo"]).css({order: 6}).addClass("titoloGrigio").appendTo(div)
            }
            const alt = cont.height();
            cont.parent().css({height : alt})
        })
    }

    function modificaCom(com){
        const html = 
        <div className="flex-col">
            <div className="flex-col">
                <span className="label>">Classi</span>
                <SelectClassiMultipla f={() => {}} fOpz={() => {}} idselect="selectMmodCom" selezionate={com["classi"]}/>
            </div>
            <div className="flex-col">
                <span className="label>">Data</span>
                <input type="date" id="dataModCom" defaultValue={com["data"]} className='swal-input'/>
            </div>
            <div className="flex-col">
                <span className="label>">Titolo</span>
                <input type="text" id="titoloModCom" defaultValue={com["titolo"]} className='swal-input'/>
            </div>
            <div className="flex-col">
                <span className="label>">Testo</span>
                <textarea id="txtModCom" className='swal-input' placeholder='Inserisci il testo...' defaultValue={com["testo"]}></textarea>
            </div>
            <button className="flex-col swalAnnulla swal2-cancel btnCancellaCom">
                <ion-icon name="trash"></ion-icon>
            </button>
            <div className="errore">Sono stati inseriti dati non validi</div>
        </div>

        Swal.fire({
            title: 'Modifica Comunicazione',
            html: ' ',
            confirmButtonText: '',
            showCancelButton: true,
            cancelButtonText: '',
            customClass: {
                popup: 'swal',
                title: 'swal-titolo',
                htmlContainer: 'swal-titolo',
                input: 'swal-input',
                actions: 'wrapperBottoneSwal',
                confirmButton: 'swalConferma',
                cancelButton: 'swalAnnulla',
            },
            willOpen: () => {
                const root = createRoot(Swal.getHtmlContainer());
                root.render(<>{html}</>)
            },
            didOpen: () => {
                $(".btnCancellaCom").on("click", () => {
                    Swal.fire({
                        title: 'Sei Sicuro?',
                        text: "Non potrai tornare indietro!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: '',
                        cancelButtonText: '',
                        customClass: {
                            popup: 'swal',
                            title: 'swal-titolo',
                            htmlContainer: 'swal-titolo',
                            input: 'swal-input',
                            actions: 'wrapperBottoneSwal',
                            confirmButton: 'swalConferma',
                            cancelButton: 'swalAnnulla'
                        },
                    }).then((result) => {
                        if(!result.isConfirmed) return;
                        inviaRichiesta("POST", "src/server/eliminaCom.php", {id : com["id"]})
                        .done((data) => {
                            if(data)
                            {
                                cercaCircolare(null, $("#txtCercaCir").val())
                                mostraConferma("Circolare Eliminata")
                            }
                            else mostraErrore("Errore Eliminazione Circolare");
                        })
                        .fail(errore)
                    })
                })
            },
            preConfirm: () => {
                const valido = $("#titoloModCom").val().trim() != "" && 
                               $("#txtModCom").val().trim() != "" && 
                               $("#selectMmodCom .testoSelect").text().trim() != "Seleziona...";
                if(!valido)
                    $(".errore").animate({opacity: 1}, 100, () => {setTimeout(() => {$(".errore").css("opacity", "")}, 1000)});
                return valido;
            }
        }).then((result) => {
            if(!result.isConfirmed) return;
            const data = $("#dataModCom").val()
            const titolo = $("#titoloModCom").val()
            const testo =  $("#txtModCom").val()
            let classi = $("#selectMmodCom .testoSelect").text().trim();
            classi = classi == "Tutte" ? "*" : classi;
            inviaRichiesta("POST", "src/server/modificaCom.php", {id : com["id"], data, titolo, testo, classi})
            .done((data) => {
                if(data)
                {
                    cercaCircolare(null, $("#txtCercaCir").val())
                    mostraConferma("Circolare Modificata")
                }
                else mostraErrore("Errore Modifica Circolare");
            })
            .fail(errore)
        })
    }

    return (
    <div className="pagina nascosto flex-col" id="comunicazioniDocente" titolo="Comunicazioni">
        <div className="flex-col colonnaNG">
                <div className="flex-row" style={{cursor : "pointer", alignItems: "center"}} onClick={(e) => {toggle(e)}} id="intNuovaCom">
                    <h3 className="titoloGrigio">Nuova Comunicazione</h3>
                    <button style={{display : "grid", placeItems : "center"}}>
                        <ion-icon name="chevron-down"></ion-icon>
                    </button>
                </div>
                <div className="collassaTabella">
                    <div className="flex-col" style={{gap : "1rem"}}>
                        <div className="flex-col">
                            <div className="label">Classi</div>
                            <SelectClassiMultipla f={() => {}} fOpz={() => {}} idselect="selectMClassi"/>
                        </div>
                        <div className="flex-col">
                            <div className="label">Titolo</div>
                            <input type="text" placeholder="Titolo" id="titoloNuovaComunicazione" className="swal-input"/>
                        </div>
                        <div className="flex-col">
                            <div className="label">Testo</div>
                            <textarea id="txtNuovaCircolare" className="swal-input"></textarea>
                        </div>
                        <button className="btnAggiungiArg flex-col" onClick={() => {aggiungiCircolare()}}>
                            <ion-icon name="checkmark"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-col colonnaG">
                <div className="flex-row" style={{cursor : "pointer", alignItems: "center"}}  onClick={(e) => {toggle(e)}}>
                    <h3 className="titoloGrigio">Cerca</h3>
                    <button style={{display : "grid", placeItems : "center"}}>
                        <ion-icon name="chevron-down"></ion-icon>
                    </button>
                </div>
                <div className="collassaTabella">
                    <div className="flex-col" id="cntComunicazioni">
                        <div className="label" style={{margin : ".5rem .25rem .25rem 0"}}>Cerca per numero circolare, titolo, data o '*'</div>
                        <input type="text" id="txtCercaCir" className="swal-input"
                               placeholder="Scrivi qualcosa..."
                               onKeyUp={(e) => {cercaCircolare(e)}}/>
                    </div>
                </div>
            </div>
    </div>)
}

let rootStudenti = null;

async function cambiaClasse(e, fOpz){
    let bd = $(e.target).closest(".selectOptions").parent().parent()
    const cont = bd.siblings().eq(0).find(".selectOptions")
    cont.empty();
    bd.addClass("selectCollassato")
    setTimeout(() => {bd.on("click", () => {
        bd.removeClass("selectCollassato")
        bd.off("click")
        bd.find(".testoSelect").text("Seleziona...").attr("valore", "")
        bd.find(".selectBody").trigger("click")
        cont.parent().parent().addClass("nascosto")
        resetStudente(bd.siblings().eq(0), false)
        resetAssenze($("#docenteValutazioni > div.flex-row > div:nth-child(2)"), false)
        if(rootStudenti)rootStudenti.unmount();
    })}, 10)
    bd.siblings(".nascosto").removeClass("nascosto").show()
    const studenti = await inviaRichiesta("GET", "src/server/studenti.php", {classe : bd.find(".testoSelect").text()})
    rootStudenti = createRoot(cont[0]);
    const opzioni = []
    for(const [i, studente] of Object.entries(studenti)){
        opzioni.push(
            <Opzione 
                info={{valore : studente["matricola"], testo : `${studente["cognome"]} ${studente["nome"]}`, f : fOpz}}
                key={i}
                selezionata={false}
            />
        )
    }
    rootStudenti.render(<>{opzioni}</>);
}

function resetStudente(bd, trigger = true){
    bd.removeClass("selectCollassato")
    bd.off("click")
    bd.find(".testoSelect").text("Seleziona...").attr("valore", "")
    $("#contTabellaVoti").animate({maxHeight : "0px"}, 500, () => {$("#tabellaVoti").empty()})
    if(trigger)bd.find(".selectBody").trigger("click")
}

function cambiaStudente(e){
    let bd = $(e.target).closest(".selectOptions").parent().parent()
    bd.addClass("selectCollassato")
    $("#contTabellaVoti").animate({maxHeight : "1000vh"}, 1500)
    setTimeout(() => {bd.on("click", () => {resetStudente(bd)})}, 10)
    const matricola = bd.find(".testoSelect").attr("valore");
    riempiTabellaVoti(matricola);
}

async function riempiTabellaVoti(matricola){
    const tb = $("#tabellaVoti");
    tb.empty();
    const richieste = [inviaRichiesta("GET", "src/server/voti.php", { matricola, id : true }), inviaRichiesta("GET", "src/server/materie.php")];
    let [voti, materie] = await Promise.all(richieste).catch(errore);
    
    for(const [i, materia] of Object.entries(materie)){
        const votiMateria = voti.filter((voto) => voto["materia"] == materia["id"]);
        const tr = $("<div>").addClass("flex-row").appendTo(tb);
        $("<div>").addClass("cellaTitolo").text(materia["materia"]).appendTo(tr);
        for(const [j, voto] of Object.entries(votiMateria)){
            const perCento = (voto["voto"] - (Math.max(0, 6.1 - voto["voto"]))) * 10;
            const coloreAccento = ottieniColore("#ff0000", "#00ff00", perCento);
            $("<div>").addClass("votoTabella flex-col")
            .text(voto["voto"]).appendTo(tr).css({backgroundColor : coloreAccento})
            .on("click", () => {cambiaVoto(voto)})
        }
        if(votiMateria.length == 0){
            $("<div>").addClass("noVotoTabella").text("Nessun Voto Disponibile").appendTo(tr);
        }
        $("<button>").addClass("btnAggiungiVoto").text("+").appendTo(tr)
        .on("click", () => {aggiungiVoto(materia, matricola)})
    }
}

function aggiungiVoto(materia, matricola){
    const giorno = dataInSQL(new Date());
    const html = `
        <div class="flex-col">
            <div class="flex-col">
                <span class="label>">Data</span>
                <input type="date" id="dataNuovoVoto" value="${giorno}" class='swal-input'">
            </div>
            <div class="flex-col">
                <span class="label>">Valore</span>
                <input type="number" id="numeroNuovoVoto" placeholder="Voto" min='0' max='10' step='0.5' class='swal-input'">
            </div>
        </div>`

    Swal.fire({
        title: `Nuovo Voto di ${materia["materia"]}`,
        html: html,
        confirmButtonText: '',
        showCancelButton: true,
        cancelButtonText: '',
        customClass: {
            popup: 'swal',
            title: 'swal-titolo',
            htmlContainer: 'swal-titolo',
            input: 'swal-input',
            actions: 'wrapperBottoneSwal',
            confirmButton: 'swalConferma',
            cancelButton: 'swalAnnulla'

        },
        willOpen: () => {
            const wrapper = $("#numeroNuovoVoto").closest(".swal2-html-container").siblings(".wrapperBottoneSwal").eq(0)
            wrapper.find(".swalConferma").prop("disabled", true)
            $("#numeroNuovoVoto").on("input", () => {
                wrapper.find(".swalConferma").prop("disabled", !$("#numeroNuovoVoto").val())
            })
        },
    }).then((result) => {
        if(!result.isConfirmed) return;
        const dataVoto = $("#dataNuovoVoto").val()
        const numero = $("#numeroNuovoVoto").val()
        const idMateria = materia["id"];
        inviaRichiesta("POST", "src/server/aggiungiVoto.php", {matricola, dataVoto, idMateria, numero})
        .done((data) => {
            if(data)
            {
                const matricola = $("#selectStudenti").find(".testoSelect").attr("valore")
                riempiTabellaVoti(matricola)
                mostraConferma("Voto Aggiunto")
            }
            else mostraErrore("Errore");
        })
        .fail(() => {mostraErrore("Errore")});
    })
}

function cambiaVoto(voto){
    const html = `
        <div class="flex-col">
            <div class="flex-col">
                <span class="label>">Data</span>
                <input type="date" id="dataVoto" value="${voto["data"]}" class='swal-input'">
            </div>
            <div class="flex-col">
                <span class="label>">Valore</span>
                <input type="number" id="numeroVoto" value="${voto["voto"]}" min='0' max='10' step='0.5' class='swal-input'">
            </div>
            <button class="flex-col swalAnnulla swal2-cancel btnCancella">
                <ion-icon name="trash"></ion-icon>
            </button>
        </div>`

    Swal.fire({
        title: 'Modifica Voto',
        html: html,
        confirmButtonText: '',
        showCancelButton: true,
        cancelButtonText: '',
        customClass: {
            popup: 'swal',
            title: 'swal-titolo',
            htmlContainer: 'swal-titolo',
            input: 'swal-input',
            actions: 'wrapperBottoneSwal',
            confirmButton: 'swalConferma',
            cancelButton: 'swalAnnulla',
        },
        willOpen: () => {
            $(".btnCancella").on("click", () => {
                Swal.fire({
                    title: 'Sei Sicuro?',
                    text: "Non potrai tornare indietro!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '',
                    cancelButtonText: '',
                    customClass: {
                        popup: 'swal',
                        title: 'swal-titolo',
                        htmlContainer: 'swal-titolo',
                        input: 'swal-input',
                        actions: 'wrapperBottoneSwal',
                        confirmButton: 'swalConferma',
                        cancelButton: 'swalAnnulla'
                    },
                }).then((result) => {
                    if(!result.isConfirmed) return;
                    inviaRichiesta("POST", "src/server/eliminaVoto.php", {id : voto["id"]})
                    .done((data) => {
                        if(data)
                        {
                            const matricola = $("#selectStudenti").find(".testoSelect").attr("valore")
                            riempiTabellaVoti(matricola)
                            mostraConferma("Voto Eliminato")
                        }
                        else mostraErrore("Errore Eliminazione Voto");
                    })
                    .fail(errore)
                })
            })
        }
    }).then((result) => {
        if(!result.isConfirmed) return;
        const data = $("#dataVoto").val()
        const numero = $("#numeroVoto").val()
        inviaRichiesta("POST", "src/server/modificaVoto.php", {id : voto["id"], data, numero})
        .done((data) => {
            if(data)
            {
                const matricola = $("#selectStudenti").find(".testoSelect").attr("valore")
                riempiTabellaVoti(matricola)
                mostraConferma("Modifica Effettuata")
            }
            else mostraErrore("Errore Modifica Voto");
        })
        .fail(errore)
    })
}

function mostraErrore(titolo){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
  
    Toast.fire({
        icon: 'error',
        title: titolo
    })
}

function mostraConferma(titolo){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        customClass: {
            icon: 'swalConferma',
        },
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
  
    Toast.fire({
        icon: 'success',
        title: titolo
    })
}

const SelectClassi = (props) => {
    const caricaSelect = async () => {
        const cont = $('#cntClassiSelect')[0]
        if(!cont) return;
        $(cont).attr("id", "")
        const classi = await inviaRichiesta("GET", "src/server/classi.php")
        const root = createRoot(cont);
        let opzioni = []
        for(const [i, classe] of Object.entries(classi)){
            opzioni.push(
                <Opzione info={{valore : classe["id"], testo : classe["nome"], f : (e) =>{props.f(e, props.fOpz)}}}
                         key={i} 
                         selezionata={false}/>
            )
        }
        root.render(<>{opzioni}</>);
    }
    useEffect(() => {caricaSelect()}, [])
    return (
        <div className="pseudoSelect flex-col" id="selectClassi">
            <div className="selectDesc" onClick={(e) => {espandiSelect($(e.target))}}>&nbsp;Classe</div>
            <div className="selectBody flex-row" tabIndex="0" 
            onClick={(e) => {espandiSelect($(e.target))}}
            onBlur={(e) => {chiudiElemento($(e.target), null)}}>
                <span className="testoSelect flex-col">Seleziona...</span>
                <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <div className="selectOptions flex-col" id="cntClassiSelect" style={{maxHeight: "25rem"}}>   
            </div>
        </div>
    )
}

const SelectClassiMultipla = (props) => {
    let vettSelezionate = []
    let testo = "Tutte";
    if(props.selezionate){
        vettSelezionate = props.selezionate.split(", ")
        testo = props.selezionate != "*" ? props.selezionate : "Tutte";
    }

    const caricaSelect = async () => {
        const cont = $('#cntClassiSelect')[0]
        if(!cont) return;
        $(cont).attr("id", "")
        const classi = await inviaRichiesta("GET", "src/server/classi.php")
        classi.unshift({id : -1, nome : "Tutte"})
        const root = createRoot(cont);
        let opzioni = []
        for(const [i, classe] of Object.entries(classi)){
            let selezionata = true;
            if(props.selezionate && props.selezionate != "*")
            {
                selezionata = vettSelezionate.includes(classe["nome"])
            }
            opzioni.push(
                <Opzione info={{valore : classe["id"], testo : classe["nome"], f : (e) =>{props.f(e, props.fOpz)}}}
                         key={i} 
                         selezionata={selezionata}
                         multipla={true}
                         />
            )
        }
        root.render(<>{opzioni}</>);
    }
    useEffect(() => {caricaSelect()}, [])
    return (
        <div className="pseudoSelect flex-col" selezionate={"Tutte"} id={props.idselect}>
            <div className="selectDesc" onClick={(e) => {espandiSelect($(e.target)); gestisciBlur($(e.target), $("#" + props.idselect))}}>&nbsp;Classe</div>
            <div className="selectBody flex-row" tabIndex="0" 
            onClick={(e) => {espandiSelect($(e.target));gestisciBlur($(e.target), $("#" + props.idselect))}}>
                <span className="testoSelect flex-col">{testo}</span>
                <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <div className="selectOptions flex-col" id="cntClassiSelect" style={{maxHeight: "25rem"}}>   
            </div>
        </div>
    )
}

const SelectClassiArg = () => {
    const caricaSelect = async () => {
        const cont = $('#cntClassiSelectArg')[0]
        if(!cont) return;
        $(cont).attr("id", "")
        const classi = await inviaRichiesta("GET", "src/server/classi.php")
        const root = createRoot(cont);
        let opzioni = []
        for(const [i, classe] of Object.entries(classi)){
            opzioni.push(
                <Opzione info={{valore : classe["id"], testo : classe["nome"], f : mostraArgomenti}}
                         key={i} 
                         selezionata={false}/>
            )
        }
        root.render(<>{opzioni}</>);
    }
    useEffect(() => {caricaSelect()}, [])
    return (
        <div className="pseudoSelect flex-col" id="selectClassiArg">
            <div className="selectDesc" onClick={(e) => {espandiSelect($(e.target))}}>&nbsp;Classe</div>
            <div className="selectBody flex-row" tabIndex="0" 
            onClick={(e) => {espandiSelect($(e.target))}}
            onBlur={(e) => {chiudiElemento($(e.target), null)}}>
                <span className="testoSelect flex-col">Seleziona...</span>
                <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <div className="selectOptions flex-col" id="cntClassiSelectArg" style={{maxHeight: "25rem"}}>   
            </div>
        </div>
    )
}

const SelectStudenti = () => {
    return (
        <div className="pseudoSelect flex-col" id="selectStudenti">
            <div className="selectDesc" onClick={(e) => {espandiSelect($(e.target))}}>&nbsp;Classe</div>
            <div className="selectBody flex-row" tabIndex="0" 
            onClick={(e) => {espandiSelect($(e.target))}}
            onBlur={(e) => {chiudiElemento($(e.target), null)}}>
                <span className="testoSelect flex-col">Seleziona...</span>
                <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <div className="selectOptions flex-col" id="cntStudentiSelect" style={{maxHeight: "25rem"}}>   
            </div>
        </div>
    )
}

const Opzione = (props) => {
    let classe = props.selezionata ? "selezionata " : ""
    classe += props.disab ? "disabilitata " : "";
    classe += "option"
    let onclick = props.disab ? () =>{} : (e) => {chiudiElemento($(e.target), null); props.info.f(e)};
    if(props.multipla) onclick = (e) => {props.info.f(e, props.info.fOpz), selezionaMultipla($(e.target))}
    return (
        <div className={classe} onClick={onclick} valore={props.info.valore}>
            <span>{props.info.testo}</span>
            <ion-icon name="checkmark-outline"></ion-icon>
        </div>
    )
}

var rootTabella = null;

function riempiTabellaAssenze(classe){
    if(rootTabella) rootTabella.unmount();
    rootTabella = createRoot($('#tabellaAssenze')[0])
    const p = [inviaRichiesta("GET", "src/server/studenti.php", { classe }),
               inviaRichiesta("GET", "src/server/assenzeClasse.php", { classe })]
    Promise.all(p).then((ris) => {
        const studenti = ris[0].map((s) => {
            const assenzaAssociate = ris[1].filter((a) => {return a["matricola"] == s["matricola"]})
            s["assenze"] = assenzaAssociate;
            s["nome"] = s["nome"].charAt(0).toUpperCase() + s["nome"].slice(1);
            s["cognome"] = s["cognome"].charAt(0).toUpperCase() + s["cognome"].slice(1);
            return s;
        })
        const thead = <thead>
                            <tr>
                                <th></th>
                                <th>Studente</th>
                                <th>Assenze</th>
                            </tr>
                      </thead>
        let arrayStudenti = []
        let oggi = new Date();
        oggi = dataInSQL(oggi);
        for(const [i, studente] of Object.entries(studenti)){
            const assenzeG = studente["assenze"].filter((a) => {return a["giustificato"] == "1"});
            const assenzeNG = studente["assenze"].filter((a) => {return a["giustificato"] == "0"});
            const assente = studente["assenze"].length > 0;
            let assenteOggi = false;
            if(assenzeNG.length > 0){
                assenteOggi = assenzeNG[0]["data"] == oggi;
            }
            if(assenzeG.length > 0){
                assenteOggi |= assenzeG[0]["data"] == oggi;
            }
            arrayStudenti.push(
                <tr key={i} matricola={studente["matricola"]}>
                    <td>
                        <Checkbox f={trasformaAssenza} matricola={studente["matricola"]} checked={assenteOggi}/>
                    </td>
                    <td>
                        <div className="cellaTitolo">{`${studente["cognome"]} ${studente["nome"]}`}</div>
                    </td>
                    <td>
                        <div className={"hlDocAssenza flex-row " + (assenzeNG.length > 0 ? "haAssenze" : "")} 
                             valore={assente ? assenzeNG.length + assenzeG.length : "0"} 
                             ng={assenzeNG.length}
                             onClick={() => {mostraAssenzeStudente(studente)}}>
                            {assente ? assenzeNG.length + assenzeG.length : 0}
                        </div>
                    </td>
                </tr>
            )
        }
        let tabella = <table>{thead}<tbody>{arrayStudenti}</tbody></table>
        if(studenti.length == 0){
            tabella = <h2 className="titoloGrigio" style={{padding: "1rem"}}>Nessuno Studente</h2>
        }
        rootTabella.render(<>{tabella}</>)
    })
}

function assenzeStudente(e){
    const select = $(e.target).closest(".pseudoSelect")
    const classe = select.find(".testoSelect").text()

    let bd = $(e.target).closest(".selectOptions").parent().parent()
    bd.addClass("selectCollassato")
    $("#contTabellaAssenze").animate({maxHeight : "1000vh"}, 1500)
    setTimeout(() => {bd.on("click", () => {resetAssenze(bd)})}, 10)
    riempiTabellaAssenze(classe)
}

export const Checkbox = (props) => {
    const refCont = useRef(null);
    let onload = true;
    function check(forza, e){
        const cont = $(refCont.current);
        const checked = cont.attr("checked");

        if(checked && !forza)
        {
            cont.children().css("transform" , "scale(0)");
        }else cont.children().css("transform" , "scale(1)");

        cont.attr("checked" , !checked);
        props.f(!checked, onload, e);
    }

    useEffect(() => {
        if(props.checked)
            $(refCont.current).trigger("click");
        onload = false;
    }, )

    return(
        <div style={stileCheckbox.cont} className='flex-row chk' ref={refCont} onClick={(e) => {check(false, e)}}>
            <div style={stileCheckbox.pallino}></div>
        </div>
    )
}

function trasformaAssenza(chk, onload, e){
    const cont = $(e.target).closest("tr")
    $(e.target).closest(".chk").css("filter", `hue-rotate(${chk ? 126 : 0}deg) saturate(${chk ? 2 : 1})`)
    cont.toggleClass("assente")
    let val = cont.find(".hlDocAssenza").attr("valore")
    if(!onload){
        val = parseInt(val) + (chk ? 1 : -1);
        cont.find(".hlDocAssenza").attr("valore", val).text(val)
    }
    if(chk){
        cont.find(".hlDocAssenza").addClass("haAssenze")
        if(onload) return;
        let oggi = new Date();
        oggi = dataInSQL(oggi);
        const matricola = cont.attr("matricola")
        inviaRichiesta("POST", "src/server/aggiungiAssenza.php", { matricola, data : oggi, giustificato : 0}).done((data) => {
            if(data["errore"])
            {
                mostraErrore(data["errore"]);
                return;
            }
        })
    }else{
        if(val == 0 || cont.find(".hlDocAssenza").attr("ng") == 0) cont.find(".hlDocAssenza").removeClass("haAssenze")
        if(onload) return;
        const matricola = cont.attr("matricola")
        const data = dataInSQL(new Date());
        inviaRichiesta("POST", "src/server/rimuoviUltimaAssenza.php", { matricola, data })
    }
}

var rootAssenzaStudente = null;

function chiudiPannelloAssenza(){
    riempiTabellaAssenze($("#docenteAssenze #selectClassi .testoSelect").text())
    const tabella = $("#tabellaAssenze")
    const cont = $("#assenzeStudente")
    tabella.animate({height : "37.3rem"}, 500)
    cont.css({overflow : "hidden"}).animate({height : "0"}, 500)
}

async function mostraAssenzeStudente(studente, eseguiAnimazione = true){
    const tabella = $("#tabellaAssenze")
    const cont = $("#assenzeStudente")
    if(rootAssenzaStudente != null) rootAssenzaStudente.unmount();
    rootAssenzaStudente = createRoot(cont.children()[0]);
    if(eseguiAnimazione){
        tabella.animate({height : "0"}, 500)
        cont.animate({height : "37.3rem"}, 500)
    }
    
    let vettG = [], vettNG = [];

    studente["assenze"] = await inviaRichiesta("GET", "src/server/assenze.php", {matricola : studente["matricola"]})

    for(const [i, assenza] of Object.entries(studente["assenze"])){
        let data = new Date(assenza["data"])
        data = data.toLocaleDateString("it-IT", {day : "2-digit", month : "long", year : "numeric"})
        const a = <tr key={i} onClick={() => {modificaAssenza(assenza, studente)}}>
                    <td>{data}&nbsp;&nbsp;•&nbsp;&nbsp;<ion-icon name="pencil"></ion-icon></td>
                  </tr>
        if(assenza["giustificato"] == "1"){
            vettG.push(a)
        }else{
            vettNG.push(a)
        }
    }
    rootAssenzaStudente.render(<>
        <div className="flex-row">
            <h2 className="titoloGrigio" style={{fontSize : "2rem"}}>{studente["cognome"] + " " + studente["nome"]}</h2>
            <button id="btnAssenza" onClick={chiudiPannelloAssenza}>
                <ion-icon name="chevron-down"></ion-icon>
            </button>
        </div>
        <div className="flex-col colonnaNG">
            <div className="flex-row" onClick={(e) => {toggleTabella(e)}}  style={{cursor : "pointer"}}>
                <h3 className="titoloGrigio">Non Giustificate</h3>
                <button id="btnMostraNG">
                    <ion-icon name="chevron-down"></ion-icon>
                </button>
            </div>
            <div className="collassaTabella">
                <table>
                    <tbody>
                        {vettNG}
                        {<tr><td>
                            <button className="btnAggiungiAssenza flex-row" onClick={() => {aggiungiAssenza(studente, false)}}><ion-icon name="add"></ion-icon></button>
                        </td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="flex-col colonnaG">
            <div className="flex-row" onClick={(e) => {toggleTabella(e)}} style={{cursor : "pointer"}}>
                <h3 className="titoloGrigio">Giustificate</h3>
                <button>
                    <ion-icon name="chevron-down"></ion-icon>
                </button>
            </div>
            <div className="collassaTabella">
            <table>
                    <tbody>
                        {vettG}
                        {<tr><td>
                            <button className="btnAggiungiAssenza flex-row" onClick={() => {aggiungiAssenza(studente, true)}}><ion-icon name="add"></ion-icon></button>
                        </td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    </>)

    setTimeout(() => {$("#btnMostraNG").trigger("click")}, 500)
}

function toggleTabella(e){
    const cont  = $(e.target).closest(".flex-col");
    const btn = cont.find("button");
    const tabella = cont.find(".collassaTabella");
    tabella.toggleClass("aperta");
    if(tabella.hasClass("aperta")){
        const altTabella = tabella.children().height();
        tabella.css("height", altTabella + "px");
        setTimeout(() => {tabella.css("overflow", "visible")}, 500)
        btn.find("ion-icon").css("transform", "rotate(180deg)");
    }else{

        tabella.css({overflow : "hidden", height : 0});
        btn.find("ion-icon").css("transform", "rotate(0deg)");
    }
}

function modificaAssenza(assenza, studente){
    const html = 
        <div className="flex-col">
            <div className="flex-col">
                <span className="label>">Data</span>
                <input type="date" id="dataModAss" defaultValue={assenza["data"]} className='swal-input'/>
            </div>
            <div className="flex-row" style={{marginInline : "auto"}}>
                <p className="label">Giustificata: </p>&nbsp;&nbsp;
                <Checkbox checked={assenza["giustificato"] == "1"} f={() => {}}/>
            </div>
            <button className="flex-col swalAnnulla swal2-cancel btnCancella">
                <ion-icon name="trash"></ion-icon>
            </button>
            <div className="errore">Sono stati inseriti dati non validi</div>
        </div>

    Swal.fire({
        title: 'Modifica Assenza',
        confirmButtonText: '',
        showCancelButton: true,
        cancelButtonText: '',
        html: '&nbsp;',
        customClass: {
            popup: 'swal',
            title: 'swal-titolo',
            htmlContainer: 'swal-titolo',
            input: 'swal-input',
            actions: 'wrapperBottoneSwal',
            confirmButton: 'swalConferma',
            cancelButton: 'swalAnnulla',
        },
        willOpen: () => {
            let root = createRoot($(".swal2-html-container")[0])
            root.render(<>{html}</>)
        },
        didOpen: () => {
            $(".btnCancella").on("click", () => {
                Swal.fire({
                    title: 'Sei Sicuro?',
                    text: "Non potrai tornare indietro!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '',
                    cancelButtonText: '',
                    customClass: {
                        popup: 'swal',
                        title: 'swal-titolo',
                        htmlContainer: 'swal-titolo',
                        input: 'swal-input',
                        actions: 'wrapperBottoneSwal',
                        confirmButton: 'swalConferma',
                        cancelButton: 'swalAnnulla'
                    },
                }).then((result) => {
                    if(!result.isConfirmed) return;
                    inviaRichiesta("POST", "src/server/eliminaAssenza.php", {id : assenza["id"]})
                    .done((data) => {
                        if(data)
                        {
                            mostraAssenzeStudente(studente, false)
                            mostraConferma("Assenza Eliminata")
                        }
                        else mostraErrore("Errore Eliminazione Assenza");
                    })
                    .fail(errore)
                })
            })
        }
    }).then((result) => {
        if(!result.isConfirmed) return;
        let dataA = $("#dataModAss").val();
        dataA = new Date(dataA);
        dataA = dataInSQL(dataA);
        const id = assenza["id"];
        let giustificato = $("#dataModAss").parent().next().find(".chk").attr("checked");
        giustificato = giustificato ? 1 : 0;
        inviaRichiesta("POST", "src/server/modificaAssenza.php", {id, data : dataA, giustificato}).done((data) => {
            if(data)
            {
                mostraAssenzeStudente(studente, false)
                mostraConferma("Assenza Modificata")
            }
            else mostraErrore("Errore Modifica Assenza");
        })
    })
}

function aggiungiAssenza(studente, checked){
    let oggi = new Date();
    oggi = dataInSQL(oggi);
    const html = 
    <div className="flex-col">
        <h2 className="titoloGrigio">{studente["cognome"] + " " + studente["nome"]}</h2>
        <div className="flex-col">
            <span className="label>">Data</span>
            <input type="date" id="dataAggAss" defaultValue={oggi} className='swal-input'/>
        </div>
        <div className="flex-row" style={{marginInline : "auto"}}>
            <p className="label">Giustificata: </p>&nbsp;&nbsp;
            <Checkbox checked={checked} f={() => {}}/>
        </div>
    </div>

    Swal.fire({
        title: 'Aggiungi Assenza',
        confirmButtonText: '',
        showCancelButton: true,
        cancelButtonText: '',
        html: '&nbsp;',
        customClass: {
            popup: 'swal',
            title: 'swal-titolo',
            htmlContainer: 'swal-titolo',
            input: 'swal-input',
            actions: 'wrapperBottoneSwal',
            confirmButton: 'swalConferma',
            cancelButton: 'swalAnnulla',
        },
        willOpen: () => {
            let root = createRoot($(".swal2-html-container")[0])
            root.render(<>{html}</>)
        }
    }).then((result) => {
        if(!result.isConfirmed) return;
        let dataA = $("#dataAggAss").val();
        dataA = new Date(dataA);
        dataA = dataInSQL(dataA);
        const matricola = studente["matricola"];
        let giustificato = $("#dataAggAss").parent().next().find(".chk").attr("checked");
        giustificato = giustificato ? 1 : 0;
        inviaRichiesta("POST", "src/server/aggiungiAssenza.php", {matricola, data : dataA, giustificato}).done((data) => {
            if(data["errore"])
            {
                mostraErrore(data["errore"]);
                return;
            }
            if(data)
            {
                mostraAssenzeStudente(studente, false)
                mostraConferma("Assenza Aggiunta")
            }
            else mostraErrore("Errore Modifica Assenza");
        })
    })
}