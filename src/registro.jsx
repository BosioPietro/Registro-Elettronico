import React, {useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import { aggiungiStile, rimuoviStili } from './js/gestoreStili';

import Logo from "./assets/logo.png"

import {Opzioni, HomeStudente, ComunicazioniStudente, ArgomentiStudente, AssenzeStudente, VotiStudente, AnagraficoStudente, UserInfo, AndamentoStudente} from "./componenti/registro/componentiStudente";

import {HomeDocente, ComunicazioniDocente, ArgomentiDocente, AssenzeDocente, VotiDocente} from "./componenti/registro/componentiDocente";

import {toggleMenu} from "./js/registro/index";

import $ from "jquery";

import { useCookies } from 'react-cookie';


const Registro = () => {
    rimuoviStili();
    aggiungiStile("./src/css/registro/reg.css");
    aggiungiStile("./src/css/registro/media.css");
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['PHPSESSID']);
    
    const login = () => {
        navigate("/");
    }

    const cancellaSessione = () => {
        removeCookie("PHPSESSID");
        login();
    }

    if(cookies["PHPSESSID"] == undefined){
        login();
        return <div></div>
    }
    const data = cookies["PHPSESSID"];
    
    let {nome, cognome, classe, matricola, indrizzo} = data;
    let indirizzo = indrizzo;
    const docente = data.docente == 1;
    classe = classe.replace("INF", "Informatica");

    const compontenti = docente ? 
    [<HomeDocente key={0} nome={nome}/>,
    <VotiDocente key={1}/>,
    <ArgomentiDocente key={2}/>,
    <AssenzeDocente key={3}/>,
    <ComunicazioniDocente key={5}/>,
    <AnagraficoStudente info={{nome, cognome, classe, matricola, indirizzo}} key={4}/>] 
    : 
    [<HomeStudente key={6}/>,
    <VotiStudente matricola={matricola} key={0}/>,
    <ArgomentiStudente classe={classe} key={1}/>,
    <AssenzeStudente key={2} matricola={matricola}/>,
    <ComunicazioniStudente key={5} classe={classe}/>,
    <AndamentoStudente key={4}/>,
    <AnagraficoStudente info={{nome, cognome, classe, matricola, indirizzo}} key={3}/>];

    useEffect(() => {
        if(docente)
        {
            $("html").addClass("prof");
        }else $("html").removeClass("prof");
        const resizeFinestra = (event) => {
            const menuMedio = $("#cntLogin > div.barraLaterale.flex-col > div").css("width") == "0px";
            const schermoDesktop = $("#btnMenu").css("height") == "0px";

            const mobile = $("#cntLogin").css("flexDirection") == "column";
            if(schermoDesktop && menuMedio || mobile)
            {
                const btn = $("#btnMenu");
                const cont = btn.parent().siblings();
                btn.removeClass("collassato nonCollassato");
                cont.removeClass("collassato nonCollassato")
            }
            
            if(menuMedio)
            {
                $(".barraLaterale").removeClass("collassatoMobile nonCollassatoMobile");
            }
        };
        window.addEventListener('resize', resizeFinestra);
        return () => {
          window.removeEventListener('resize', resizeFinestra);
        }
    }, []);

    return (
        <div className="container">
            <div id="backdrop"></div>
            <div id="cntLogin" className="flex-row">
                <div className="barraLaterale flex-col">
                    <span className='flex-row'>
                        <button id="btnMenu" className='flex-col' onClick={() =>{toggleMenu(null)}}>
                            <ion-icon name="menu-outline"></ion-icon>
                        </button>
                        <div className='flex-row'>
                            <img src={Logo}/>
                            <span>Axios</span>
                        </div>
                    </span>
                    <div className='flex-col'>
                        <div id="divTitolo" className='flex-row'>
                            <img src={Logo}/>
                            <span>Axios</span>
                        </div>
                        <Opzioni info={{nome, cognome, classe}} professore={docente}/>
                        <button id="btnEsci" className='flex-row' onClick={cancellaSessione}>
                            <ion-icon name="log-out"></ion-icon>
                        </button>
                    </div>
                </div>
                <div id="contRegistro" className='flex-col'>
                    <div id="contTitolo" className='flex-row'>
                        <h2>Bentornato, {nome}</h2>
                        <div className='flex-row user'>
                            <div className='flex-col'>
                                <span>{nome + " " + cognome}</span>
                                <span className='label'>{classe}</span>
                            </div>
                            <img className="userImg" src="./src/assets/fp.webp" onClick={UserInfo}/>
                        </div>
                    </div>
                    {compontenti}
                </div>
            </div>
        </div>
    )
}

export default Registro;