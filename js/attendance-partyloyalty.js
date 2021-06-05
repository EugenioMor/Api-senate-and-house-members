var chamber = document.title.includes("Senate") ? "senate" : "house";

var url = `https://api.propublica.org/congress/v1/113/${chamber}/members.json`

fetch(url, {
        method: "GET",
        headers: {
            "X-API-Key": "ztTqbGgq9BJZzxW4JjrDpoykcJWkYDDWKbcAPANY",
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        app.miembros = data.results[0].members;
        separarMiembros(app.miembros);
        promedioPorcentaje(app.statistics.miembrosDemocrats, app.statistics.miembrosRepublicans, app.statistics.miembrosIndependents);
        leastEngaged(0.1);
        mostEngaged(0.1);
        leastLoyalty(0.1);
        mostLoyalty(0.1);
    })

var app = new Vue({
    el: "#app",
    data: {
        miembros: [],
        statistics: {
            "miembrosDemocrats": [],
            "votesWithPartyD": 0,
            "miembrosRepublicans": [],
            "votesWithPartyR": 0,
            "miembrosIndependents": [],
            "votesWithPartyI": 0,
            "leastEngaged": [],
            "mostEngaged": [],
            "leastLoyal": [],
            "mostLoyal": [],
            "total": 0
        }
    }
})

function separarMiembros(miembros) {
    app.statistics.miembrosDemocrats = miembros.filter(function (elemento) {
        return (elemento.party === "D");
    });
    app.statistics.miembrosRepublicans = miembros.filter(function (elemento) {
        return (elemento.party === "R");
    })
    app.statistics.miembrosIndependents = miembros.filter(function (elemento) {
        return (elemento.party === "ID");
    })
}

function promedio(miembros) {
    let sumaD = 0;
    for (let i = 0; i < miembros.length; i++) {
        sumaD += (miembros[i].votes_with_party_pct || 0);
    }
    return (sumaD / miembros.length);
}
//Porcentaje en 0.1 para calcular el 10%
function promedioPorcentaje(democrats, republicans, independents) {
    app.statistics.votesWithPartyD = promedio(democrats);
    app.statistics.votesWithPartyR = promedio(republicans);
    app.statistics.votesWithPartyI = promedio(independents);
}
// //Mas y menos comprometidos

function leastEngaged(porcentaje) {
    let ordenados = app.miembros.sort((miembro1, miembro2) => {
        return miembro1.missed_votes_pct - miembro2.missed_votes_pct
    })
    app.statistics.leastEngaged = ordenados.slice(-ordenados.length * porcentaje);
    return app.statistics.leastEngaged;
}

function mostEngaged(porcentaje) {
    let ordenados = app.miembros.sort((miembro1, miembro2) => {
        return miembro1.missed_votes_pct - miembro2.missed_votes_pct
    })
    app.statistics.mostEngaged = ordenados.slice(0, ordenados.length * porcentaje);
    return app.statistics.mostEngaged;
}

// Más y menos leales

function leastLoyalty(porcentaje) {
    let ordenados = app.miembros.sort((miembro1, miembro2) => {
        return miembro1.votes_with_party_pct - miembro2.votes_with_party_pct
    })
    app.statistics.leastLoyal = ordenados.slice(0, (ordenados.length * porcentaje));
    return app.statistics.leastLoyal;
}

function mostLoyalty(porcentaje) {
    let ordenados = app.miembros.sort((miembro1, miembro2) => {
        return miembro1.votes_with_party_pct - miembro2.votes_with_party_pct
    })
    app.statistics.mostLoyal = ordenados.slice(-ordenados.length * porcentaje);
    return app.statistics.mostLoyal;
}