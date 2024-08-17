import React, {useEffect} from 'react';

import {Calendario, Compito, Voto, Grafico} from './componenti/login/componenti';

import { SwitchLogin, InputUser, InputPass, LazyBackground , Checkbox} from './componenti/login/componenti';

import {GeneraVoti, GeneraCompito, generaDatiGrafico, BottoneAccedi } from './componenti/login/componenti';

import {CambiaSchermata, ClickCheckbox} from './js/login/index';

import Logo from './assets/logo.png';

import ImgSfondo from './assets/mobile_pic.gif';

import Lazy from "./assets/lazy.webp";

import { aggiungiStile, rimuoviStili } from './js/gestoreStili';

const Login = () => {
  const html = document.getElementsByTagName("html")[0];
  html.classList.remove("prof")
  useEffect(() => {
    rimuoviStili();
    aggiungiStile("./src/css/login/login.css");
    aggiungiStile("./src/css/login/media.css");
  }, []); 
  

  document.head.title = "Axios - Login";

  const infoVoti = GeneraVoti(3);
  const infoCompito = GeneraCompito();
  const datiGrafico = generaDatiGrafico();

  const ricordami = localStorage.getItem("ricordami") ? JSON.parse(localStorage.getItem("ricordami")) : null;
  const scomparso = ricordami ? ["scomparso", ""] : ["", "scomparso"];

  return(
        <div className="container">
          <div id="backdrop"></div>
          <div id="cntLogin" className="flex-row">
            <div id="contLogin">
                <div id="divTitolo" className='flex-row'>
                  <img src={Logo}/>
                  <span>Axios</span>
                </div>
                <div id="contForm">
                  <div className="flex-col">
                    <div id="schermata_0" className={'flex-col ' + scomparso[0]}>
                      <div className='flex-col'> 
                        <h1>Bentornato</h1>
                        <span className="labelLogin">Bentornato, seleziona la modalità di accesso con cui vuoi entrare</span>
                      </div>
                      <div className='flex-row' style={{gap : "1rem"}}>
                        <SwitchLogin ricordami={ricordami}/>
                        <button className='flex-col' onClick={() => {CambiaSchermata(1)}}>
                          <ion-icon name="arrow-forward-outline"></ion-icon>
                        </button>
                      </div>
                    </div>
                      <div id="schermata_1" className={'flex-col ' + scomparso[1]}>
                        <div className='flex-col'> 
                          <h1>Bentornato</h1>
                          <span className="labelLogin">Accedi, inserisci le tue credenziali per entrare</span>
                        </div>
                        <InputUser ricordami={ricordami}/>
                        <InputPass ricordami={ricordami}/>
                        <span className='flex-row'>
                          <Checkbox id="ricordami" ricordami={ricordami}/>
                          <label htmlFor="ricordami" className='labelLogin' onClick={(e) => {ClickCheckbox(e)}}>Ricordami</label>
                        </span>
                        <span className='flex-row' style={{gap : "1rem"}}>
                          <button className='flex-col' onClick={() => {CambiaSchermata(0)}}>
                            <ion-icon name="arrow-back-outline"></ion-icon>
                          </button>
                          <BottoneAccedi/>
                        </span>
                      </div>
                  </div>
                  <span className='flex-row'>
                      <div className="pallino corrente"></div>
                      <div className="pallino"></div>
                  </span>
                </div>
              </div>
            <div id="sezioneLogin" className='flex-col'>
            <LazyBackground id="mobileImg" src={ImgSfondo} placeholder={Lazy}/>
            </div>
            <div id="sezioneCarte">
              <div className="cntCarte blur">
                <div className="flex-row">
                  <div className="flex-col colonnaCarte">
                    <div className="carta cartaMedia">
                      <Compito info={infoCompito[1]}/>
                    </div>
                    <div className="carta">
                      <Voto info={infoVoti[0]}/>
                    </div>
                    <div className="carta cartaAlta">
                      <Calendario />
                    </div>
                  </div>
                  <div className="flex-col colonnaCarte">
                    <div className="carta cartaMedia">
                      <Compito info={infoCompito[0]}/>
                    </div>
                    <div className="carta">
                      <Voto info={infoVoti[1]}/>
                    </div>
                    <div className="carta cartaMedia">
                      <Grafico dati={datiGrafico}/>
                    </div>
                    <div className="carta">
                      <Voto info={infoVoti[1]}/>
                    </div>
                    <div className="carta cartaMedia">
                      <Compito info={infoCompito[2]}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-row">
                <div id="togliOverflow" className=" flex-col">  
                  <div className="cntCarte">
                    <div className="flex-row">
                      <div className="flex-col colonnaCarte">
                        <div className="carta cartaMedia">
                          <Compito info={infoCompito[1]}/>
                        </div>
                        <div className="carta">
                          <Voto info={infoVoti[0]}/>
                        </div>
                        <div className="carta cartaAlta">
                          <Calendario />
                        </div>
                      </div>
                      <div className="flex-col colonnaCarte">
                        <div className="carta cartaMedia">
                          <Compito info={infoCompito[0]}/>
                        </div>
                        <div className="carta">
                          <Voto info={infoVoti[1]}/>
                        </div>
                        <div className="carta cartaMedia">
                          <Grafico dati={datiGrafico}/>
                        </div>
                        <div className="carta">
                          <Voto  info={infoVoti[2]}/>
                        </div>
                        <div className="carta cartaMedia">
                          <Compito info={infoCompito[2]}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
)};

export default Login;