var chamber = document.title.includes("Senate") ? "senate" : "house";

var url = `https://api.propublica.org/congress/v1/113/${chamber}/members.json`

fetch(url, {
        method: "GET",
        headers: {
            "X-API-Key": "ztTqbGgq9BJZzxW4JjrDpoykcJWkYDDWKbcAPANY",
        }
    })
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(function (data) {
        app.miembros = data.results[0].members;
    })
    .catch(function (error) {
        alert("Los datos no han podido ser obtenidos");
    })

var app = new Vue({
    el: "#app",
    data: {
        miembros: []
    }
})