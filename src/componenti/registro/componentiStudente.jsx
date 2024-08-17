import { React,  useRef, useEffect } from 'react'

import $, { get } from 'jquery'

import { StileOpzioni, stileCompito, StileContComp, stileVoto, stileProgramma, stileCalendario, stileGrafico } from './stile'

import { StileComunicazione} from './stile'

import { hexToHsl, hslToHex, ottieniColore} from "../lib_colori";

import { toggleMenu } from '../../js/registro';

import Swal from 'sweetalert2';
import { Chart } from "chart.js/auto";
import { configurazioneGrafico } from './stile';

import { inviaRichiesta, errore } from '../../server/libreria';
import {espandiSelect, chiudiElemento} from '../select/select';
import '../select/select.css'

export const Opzioni = (props) => {
    const prof = props.professore;
    const cella = useRef(null)
    const cont = useRef(null)

    function spostaCella(e){
        let opzione = $(e.target).closest(".opzione")
        let index = $(".opzione").index(opzione)

        $(".opzione").removeClass("abilitato")
        $(".opzione").eq(index).addClass("abilitato")

        $(cella.current).css("top", `${4 * index}rem`)
        $(cont.current).attr("selezionato", index);

        applicaEffetto(null, index)
        cambiaPagina(index)
    }

    function cambiaPagina(index){
        const pagine = $(".pagina")
        const pagina = pagine.eq(index)
        if(!pagina.hasClass("nascosto")) return;
        pagine.addClass("nascosto")
        pagina.removeClass("nascosto")
        $("#contTitolo h2").text(pagina.attr("titolo"))
        toggleMenu(true)
        if(prof && index == 4 && !($("#intNuovaCom").next().hasClass("aperta"))){
            $("#intNuovaCom").trigger("click")
        }
    }

    function applicaEffetto(e, num){
        let val = e ? $(".opzione").index(e) : num
        if($(cont.current).attr("selezionato") == val)
            $(cella.current).css("filter", "brightness(1.1) drop-shadow(0 0 0.5rem #6c8cffb1)")    
    }

    useEffect(() => {
        $(".opzione").on("mouseover", (e) => {applicaEffetto(e.target)}).on("mouseleave", () => {
            $(cella.current).css("filter", "none")
        })
    }, [])

    return(
        <div id="contOpzioni" style={StileOpzioni.cont} ref={cont} selezionato="0">
            <div style={StileOpzioni.cella} ref={cella}></div>
            <div className="opzione abilitato" onClick={(e) => {spostaCella(e)}} style={StileOpzioni.opzione}>
                <ion-icon name="home"></ion-icon>
                <span>Home</span>
            </div>
            <div className="opzione" onClick={(e) => {spostaCella(e)}} style={StileOpzioni.opzione}>
                <ion-icon name="newspaper"></ion-icon>
                <span>Voti</span>
            </div>
            <div className="opzione" onClick={(e) => {spostaCella(e)}} style={StileOpzioni.opzione} id="opzioneArgomenti">
                <ion-icon name="library"></ion-icon>
                <span>Argomenti</span>
            </div>
            <div className="opzione" onClick={(e) => {spostaCella(e)}} style={StileOpzioni.opzione}>
                <ion-icon name="sad"></ion-icon>
                <span>Assenze</span>
            </div>
            <div className="opzione" onClick={(e) => {spostaCella(e)}} style={StileOpzioni.opzione}>
                <ion-icon name="information-circle"></ion-icon>
                <span>Comunicazioni</span>
            </div>
            {prof ? "" : <div className="opzione" onClick={(e) => {spostaCella(e)}} style={StileOpzioni.opzione}>
                <ion-icon name="pie-chart"></ion-icon>
                <span>Andamento</span>
            </div>}
            <div className="opzione" onClick={(e) => {spostaCella(e)}} style={StileOpzioni.opzione} id="opzioneAnagrafico"> 
                <ion-icon name="person-circle"></ion-icon>
                <span>Anagrafico</span>
            </div>
            <div className='flex-row user'>
                <div className='flex-col'>
                    <span>{props.info.nome + " " + props.info.cognome}</span>
                    <span className='label'>{props.info.classe}</span>
                </div>
                <img className="userImg" src="./src/assets/fp.webp" onClick={UserInfo}/>
            </div>
        </div>
    )
}

export function UserInfo(){
    $("#opzioneAnagrafico").trigger("click");
}

const colori = {
    Italiano: 280, 
    Matematica : 120, 
    Inglese : 0, 
    Storia: 250, 
    Scienze: 80, 
    Ginnastica : 80,
    Informatica : 330, 
    Religione : 20, 
    Sistemi : 300
};

export const Compito = (props) => {
    const materia = props.materia;
    const data = props.data;
    const colore = {filter : `hue-rotate(${props.colore}deg)`}

    function argomenti(){
        $("#opzioneArgomenti").trigger("click");
    }

    return (
    <div style={{...stileCompito.cont, ...colore}} className='compito'>
        <div style={stileCompito.main} className="flex-col">
            <h2 style={stileCompito.titolo}>{materia}</h2>
            <div className="flex-row" style={stileCompito.riga}>
                <div className="flex-col" style={stileCompito.colonna}>
                    <h5>Scadenza</h5>
                    <span style={stileCompito.testo}>{data}</span>
                </div>
            </div>
            <div style={stileCompito.bottone} onClick={argomenti}>Visualizza</div>
        </div>
    </div>);
}

export const ContCompiti = (props) => {
    return (
        <div className="flex-col" style={StileContComp.wrapper}>
            <h2 style={StileContComp.titolo}>In Programma Per Domani</h2>
            <div style={StileContComp.cont} className='flex-col contCompiti'>
            </div>
        </div>
    )
}

const Voto = (props) => {
    const materia = props.info.materia;
    let voto = props.info.voto;
    const data = props.info.data;
    const perCento = (voto - (Math.max(0, 6.1 - voto))) * 10;
    const coloreAccento = ottieniColore("#ff0000", "#00ff00", perCento);
    let coloreSfondo = hexToHsl(coloreAccento);
    coloreSfondo = hslToHex(coloreSfondo.h, coloreSfondo.s, coloreSfondo.l + 55);
    const stile = {
        backgroundColor: coloreSfondo,
        color: coloreAccento,
        border: `2px solid ${coloreAccento}`
    }

    const stileTesto = {}
    if(materia.length > 15)
    {
        stileTesto.fontSize = "1rem";
    }
    voto = voto == parseInt(voto) ? voto : 
            <span className="flex-row">
                {parseInt(voto)}
                <span style={stileVoto.mezzo}>&nbsp;½</span>
            </span>;
    return (<div className="flex-row"  style={stileVoto.cont}>
                <div className="numero flex-col" style={{...stileVoto.voto, ...stile}}>{voto}</div>
                <span  style={stileVoto.legenda} className="flex-col">
                    <div style={stileTesto}>{materia}</div>
                    <div style={stileVoto.mod}>{data}</div> 
                </span>
        </div>);
}

export const ContVoti = (props) => {
    return (
        <div className='flex-col' style={stileVoto.cont}>
            <h2 style={StileContComp.titolo}>Ultimi Voti</h2>
            <div className="flex-row contVoti">
            </div>
        </div>
    );
}

export const ContProgramma = (props) => {
    return (
        <div className="flex-col" style={stileProgramma.cont}>
            <h2 style={stileProgramma.titolo}>Compiti & Programma</h2>
            <Calendario/>
        </div>
    )
}

export const Calendario = () => {
    const now = new Date();
    const mese = now.toLocaleString('it-IT', { month: 'long' });
    const giorni = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const anno = now.getFullYear();
    const oggi = now.getDate();
    const inizioMese = new Date();
    inizioMese.setDate(1);
    const giornoSettimana = inizioMese.getDay();
    const nomi = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

    const stampaGiorni = (giorni) => {
        let giorniArray = [];
        for(let nome of nomi){
            let giorno = <span key={nome} style={stileCalendario.legenda} className="giorno flex-col nomiGiorni">{nome}</span>
            giorniArray.push(giorno);
        }
        for(let i = 0; i < giornoSettimana - 1; i++) {
            let giorno = <span key={i + "v"} style={stileCalendario.giorno} className="vuoto flex-col">V</span>
            giorniArray.push(giorno);
        }
        for(let i = 1; i < giorni + 1; i++) {
            let classi = `giorno  flex-col ${i === oggi ? "oggi" : ""}`
            let stile = i === oggi ? { ...stileCalendario.giorno, ...stileCalendario.oggi } : stileCalendario.giorno; 
            let giorno = <span className={classi} key={i} style={stile}>{i}</span>
            giorniArray.push(giorno);
        }
        return giorniArray;
    }

    return(
        <div style={stileProgramma.wrapper} className='flex-col calendario'>
            <h2 style={stileCalendario.titolo}>{mese} {anno}</h2>
            <div className="giorni" style={stileCalendario.giorni}>
                 {stampaGiorni(giorni)}
            </div>
        </div>
    )
}

export const HomeStudente = (props) => {
    return (
        <div id="divHome" className='flex-col pagina' titolo="Bentornato, Luca">
            <div className='flex-row' id="contCompitiProgramma">
                <ContCompiti/>
                <ContProgramma/>
            </div>
            <ContVoti/>
        </div>
    )
}

export const ComunicazioniStudente = (props) => {
    let classe = props.classe;
    classe = classe.split(" ");
    classe = classe[0] + " " + classe[1].slice(0, 3).toUpperCase();
    
    let root = null;
    useEffect(() => {
        if(root)return;
        root = createRoot($("#divComunicazioni")[0]);
        caricaComunicazioni()
    }, [])

    async function caricaComunicazioni() {
        const comunicazioni = await inviaRichiesta("GET", "src/server/comunicazioni.php", {classe});
        let arrComunicazioni = [];
        for(let [i, com] of Object.entries(comunicazioni)) {
            let dataC = new Date(com["data"]);
            dataC = dataC.toLocaleDateString("it-IT", {day : "numeric", month : "long", year : "numeric"})
            arrComunicazioni.push(
                <div className="flex-col comStudente" key={i} style={{alignItems : "flex-start"}}>
                    <h3 className="titoloGrigio">{com["titolo"]}</h3>
                    <div className="label">{dataC}</div>
                    <div style={{width : "100%", flexGrow : 1}} className='testoCom'>
                        {com["testo"]}
                    </div>
                </div>
            )
        }
        root.render(<>{arrComunicazioni}</>)
    }

    return (
        <div id="divComunicazioni" className='flex-col pagina nascosto' titolo="Comunicazioni">

        </div>
    )
}

let root;

const riempiArgomentiHome = (args, materie) => {
    if(args.length == 0) {
        root = root ? root : createRoot($(".contCompiti").get(0));
        root.render(<div className="flex-col compitoVuoto">
            <h3>Nessun compito per domani</h3>
        </div>)
        return;
    }
    const frazione = 360 / materie.length;
    let oggi = new Date();
    oggi.setDate(oggi.getDate() + 1);
    oggi = oggi.toLocaleString('it-IT', {weekday: 'long', day: 'numeric', month: 'long' });
    const compiti = []
    for(const [i, arg] of Object.entries(args)) {
        const materiaArgomento = materie.find((m) => m["id"] == arg["materia"])
        const id = materiaArgomento["id"]
        const index = materie.findIndex((m) => m["id"] == id)
        const colore = frazione * index;
        const compito = <Compito key={i} materia={materiaArgomento["materia"]} colore={colore} data={oggi}/>
        compiti.push(compito);
    }
    root = root ? root : createRoot($(".contCompiti").get(0));
    root.render(<>{compiti}</>);
}

let caricaArgomenti;
let vRoot = []


export const ArgomentiStudente = (props) => {

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

    function ottieniGiorno(inizio, offset){
        let giorno = new Date(inizio);
        giorno.setDate(giorno.getDate() + offset);
        return giorno.toLocaleString('it-IT', { weekday : 'long' ,day: 'numeric', month: 'long' });
    }

    caricaArgomenti = async function (){
        const dataInSQL = (data) => {
            const anno = data.getFullYear();
            const mese = String(data.getMonth() + 1).padStart(2, '0');
            const giorno = String(data.getDate()).padStart(2, '0');
            return `${anno}-${mese}-${giorno}`;
        }

        const cellaTesto = $(".cellaTesto")

        cellaTesto.eq(0).attr("init", true)

        $(".cellaData").empty();
        
        let inizio = new Date($("#rangeDataInizio").attr("data"));
        let fine = new Date($("#rangeDataFine").attr("data"));

        inizio = resetTempo(inizio);
        fine = resetTempo(fine);

        let inizioMese = new Date();
        inizioMese.setDate(1);
        let fineMese = new Date();
        let aus = fineMese.getMonth();
        fineMese.setMonth(aus + 1, 0);

        const dataInizio = dataInSQL(inizioMese)
        const dataFine = dataInSQL(fineMese)
        let classe = props.classe.split(" ")[0] + " " + props.classe.split(" ")[1].substr(0, 3);
        classe = classe.toUpperCase();
        const materie = await inviaRichiesta("GET", "src/server/materie.php")
        inviaRichiesta("GET", "src/server/argomenti.php", {range : {dataInizio, dataFine}, classe})
        .done((data) => {
            let oggi = new Date();
            oggi.setDate(oggi.getDate() + 1);
            oggi = dataInSQL(oggi);
            const argOggi = data.filter((arg) => arg["data"] == oggi);
            riempiArgomentiHome(argOggi, materie);
            for(let arg of data){
                let d = new Date(arg["data"])
                d = d.getDate();
                $(".giorno:not(.nomiGiorni)").eq(d - 1).addClass("programmato")
            }
            let aus = []
            for(let arg of data){
                let d = new Date(arg["data"])
                d = resetTempo(d);
                if(d >= inizio && d <= fine)
                    aus.push(arg)
            }
            data = aus;
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
            for(const giorno of arg){
                let divGiorno = []
                for(let [i, argomento] of Object.entries(giorno)){  
                    const materiaArgomento = materie.find((m) => m["materia"] == argomento["materia"])
                    const id = materiaArgomento["id"]
                    const index = materie.findIndex((m) => m["id"] == id)
                    const colore = {filter : `hue-rotate(${frazione * index}deg)`};
                    divGiorno.push(<div className="cellaArgomento" key={i}>
                                    <span className="materiaHl" name={id} style={colore}>{argomento["materia"]}</span>
                                    <span className="argomento">{argomento["argomento"]}</span>
                                </div>)
                }
                tot.push(divGiorno)
            }

            tot = tot.map((giorno, i) => { return giorno.length == 0 ? [<div className="cellaArgomento" key={i}>Niente in Programma</div>] : giorno })
            const len = cellaTesto.length;
            cellaTesto.each((i, ref) => {
                let root;
                if(vRoot.length != len){
                    root = createRoot(ref);
                    vRoot.push(root);
                }else root = vRoot[i];
                root.render(<>{tot[i]}</>);
                $(ref).prev().html(ottieniGiorno(inizio, i));
            })
        })
        .fail(errore)

        function resetTempo(data){
            data.setHours(0);
            data.setMinutes(0);
            data.setSeconds(0);
            data.setMilliseconds(0);
            return data;
        }
    }

    useEffect(() => {
        if(!$(".cellaTesto").eq(0).attr("init"))
            caricaArgomenti();
    }, []);

    const cambiaData = (indice) => {
        const contInizio = $("#rangeDataInizio");
        const contFine = $("#rangeDataFine");
        const inizio = new Date(contInizio.attr("data"));
        const fine = new Date(contFine.attr("data"));
        inizio.setDate(inizio.getDate() + 7 * indice);
        fine.setDate(fine.getDate() + 7 * indice);
        contInizio.attr("data", inizio).text(inizio.toLocaleString('it-IT', { day: 'numeric', month: 'long' }));
        contFine.attr("data", fine).text(fine.toLocaleString('it-IT', { day: 'numeric', month: 'long' }));
        caricaArgomenti();
    }

    return (
        <div id="divArgomenti" className='flex-col pagina nascosto' titolo="Compiti & Argomenti">
            <SelectMaterie/>
            <span className="flex-row" style={{gap : "1rem"}} id="cntControlloData">
                <button className="btnData flex-col" onClick={() => {cambiaData(-1)}}>
                    <ion-icon name="chevron-back"></ion-icon>
                </button>
                    <span className="hl" id="rangeDataInizio" data={dataInizio}>{inizio}</span>
                    <span style={{color : "#79809c"}}>e</span>
                    <span className="hl" id="rangeDataFine" data={dataFine}>{fine}</span>
                <button className="btnData flex-col" onClick={() => {cambiaData(1)}}>
                    <ion-icon name="chevron-forward"></ion-icon>
                </button>
            </span>
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
    )
}

let creaAssenze;
let rootAssenze;

export const AssenzeStudente = (props) => {
    const matricola = props.matricola;
    let creato = false;
    creaAssenze = async () => {
        creato = true;
        inviaRichiesta("GET", "src/server/assenze.php", { matricola })
        .done((data) => {
            let assenzaG = data.filter((a) => a["giustificato"] == '1');
            let assenzaNG = data.filter((a) => a["giustificato"] == '0');

            let assenze = [];
            for(const [i, assenza] of Object.entries(assenzaNG)){
                let data = new Date(assenza["data"]);
                let tipo = assenza["giustificato"] == '1' ? "Giustificato" : "Non Giustificato";
                data = data.toLocaleString('it-IT', {weekday:"long", day: 'numeric', month: 'long' });
                assenze.push(<Assenza tipo={tipo} data={data} key={i} idassenza={assenza["id"]}/>)
            }
            for(const [i, assenza] of Object.entries(assenzaG)){
                let data = new Date(assenza["data"]);
                let tipo = assenza["giustificato"] == '1' ? "Giustificato" : "Non Giustificato";
                data = data.toLocaleString('it-IT', {weekday:"long", day: 'numeric', month: 'long' });
                assenze.push(<Assenza tipo={tipo} data={data} key={i + assenzaNG.length}/>)
            }
            rootAssenze = createRoot($("#divAssenze")[0]);
            rootAssenze.render(<>{assenze}</>);
        })
        .fail(errore)
    }

    useEffect(() => {
        if(!creato)
            creaAssenze();
    }, [])

    return (
        <div id="divAssenze" className='flex-row pagina nascosto' titolo="Assenze & Ritardi"></div>
    )
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


export const  Assenza = (props) => {
    const tipo = props.tipo
    const data = props.data
    const html = `
        <div class="flex-col" style="align-item: stretch; gap: 1rem; justify-content:space-evenly">    
            <div class="label">Inserisci la tua password per giustificare</div>
            <input type="password" id="passGiustifica" class="swal2-input swal-input" placeholder="Password">
            <span id="feedbackGiustifica" class="errore" style="margin-bottom: 1rem">s</span>
        </div>
    `
    const giustifica = (id) => {
        Swal.fire({
            title: 'Giustifica',
            text: "Inserisci la tua password per giustificare l'assenza",
            html: html,
            cancelButtonText: '',
            showCancelButton: true,
            inputAttributes: {
                autocapitalize: 'off'
            },
            confirmButtonText: '',
            customClass: {
                popup: 'swal',
                title: 'swal-titolo',
                htmlContainer: 'swal-titolo',
                input: 'swal-input',
                actions: 'wrapperBottoneSwal',
                confirmButton: 'bottoneSwal swalConferma',
                cancelButton: 'bottoneSwal swalAnnulla'
            },
            preConfirm: async () => {
                const pass = $("#passGiustifica").val();
                const [valido, errore] = await performElaboration(pass);
                console.log(valido, errore)
                if (valido) {
                    Swal.close();
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
                    rootAssenze.unmount();
                    creaAssenze();

                    return Toast.fire({
                        icon: 'success',
                        title: "Assenza giustificata"
                    })
                }
                $("#feedbackGiustifica").text(errore).animate({ opacity: 1 }, 300, () => {
                    setTimeout(() => {$("#feedbackGiustifica").animate({ opacity: 0 })}, 1000);
                });
                return false;
            }
    })

    function performElaboration(pass) {
        return new Promise((resolve) => {
            const matricola = $("#matricola").text();
            inviaRichiesta("POST", "src/server/giustifica.php", { matricola, password : md5(pass), id})
            .done((data) => {
                console.log(data);
                resolve([!("errore" in data), data["errore"]]);
            })
        });
      }
    }

    const classe = "assenza flex-col" + (props.tipo == "Giustificato" ? " giustificato" : "")
    const bottone = props.tipo == "Giustificato" ? 
    <button className="bottoneGiustifica" disabled>Giustificato</button>
    : 
    <button className="bottoneGiustifica" onClick={() => {giustifica(props.idassenza)}}>Giustifica</button>
    return (
        <div className={classe} style={{alignItems : "flex-start", padding : "1rem"}}>
            <h2>Assenza</h2>
            <div className='flex-col'>
                <h4>{tipo}</h4>
                <span className='hlAssenza'>{data}</span>
                {bottone}
            </div>
        </div>
    )
}

import { createRoot } from 'react-dom/client';
import md5 from 'md5';

export const VotiStudente = (props) => {
    const render = async () => {
        const cont = $('#contenitoreVoti')[0]
        if(!cont) return;
        $(cont).attr("id", "")
        const materie = await inviaRichiesta("GET", "src/server/materie.php")
        
        try
        {
            const data = await inviaRichiesta("GET", "src/server/voti.php", {matricola : props.matricola})
            riempiHomeVoti(data.reverse().splice(data.length - 5), materie)
            $("#contenitoreAndamento").prop({voti : JSON.stringify(data), materie : JSON.stringify(materie) })
            const root = createRoot(cont);
            let voti = []
            for(const [i, voto] of Object.entries(data)){
                const materia = materie.find((m) => m["id"] == voto["materia"])
                let data = new Date(voto["data"])
                data = data.toLocaleString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
                const info = {voto : voto["voto"], materia : materia["materia"], data : data}
                voti.push(
                    <div className='carta' key={i} materia={materia["id"]}>
                        <Voto info={info} key={i}/>
                    </div>)
            }
            root.render(<>{voti}</>);
        }
        catch(e){}
    }

    function riempiHomeVoti(data, materie){
        data = data.reverse();
        const cont = $(".contVoti").get(0)
        if(!cont){
            return setTimeout(() => riempiHomeVoti(data), 10)
        }

        let root = createRoot(cont);
        const voti = []
        for(const [i, voto] of Object.entries(data)){
            const materia = materie.find((m) => m["id"] == voto["materia"])
            let data = new Date(voto["data"])
            data = data.toLocaleString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
            const info = {voto : voto["voto"], materia : materia["materia"], data : data}
            voti.push(<div className='carta flex-col' key={i}><Voto info={info} key={i}/></div>)
        }
        root.render(<>{voti}</>);    
    }

    useEffect(() => {render()}, [])

    return (
        <div id="divVoti" className='flex-col pagina nascosto' titolo="Valutazioni">
            <h2 className='titolo'>Materia</h2>
            <SelectVoti/>
            <div className="flex-row" id="contenitoreVoti">
            </div>
        </div>
    )
}

const cambiaVoti = (e) => {
    const materia = $(e.target).closest(".option").attr("valore")
    $(`#divVoti .carta`).hide()
    if(materia == 0) return $(`#divVoti .carta`).show();
    $(`#divVoti .carta[materia=${materia}]`).show()
}

const SelectVoti = () => {
    const caricaSelect = async () => {
        const cont = $('#cntVotiSelect')[0]
        if(!cont) return;
        $(cont).attr("id", "")
        let materie = await inviaRichiesta("GET", "src/server/materie.php")
        materie.unshift({id : 0, materia : "Tutte"})
        const root = createRoot(cont);
        let opzioni = []
        for(const materia of materie){
            opzioni.push(
                <Opzione info={{valore : materia["id"], testo : materia["materia"], f : cambiaVoti}} key={materia["id"]} selezionata={materia["id"] == 0}/>
            )
        }
        root.render(<>{opzioni}</>);
    }

    useEffect(() => {caricaSelect()}, [])

    return (
        <div className="pseudoSelect flex-col" >
            <div className="selectDesc" onClick={(e) => {espandiSelect($(e.target))}}>&nbsp;Materia</div>
            <div className="selectBody flex-row" tabIndex="0" 
            onClick={(e) => {espandiSelect($(e.target))}}
            onBlur={(e) => {chiudiElemento($(e.target), null)}}>
                <span className="testoSelect flex-col">Tutte</span>
                <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <div className="selectOptions flex-col" id="cntVotiSelect">   
            </div>
        </div>
    )
}

const cambiaAndamento = (e) => {
    let voti = $("#contenitoreAndamento").prop("voti");
    if(!voti){
        return setTimeout(() => {cambiaAndamento(e)}, 100)
    }
    voti = JSON.parse(voti)
    const materie = JSON.parse($("#contenitoreAndamento").prop("materie"))
    let idMat;
    if(typeof e == "number"){
        idMat = e
    }else{
        idMat = $(e.target).closest(".option").attr("valore")
    }
    voti = voti.filter((v) => v["materia"] == idMat || idMat == 0)
    const suff = voti.filter((v) => v["voto"] >= 6).length
    const insuff = voti.filter((v) => v["voto"] < 6).length
    let media = 0;
    voti.forEach((v) => {media += parseFloat(v["voto"])})
    media /= voti.length
    media = media.toFixed(2)
    const coloreAccento = ottieniColore("#ff0000", "#00ff00",  9  * media);
    $(".suff > div").text(suff)
    $(".insuff > div").text(insuff)
    media = isNaN(media) ? 0 : media
    $(".mediaTot").css("color" , coloreAccento).children("div").text(media)
    voti.sort((a, b) => new Date(a["data"]) - new Date(b["data"]))
    if(voti.length == 0){
        $("#noDati").show();
        $("#canvasGrafico").hide();
    }else creaGrafico(voti, idMat);
}

let chart;

function creaGrafico(datiVoti, idMat){
    $("#noDati").hide()
    if(chart) chart.destroy();
    const voti = idMat == 0 ? calcolaMedie(datiVoti) : datiVoti.map((v) => v["voto"])
    const canvas = $("#canvasGrafico").get(0);
    const ctx = canvas.getContext('2d');
    configurazioneGrafico.data.datasets[0].data = voti;
    configurazioneGrafico.data.labels = voti.map((v, i) => "")
    if(voti.length < 5){
        configurazioneGrafico.options.scales.y.min = Math.min(...voti) - 1 < 0 ? 0 : Math.min(...voti) - 2
        configurazioneGrafico.options.scales.y.max = Math.max(...voti) + 1 > 10 ? 10 : Math.max(...voti) + 2
    }
    chart = new Chart(canvas, configurazioneGrafico);
}

function calcolaMedie(datiVoti){
    const voti = datiVoti.map((v) => v["voto"])
    const medie = []
    for(let [i, voto] of Object.entries(voti)){
        let nuovaSomma = i > 0 ? medie[i - 1] : 0;
        nuovaSomma += parseFloat(voto)
        medie.push(nuovaSomma)
    }
    return medie.map((m, i) => (m / (i + 1)).toFixed(2))
}

const SelectAndamento = () => {
    const caricaSelect = async () => {
        const cont = $('#cntAndamentoSelect')[0]
        if(!cont) return;
        $(cont).attr("id", "")
        let materie = await inviaRichiesta("GET", "src/server/materie.php")
        materie.unshift({id : 0, materia : "Tutte"})
        const root = createRoot(cont);
        let opzioni = []
        for(const materia of materie){
            opzioni.push(
                <Opzione info={{valore : materia["id"], testo : materia["materia"], f : cambiaAndamento}} key={materia["id"]} selezionata={materia["id"] == 0}/>
            )
        }
        cambiaAndamento(0)
        root.render(<>{opzioni}</>);
    }
    useEffect(() => {caricaSelect()}, [])
    return (
        <div className="pseudoSelect flex-col" >
            <div className="selectDesc" onClick={(e) => {espandiSelect($(e.target))}}>&nbsp;Materia</div>
            <div className="selectBody flex-row" tabIndex="0" 
            onClick={(e) => {espandiSelect($(e.target))}}
            onBlur={(e) => {chiudiElemento($(e.target), null)}}>
                <span className="testoSelect flex-col">Tutte</span>
                <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <div className="selectOptions flex-col" id="cntAndamentoSelect">   
            </div>
        </div>
    )
}

const Opzione = (props) => {
    let classe = props.selezionata ? "selezionata " : ""
    classe += "option"
    return (
        <div className={classe} onClick={(e) => {chiudiElemento($(e.target), null); props.info.f(e)}} valore={props.info.valore}>
            <span>{props.info.testo}</span>
            <ion-icon name="checkmark-outline"></ion-icon>
        </div>
    )
}

export const AnagraficoStudente = (props) => {

    const info = props.info

    function caricaFoto(e){
        const txtFiles = $("#txtFiles");

        const immagine = txtFiles.get(0).files[0];

        const nome = immagine.name;
        const estensione = nome.split('.').pop();

        const nuovoNome = `${info.matricola}.${estensione}`;
        const nuovaImmagine = new File([immagine], nuovoNome, { type: immagine.type });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(nuovaImmagine);
        txtFiles.get(0).files = dataTransfer.files;

        let formData = new FormData();		

		formData.append('matricola', info.matricola)		
		let files = txtFiles.prop('files');  		
		for (let file of files)
			formData.append('txtFiles[]', file);
        inviaRichiesta("POST", "src/server/upload.php", formData).done((data) => {
            cambiaPFP(nuovoNome);
        }).catch((error) => {cambiaPFP(nuovoNome);});
        mostraConferma("Immagine caricata")
    }

    function eliminaImmagine(){
        inviaRichiesta("POST", "src/server/eliminaImmagine.php", {matricola : info.matricola})
        mostraConferma("Immagine eliminata")
        resetPFP();
    }

    getImmagineProfilo();

    async function getImmagineProfilo(){
        inviaRichiesta("POST", "src/server/getImmagineProfilo.php", {matricola : info.matricola}).done((data) => {
            if("trovata" in data)
            {
                cambiaPFP(data.trovata);
            }
        })
        
    }

    return (
        <div id="divAnagrafico" className='flex-col pagina nascosto' titolo="Anagrafico">
            <div id="infoWrapper" className='flex-row'>
                <img src='./src/assets/fp.webp'/>
                <div className="flex-col">
                    <span style={{textTransform : "capitalize"}}>{info.nome + " " + info.cognome}</span>
                    <span className="label">{info.classe}</span>
                </div>
            </div>
            <div className="flex-col" id="contInfo">
                <span className='titoloInfo'>Matricola</span>
                <span className="infoHl" id="matricola">{info.matricola}</span>
                <span className='titoloInfo'>Username</span>
                <span className="infoHl">{`${info.cognome}-${info.matricola}`}</span>
                <span className='titoloInfo'>Residenza</span>
                <span className="infoHl">Italia</span>
                <span className='titoloInfo'>Indirizzo</span>
                <span className="infoHl">{info.indirizzo}</span>
                <span className='titoloInfo'>Foto Profilo</span>
                <span className="flex-row" style={{justifyContent : "left", width : "100%"}}>
                    <input type='file' id="txtFiles" accept="image/*" onChange={(e) => {caricaFoto(e)}} style={{display : "none"}}/>
                    <button className='flex-col' onClick={() => {$("#txtFiles").trigger("click")}}>Carica Foto</button>
                    <button className='flex-col' onClick={eliminaImmagine} id="btnElimPFP" style={{display : "none"}}>
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </span>
            </div>
        </div>
    )
}

function cambiaPFP(nome){
    $(".userImg, div[titolo='Anagrafico'] img").attr("src", `./src/server/fotoProfilo/${nome}`);
    $("#btnElimPFP").css("display", "flex")
}

function resetPFP(){
    $(".userImg, div[titolo='Anagrafico'] img").attr("src", "./src/assets/fp.webp");
    $("#btnElimPFP").css("display", "none")
}

export const AndamentoStudente = (props) => {
    return (
        <div id="divAndamento" className='flex-col pagina nascosto' titolo="Andamento & Statistiche">
            <SelectAndamento/>
            <div id="contenitoreAndamento">
                <div className="flex-row">
                    <div className="cartaGrafico suff flex-col">
                        <h2>Sufficienze</h2>
                        <div className="numeroVoto">93</div>
                    </div>
                    <div className="cartaGrafico insuff flex-col">
                        <h2>Insufficienze</h2>
                        <div className="numeroVoto">93</div>
                    </div>
                    <div className="cartaGrafico mediaTot flex-col">
                        <h2>Media Totale</h2>
                        <div className="numeroVoto">9.75</div>
                    </div>
                </div>
                <div className="cartaGrafico grande flex-col">
                    <canvas id="canvasGrafico" style={stileGrafico.canvas}></canvas>
                    <div className="flex-col" id="noDati">
                        <h2>Non ci sono abbastanza dati!</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}


const SelectMaterie = () => {
    const caricaSelect = async () => {
        const cont = $('#cntMaterieSelect')[0]
        if(!cont) return;
        $(cont).attr("id", "")
        let materie = await inviaRichiesta("GET", "src/server/materie.php")
        materie.unshift({id : 0, materia : "Tutte"})
        const root = createRoot(cont);
        let opzioni = []
        for(const materia of materie){
            opzioni.push(
                <Opzione info={{valore : materia["id"], testo : materia["materia"], f : cambiaArgomento}} key={materia["id"]} selezionata={materia["id"] == 0}/>
            )
        }
        root.render(<>{opzioni}</>);
    }

    useEffect(() => {caricaSelect()}, [])

    return (
        <div className="pseudoSelect flex-col" >
            <div className="selectDesc" onClick={(e) => {espandiSelect($(e.target))}}>&nbsp;Materia</div>
            <div className="selectBody flex-row" tabIndex="0" 
            onClick={(e) => {espandiSelect($(e.target))}}
            onBlur={(e) => {chiudiElemento($(e.target), null)}}>
                <span className="testoSelect flex-col">Tutte</span>
                <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <div className="selectOptions flex-col" id="cntMaterieSelect">   
            </div>
        </div>
    )
}

function cambiaArgomento(){
    $("#contArgomenti").empty()
    const materia = $("#divArgomenti").find(".testoSelect").attr("valore")
    let classe = $("#contTitolo .label").text().split(" ")
    let cnt = $("#cntControlloData")

    classe = classe[0] + " " + classe[1].substring(0, 3);
    if(materia == 0)
    {
        for(let i = 0; i < 7; i++){
            let div = $("<div>").addClass("rigaArgomenti flex-row").appendTo("#contArgomenti");
            $("<div>").addClass("cellaData flex-col").appendTo(div);
            $("<div>").addClass("cellaTesto").appendTo(div);
        }
        vRoot = []
        $("#divArgomenti").animate({gap : "4rem"}, 300, function(){
            $("#divArgomenti").css({gap : "2rem"});
            cnt.show(0).css({overflow : "visible"}).animate({height : cnt.prop("alt")}, 300)
        })

        caricaArgomenti()
        return;
    }
    const alt = cnt.css("height")
    if(cnt.css("display") != "none"){
    cnt.prop("alt", alt).css({overflow : "hidden"}).animate({height : 0}, 300, () => {
        cnt.hide(0);
    })
    setTimeout(() => {
        $("#divArgomenti").css({gap : "4rem"}).animate({gap : "2rem"})
    }, 298)
    }
    inviaRichiesta("GET", "src/server/argomentiMateria.php", {materia, classe})
    .done((data) => {
        if(data.length == 0)
        {
            let div = $("<div>").addClass("rigaArgomenti flex-row").appendTo("#contArgomenti");
            $("<div>").addClass("cellaData flex-col").appendTo(div);
            $("<div>").addClass("cellaTesto").appendTo(div).append("<h2>Non ci sono argomenti per questa materia</h2>")
        }
        for(let argomento of data){
            let dataA = new Date(argomento["data"])
            dataA = dataA.toLocaleDateString("it-IT", {weekday : "long" ,day : "numeric", month : "long"})    
            let div = $("<div>").addClass("rigaArgomenti flex-row").appendTo("#contArgomenti");
            $("<div>").addClass("cellaData flex-col").appendTo(div).text(dataA);
            $("<div>").addClass("cellaTesto materia").appendTo(div).text(argomento["argomento"]);
        }
    })
}