export const StileOpzioni = {
    cont :{
        position: "relative",
    },
    opzione :{
        height: "3rem",   
        paddingLeft: "1rem",
        borderRadius: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
        color : "#79809c",
        transition : "all 0.3s ease-in-out",
        marginBottom : "1rem",
        whiteSpace : "nowrap",
    },
    cella : {
        position: "absolute",
        height: "3rem",
        width: "100%",
        borderRadius: "1rem",
        backgroundColor: "#fafbff",
        top : "0",
        transition : "all 0.3s ease-in-out",
    }
}

export const stileCompito = {
    cont : {
        display : "inline-flex",
        height : "12rem",
        width : "100%",
        position : "relative",
        borderRadius : "1rem",
        overflow : "hidden",
        backgroundImage : "linear-gradient(to right top, #8197e8, #d7ddf4)",
        whiteSpace : "nowrap",
    },
    main : {
        height : "100%",
        width : "25rem",
        backgroundColor : "none",
        padding : "2rem",
        color : "#FFF",
        alignItems : "flex-start",
        justifyContent : "space-between",
        gap : "1rem",
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
        whiteSpace : "nowrap",
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
        cursor : "pointer",
        backgroundColor : "#FFF",
        opacity : "0.8",
    }
}

export const StileContComp = {
    wrapper : {
        alignItems : "flex-start",
        justifyContent : "space-between",
    },
    cont : {
        gap : "2rem",
        borderRadius : ".5rem",
        flexWrap : "wrap",
        height : "29rem",
        overflow : "hidden",
    },
    titolo : {
        marginLeft : ".5rem",
        fontSize : "1.7rem",
        marginBottom : ".5rem",
        color : "#FFF",
    },
    sottoTitolo : {
        marginLeft : ".5rem",
        fontSize : "0.75rem",
        color : "#00000077",
    },
    maschera : {
        width : "100%",
        height : "fit-content",
        borderRadius : ".5rem",
    }
}

export const stileVoto = {
    cont:{
        justifyContent : "left",
        alignItems : "stretch",
        overflowY : "hidden",
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
        height : "4rem",
        width : "4rem",
        marginRight : "1rem",
        textAlign : "center",
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

export const stileProgramma = {
    cont : {
        width : "100%",
        alignItems : "flex-start",
    },
    titolo : {
        marginLeft : ".5rem",
        fontSize : "1.7rem",
        marginBottom : ".5rem",
        color : "#FFF",
    },
    wrapper : {
        padding : "2rem",
        borderRadius : "1rem",
        backgroundColor : "#FAFBFF",
        width : "100%",
        flexGrow : "1",
        alignItems : "flex-start",
    }
}

export const stileCalendario = {
    titolo:{
        color : "#000",
        marginLeft : "calc(7% - 0.75rem)",
        marginBottom : "1rem",
        fontSize : "1.7rem",
        textTransform : "capitalize",
        fontWeight : "500",
    },
    giorni : {
        display : "grid",
        gridTemplateColumns : "repeat(7, 1fr)",
        gridTemplateRows : "repeat(6, 1fr)",
        flexGrow : "1",
        width : "100%",
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
    }
}

export const StileComunicazione = {
    wrapper:{
        width : "100%",
        alignItems : "flex-start",
    },
    cont : {
        width : "100%",
        minHeight : "10rem",
        borderRadius : "1rem",
        backgroundImage : "linear-gradient(to right top, #8197e8, #C3CDF1)",
        padding : "2rem",
        color : "#FAFBFF",
        textAlign : "justify",
    }
}

export const configurazioneGrafico = {
    type: 'line',
    data: {
        labels: null,
        datasets: [
        {
            label: 'My First dataset',
            fill: true,  
            backgroundColor: function(context) {
                const chart = context.chart;
                if(!chart.chartArea) return;
                const {ctx, data, chartArea : {top, bottom }} = context.chart;
                const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                gradientBg.addColorStop(0.5, 'rgba(108, 140, 255, 1)');
                gradientBg.addColorStop(1, 'rgba(250, 251, 255, 1)');
                return gradientBg;
            },
            cubicInterpolationMode: 'monotone',
            borderColor : "#6c8cff",  
        }
        ]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
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
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    family: 'Poppins',
                    size: 15, 
                  },
                  color: '#79809c',
                  padding: 5,
                },
              },
        },
        borderWidth: 5,
        pointRadius: 0,
        animation: false

    },
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
    }
}

export const stileCheckbox = {
    cont : {
        aspectRatio : "1/1",
        height : "1rem",
        backgroundColor : "#6c8cff",
        borderRadius : ".25rem",
        cursor : "pointer",
        overflow : "hidden",
        transition : "all 0.5s ease-in-out",
    },
    pallino : {
        width : "50%",
        height : "50%",
        cursor : "pointer",
        backgroundColor : "#dce2f4",
        borderRadius : "0.1rem",
        transition : "all 0.3s ease-in-out",
        transform : "scale(0)",
    }
}