export const stileCalendario = {
    titolo:{
        marginLeft : "calc(7% - 0.75rem)",
        marginBottom : "1rem"
    },
    giorni : {
        display : "grid",
        gridTemplateColumns : "repeat(7, 1fr)",
        gridTemplateRows : "repeat(6, 1fr)",
    },
    giorno:{
        borderRadius: "0.5rem",
        fontSize : "0.75rem",
        height: "calc(17rem / 7)",
    },
    oggi:{
        color : "#6c8cff",
        backgroundColor : "#f0f3fe",
        border: "2px solid #6c8cff",
    },
    legenda:{
        fontSize : "0.75rem"
    },
}

export const stileVoto = {
    cont:{
        height: "100%",
        width : "100%",
        justifyContent : "left",
        gap : "2rem",
        overflowX : "hidden",
    },
    legenda:{
        fontSize : "1.7rem",
        textTransform: "capitalize",
        alignItems : "flex-start",
        flexGrow : "1",
        transform : "translateY(0.1rem)",
        fontWeight: "500",
        overflow : "ellipsis",
    },
    voto : {
        height : "100%",
        aspectRatio : "1/1",
        fontSize : "2rem",
        borderRadius : "100vh",
        color : "#6c8cff",
        border: "2px solid #6c8cff",
        backgroundColor : "#f0f3fe",
    },
    mod: {
        fontSize: "1rem",
        fontWeight: "200",
    },
    mezzo: {
        fontSize:"1.3rem"
    }
}

export const stileCompito = {
    cont : {
        height : "100%",
        width : "100%",
        position : "relative",
        borderRadius : "inherit",
        overflow : "hidden",
        backgroundImage : "linear-gradient(to right top, #8197e8, #d7ddf4)",
    },
    main : {
        height : "100%",
        width : "100%",
        backgroundColor : "none",
        padding : "2rem",
        color : "#FFF",
        alignItems : "flex-start",
        justifyContent : "space-between",
    },
    riga:{
        gap : "3rem",
        justifyContent : "left"
    },
    colonna : {
        alignItems : "flex-start",
        textTransform : "capitalize",
    },
    testo : {
        fontSize : "0.75rem",
    },
    bottone : {
        paddingBlock : "0.5rem",
        paddingInline : "1rem",
        borderRadius : "0.5rem",
        fontWeight : "bold",
        backgroundColor : "#    ",
        width : "fit-content",
        color : "#79809c",
        userSelect : "none",
        backgroundColor : "#FFF",
        opacity : "0.8",
        filter : "drop-shadow(0px 0px 1rem #0000001a)",
    }
}

export const stileGrafico = {
    cont : {
        width : "100%",
        height : "100%",
        position : "relative",
        padding : "2rem",
        alignItems : "flex-start",
        overflow : "hidden",
        justifyContent : "space-between",
    },
    canvas : {
        width : "100%",
        borderRadius : "1rem",
        display : "none",
    }
}

export const configurazioneGrafico = {
    type: 'line',
    data: {
        labels: ['','','','',''],
        datasets: [
        {
            label: 'My First dataset',
            data: "",
            borderColor:  "",
            cubicInterpolationMode: 'monotone',
            borderColor : "#6c8cff",
            fill: true,
            backgroundColor: "",
            
        }
        ]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            filler: {
                propagate: true
              }
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
                min: 2,
                max: 12,
            }
        },
        borderWidth: 3,
        pointRadius: 0,
        animation: false
    }
}

export const stileSwitch = {
    cont : {
        transition : "all 0.2s ease-in-out",
        position : "relative",
        backgroundColor : "#050400",
        gap : "0.2rem",
        padding : "0.2rem",
        borderRadius : "1rem",
        boxShadow : "0px 0px 0.75rem #FFFFFF1a",
        filter : "invert(1)",
    },
    bottone : {
        width : "calc(50% - 0.2rem)",
        paddingBlock : "calc(1rem - 0.2rem)",
        backgroundColor : "transparent",
        zIndex : "1",
        cursor : "pointer",
        fontFamily : "inherit",
        letterSpacing : "0.05rem",
        color : "#937300",
        mixBlendMode : "difference",
        fontSize : "0.75rem",
    },
    cella:{
        width : "calc(50% - 0.2rem)",
        paddingBlock : "0.75rem",
        backgroundColor : "#937300",
        borderRadius : "0.75rem",
        zIndex : "0",
        position : "absolute",
        height : "calc(100% - 0.4rem)",
        left : ".2rem",
    }
}

export const stileInput = {
    cont : {
        position : "relative",
        backgroundColor : "#fafbff",
        gap : "0.2rem",
        padding : "0.2rem",
        borderRadius : "1rem",
        boxShadow : "0px 0px 0.5rem #0000001a",
        height : "3rem",
        transition : "all 0.3s ease-in-out",
        cursor : "text",
        overflow : "visible",
    },
    cntInput : {
        alignItems : "flex-start",
        paddingLeft : "1rem",
        overflow : "visible",
    },
    contIcona : {
        height : "100%",
        padding : "1rem",
    },
    label : {
        fontSize : ".9rem",
        color : "#000000A1",
        transition : "all 0.3s ease-in-out",
        transform : "translateY(50%)",
        zIndex : "0",
        cursor : "text",
        whiteSpace : "nowrap",
    },
    input : {
        zIndex : "1",
        color : "#000",
        outline : "none",
        fontSize : "0.9rem",
        fontFamily : "inherit",
        backgroundColor : "transparent",
        height: "1.2rem",
        overflow : "visible",
    },
    separatore : {
        height : "60%",
        borderLeft : "2px solid #0000001a",
    },
    icona : {
        transition : "all 0.3s ease-in-out",
    },
    occhio : {
        transform : "translateY(calc(-50% + 0.2rem))",
        opacity : "0",
        transition : "all 0.3s ease-in-out",
    }
}

export const stileCheckbox = {
    cont : {
        aspectRatio : "1/1",
        height : ".8rem",
        backgroundColor : "#6c8cff",
        borderRadius : ".25rem",
        cursor : "pointer",
        overflow : "hidden",
    },
    pallino : {
        width : "40%",
        height : "40%",
        cursor : "pointer",
        backgroundColor : "#dce2f4",
        borderRadius : "0.1rem",
        transition : "all 0.3s ease-in-out",
        transform : "scale(0)",
    }
}