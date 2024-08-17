import React, { useEffect, useRef, useState } from 'react';

import { stileCalendario } from "./stile";
import { stileVoto } from "./stile";
import { stileCompito } from "./stile";
import { stileGrafico } from "./stile";
import { stileSwitch } from "./stile";
import { stileInput } from "./stile";
import { stileCheckbox } from "./stile";

import { Chart } from "chart.js/auto";
import {configurazioneGrafico} from "./stile";
import { hexToHsl, hslToHex, ottieniColore} from "../lib_colori";
import $, { event } from 'jquery';
import { ControllaInput } from "../../js/login/index";
import { useNavigate } from 'react-router-dom';

import { inviaRichiesta, errore } from '../../server/libreria';
import Swal from 'sweetalert2';
import md5 from 'md5';

import { useCookies } from 'react-cookie';

export const Calendario = () => {
    const now = new Date();
    const mese = now.toLocaleString('it-IT', { month: 'long' });
    const giorni = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const anno = now.getFullYear();
    const oggi = now.getDate();
    const giornoSettimana = (now.getDay() + 6) % 7; 
    const nomi = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

    const stampaGiorni = (giorni) => {
        let giorniArray = [];
        for(let nome of nomi){
            let giorno = <span key={nome} style={stileCalendario.legenda} className="giorno flex-col">{nome}</span>
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
        <div>
            <h2 style={stileCalendario.titolo}>{mese} {anno}</h2>
            <div className="giorni" style={stileCalendario.giorni}>
                 {stampaGiorni(giorni)}
            </div>
        </div>
    )
}

export const Voto = (props) => {
    const materia = props.info.materia;
    let voto = props.info.voto;
    const mod = props.info.mod;
    const perCento = 9  * voto;
    const coloreAccento = ottieniColore("#ff0000", "#00ff00", perCento);
    let coloreSfondo = hexToHsl(coloreAccento);
    coloreSfondo = hslToHex(coloreSfondo.h, coloreSfondo.s, coloreSfondo.l + 55);
    const stile = {
        backgroundColor: coloreSfondo,
        color: coloreAccento,
        border: `2px solid ${coloreAccento}`
    }
    voto = voto == parseInt(voto) ? voto : 
            <span className="flex-row">
                {parseInt(voto)}
                <span style={stileVoto.mezzo}>&nbsp;½</span>
            </span>;
    return (<div className="flex-row"  style={stileVoto.cont}>
                <div className="numero flex-col" style={{...stileVoto.voto, ...stile}}>{voto}</div>
                <span  style={stileVoto.legenda} className="flex-col">
                    <div>{materia}</div>
                    <div style={stileVoto.mod}>{mod}</div> 
                </span>
        </div>);
}


export const Compito = (props) => {
    const materia = props.info.materia;
    const date = props.info.date;
    const colori = {
        Italiano: 280, 
        Matematica : 120, 
        Inglese : 0, 
        Storia: 250, 
        Scienze: 80, 
        Ginnastica : 80,
        Informatica : 330, 
        Religione : 20, 
        Sistemi : 300};
    const colore = {filter : `hue-rotate(${colori[materia]}deg)`}
    return (
    <div style={{...stileCompito.cont, ...colore}}>
        <div style={stileCompito.main} className="flex-col">
            <h2 style={stileCompito.titolo}>{materia}</h2>
            <div className="flex-row" style={stileCompito.riga}>
                <div className="flex-col" style={stileCompito.colonna}>
                    <h5>Assegnato</h5>
                    <span style={stileCompito.testo}>{date.assegna}</span>
                </div>
                <div className="flex-col" style={stileCompito.colonna}>
                    <h5>Scadenza</h5>
                    <span style={stileCompito.testo}>{date.consegna}</span>
                </div>
            </div>
            <div style={stileCompito.bottone}>Visualizza</div>
        </div>
    </div>);
}

export const GeneraVoti = (n) => {
    const materie = ["Italiano", "Matematica", "Inglese", "Storia", "Scienze", "Ginnastica", "Informatica", "Religione", "Sistemi"];
    const mod = ["Pratico", "Scritto", "Orale"];
    
    let voti = [];
    for(let i = 0; i < n; i++) {
      let voto = {
        materia: materie[Math.floor(Math.random() * materie.length)],
        mod: mod[Math.floor(Math.random() * mod.length)],
        voto : (Math.floor(Math.random() * (20 - 8 + 1)) + 7) / 2
      }
      voti.push(voto);
    }
    return voti;
};

export const GeneraCompito = () => {
    const materie = ["Italiano", "Matematica", "Inglese", "Storia", "Scienze", "Ginnastica", "Informatica", "Religione", "Sistemi"];
    let info = []
    for(let i = 0; i < 3; i++) {
        let materia = materie[Math.floor(Math.random() * materie.length)];
        while(Array.from(info, x => x.materia).includes(materia))
        {
            materia = materie[Math.floor(Math.random() * materie.length)];
        }
        const dataCosegna = new Date();
        dataCosegna.setDate(dataCosegna.getDate() + Math.floor(Math.random() * 14) + 1);
        const consegna = dataCosegna.toLocaleString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
        const dataAssegna = new Date();
        dataAssegna.setDate(dataAssegna.getDate() - Math.floor(Math.random() * 7) + 1);
        const assegna = dataAssegna.toLocaleString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
        info.push({date : {consegna, assegna}, materia});
    }
    return info;
}

export const generaDatiGrafico = () => {
    const dati = [];
    const max = 11;
    const min = 7;
    for(let i = 0; i < 5 + 1; i++)
    {
        let valore = (Math.floor(Math.random() * (max*2 - min*2 + 1)) + min*2) / 2
        if(dati.length > 1)
        {
            if(dati[dati.length - 1] > dati[dati.length - 2])
            {
                do {
                    valore = (Math.floor(Math.random() * (max*2 - min*2 + 1)) + min*2) / 2
                }while(valore > dati[dati.length - 1]);
                
            }
            else if(dati[dati.length - 1] < dati[dati.length - 2])
            {
                do {
                    valore = (Math.floor(Math.random() * (max*2 - min*2 + 1)) + min*2) / 2
                }while(valore < dati[dati.length - 1]);
            }
        }
        dati.push(valore);
    }
    return dati;
}

export const Grafico = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#6c8cff');
        gradient.addColorStop(1, '#fafbff');
        configurazioneGrafico.data.datasets[0].backgroundColor = gradient;
        const dati = props.dati;
        configurazioneGrafico.data.datasets[0].data = dati;
        const chart = new Chart(canvas, configurazioneGrafico);
        canvas.style.display = "block";
        return () => chart.destroy();
    }, []);
    return (
        <div style={stileGrafico.cont} className='flex-col'>
            <h2>Andamento</h2>
            <canvas ref={canvasRef} style={stileGrafico.canvas}/>
        </div>
    );
}

export const SwitchLogin = (props) => {
    const cellaRef = useRef(null);
    const switchRef = useRef(null);

    useEffect(() => {
        if(props["ricordami"] && props["ricordami"]["tipo"] == "Professore")
        {
            muoviCella(null, true);
        }
    }, []);

    const muoviCella = (e, forzaProfessore = false) => {
        const sw = $(switchRef.current);
        const studente = sw.val() == "Studente" || forzaProfessore;
        const cella = $(cellaRef.current);
        sw.val(studente ? "Professore" : "Studente");
        if(studente)
        {
            const prevD = cella.css("right")
            cella.css({left : "", right : prevD}).animate({"right" : ".2rem"});
            $("html").addClass("prof")
        }
        else{
            const prevS = cella.css("left")
            cella.css({right : "", left : prevS}).animate({"left" : ".2rem"})
            $("html").removeClass("prof")
        };
    }

    return (
        <div className='flex-row' style={stileSwitch.cont} id="cntSwitch">
            <input type='hidden' ref={switchRef} value={"Studente"} id={"switchUtente"}></input>
            <button style={stileSwitch.bottone} onClick={(e) => {muoviCella(e)}} className='btn-selezionato'>Studente</button>
            <button style={stileSwitch.bottone} onClick={(e) => {muoviCella(e)}}>Professore</button>
            <div style={stileSwitch.cella} ref={cellaRef} className='cella'></div>
        </div>
    )
}

function focusInput(ref){
    const cont = $(ref.current);
    const input = cont.find("input");
    const label = cont.find("label");
    const icone = cont.find("ion-icon:not(.iconaOutput)")

    if(input.attr("id") == "password")
    {
        input.siblings("div").children().css({opacity : 1, cursor : "pointer"})
    }

    input.trigger("focus")
    icone.css("color" , "#6c8cff")
    cont.css("boxShadow" , "0px 0px 1rem #6c8cff8E")
    input.css("caret-color", "#779aff")
    label.css({
        color : "#6c8cff",
        transform : "translateY(-0.1rem)",
        fontSize : "0.7rem"
    })
}

function blurInput(ref){
    setTimeout(() => {
        const cont = $(ref.current);
        const input = cont.find("input");
        if($(document.activeElement).attr("id") == "mostraPwd")
        {
            const icona = $(document.activeElement).children().eq(0);
            const mod = icona.attr("name") == "eye-outline";
            input.trigger("focus").attr("type", mod ? "text" : "password");
            icona.attr("name", mod ? "eye-off-outline" : "eye-outline");
            return;
        }
        
        const label = cont.find("label");
        const icone = cont.find("ion-icon:not(.iconaOutput)")

        if(input.attr("id") == "password")
        {
            input.siblings("div").children().css({opacity : 0, cursor : "text"})
            input.attr("type", "password")
        }

        cont.css("boxShadow" , "0px 0px 1rem #0000001a")
        input.css("caret-color", "transparent")
        label.css({
            color : "#000000A1",
        })
        if(!input.val())
        {
            label.css({transform : "translateY(50%)", fontSize : "0.8rem"})
        }
        icone.css("color" , "#000")
        const ris = ControllaInput(cont.find("input").eq(0));
        const icona = cont.find(".iconaOutput").css("color", "");
        if(ris)
        {
            icona.attr("name", "checkmark-circle");
        }
        else
        {
            icona.attr("name", "close-circle");
            cont.addClass("errore");
            setTimeout(() => {cont.removeClass("errore")}, 400);
        }
    }, 1);
}

export const InputUser = (props) => {
    const refInput = useRef(null);

    const ricordami = props.ricordami;

    useEffect(() => {
        if(ricordami)
        {
            $(refInput.current).find("input").eq(0).val(ricordami["matricola"]);
            focusInput(refInput)
            blurInput(refInput)
        }
      }, []);

    return (
        <div style={stileInput.cont} className='flex-row wrapperInput' ref={refInput} tipo="utente" onClick={() => {focusInput(refInput)}}>
            <div style={stileInput.contIcona} className='flex-row'>
                <ion-icon name="person" style={stileInput.icona}></ion-icon>
            </div>
            <div style={stileInput.separatore}></div>
            <div className='flex-col' style={stileInput.cntInput}>
                <label style={stileInput.label} htmlFor="codUtente">Codice Utente</label>
                <span className='flex-row'>
                    <input style={stileInput.input} 
                    onFocus={() => {focusInput(refInput)}} 
                    onBlur={() => {blurInput(refInput)}} 
                    type='text' id='codUtente'/>
                    <ion-icon name="eye-outline" style={{opacity : 0}}></ion-icon>
                </span>
            </div>
            <div style={stileInput.contIcona} className='flex-row'>
                <ion-icon name="checkmark-circle" id="chkScuola" style={{color : "transparent"}} class={"iconaOutput"}></ion-icon>
            </div>
        </div>
    )
}

export const InputPass = () => {
    const refInput = useRef(null);

    const invio = (e) => {
        if(e.code == "Enter")
            $("#btnAccedi").trigger("click");
    }

    return (
        <div style={stileInput.cont} className='flex-row wrapperInput' ref={refInput} tipo="password" onClick={() => {focusInput(refInput)}}>
            <div style={stileInput.contIcona} className='flex-row'>
                <ion-icon name="lock-closed" style={stileInput.icona}></ion-icon>
            </div>
            <div style={stileInput.separatore}></div>
            <div className='flex-col' style={stileInput.cntInput}>
                <label style={stileInput.label} htmlFor="password">Password</label>
                <span className='flex-row'>
                    <input style={stileInput.input} 
                    onFocus={() => {focusInput(refInput)}} 
                    onBlur={() => {blurInput(refInput)}} 
                    type='password' id='password'
                    onKeyDown={invio}/>
                    <div tabIndex={1} id="mostraPwd">
                        <ion-icon name="eye-outline" style={stileInput.occhio} id="occhio"></ion-icon>
                    </div>
                </span>
            </div>
            <div style={stileInput.contIcona} className='flex-row'>
                <ion-icon id="chkScuola" style={{color : "transparent"}} class={"iconaOutput"}></ion-icon>
            </div>
        </div>
    )
}

export const LazyBackground = ({ src, placeholder, ...props }) => {
    const [imageSrc, setImageSrc] = useState(null);
  
    useEffect(() => {
      const imageLoader = new Image();
      imageLoader.src = src;
  
      imageLoader.onload = () => {
        setImageSrc(src);
      };
    }, [src]);
  
    return (
      <div
        {...props}
        style={{ backgroundImage: `url(${imageSrc || placeholder})` }}
      />
    );
};

export const Checkbox = (props) => {
    const refCont = useRef(null);

    function check(forza){
        const cont = $(refCont.current);
        const checked = cont.attr("checked");

        if(checked && !forza)
        {
            cont.children().css("transform" , "scale(0)");
        }else cont.children().css("transform" , "scale(1)");

        cont.attr("checked" , !checked); 
    }

    useEffect(() => {
        if(!!props["ricordami"])
        {
          check(true);
          $(refCont.current).attr("checked", true);
        }
    }, []);

    return(
        <div style={stileCheckbox.cont} id={props.id} className='flex-row' ref={refCont} onClick={() => {check(false)}} checked={false}>
            <div style={stileCheckbox.pallino}></div>
        </div>
    )
}

export const BottoneAccedi = () =>{

    const navigate = useNavigate(); 
    const [cookies, setCookie, removeCookie] = useCookies(['PHPSESSID']);

    function Login(){
        const utente = $('#codUtente');
        const password = $('#password');
        const ricordami = $('#ricordami').attr('checked');

        function erroreUtente(){
            utente.parent().parent().parent().addClass("errore");
            setTimeout(() => {utente.parent().parent().parent().removeClass("errore")}, 400);
        }

        function errorePassword(){
            password.parent().parent().parent().addClass("errore");
            setTimeout(() => {password.parent().parent().parent().removeClass("errore")}, 400);
        }

        function mostraErrore(titolo){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-start',
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
    
        const output = [utente, password].map(x => !ControllaInput(x));
    
        if(output[0])
        {
            erroreUtente()
        }
        if(output[1])
        {
            errorePassword()
        }
    
        if(output[0] || output[1]) return;
        
        // console.log(utente.val(), password.val(), ricordami);

        inviaRichiesta('POST', 'src/server/login.php', { ricordami : !!ricordami, matricola : utente.val(), password : md5(password.val()) })
        .done((data) => {
            
            if("errore" in data)
            {
                if(data.errore == "user")
                {
                    erroreUtente();
                    mostraErrore("Utente non trovato")
                }
                else if(data.errore == "password")
                {
                    errorePassword();
                    mostraErrore("Password errata")
                }
            }
            else{
                localStorage.removeItem("ricordami");
                if(ricordami)
                {
                    localStorage.setItem("ricordami", JSON.stringify({tipo : $("#switchUtente").val(), matricola : utente.val()}));
                }
                data = data["ok"];
                const arr = JSON.parse(data);
                const mod = $("#switchUtente").val()
                const modRichiesta = arr["docente"] == 1 ? "Professore" : "Studente";
                if(mod != modRichiesta)
                {
                    mostraErrore(`L'utente non è un${mod ? "" : "o"} ${mod}`);
                    erroreUtente();
                    return;
                }
                setCookie('PHPSESSID', data);
                navigate('/registro');
            }
        })
        .fail(errore)
    }

    return(
        <button id="btnAccedi" className='flex-col' onClick={Login}>Accedi</button>
    )
}