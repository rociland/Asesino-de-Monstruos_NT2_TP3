new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
        },
        atacar: function () {
            var danio = this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo -= danio;

            this.turnos.unshift({
                esJugador: true,
                text:'El jugador golpea al monstruo por ' + danio
            });

            if(this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var danio= this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo -= danio;

            this.turnos.unshift({
                esJugador: true,
                text:'El jugador golpea al monstruo por ' + danio
            });

            if(this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo();
        },

        curar: function () {
            var msj = null;
            if(this.saludJugador <= 90){
                this.saludJugador +=10;
              
                msj = 'El jugador obtuvo 10 puntos de salud';
            }else{
                this.saludJugador = 100;
                msj = "El jugador tiene buena salud"
            }
            this.turnos.unshift({
                esJugador: true,
                text: msj,
            }); 

            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
            location.reload();
        },

        ataqueDelMonstruo: function () {
            var danio = this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            this.saludJugador -= danio;

            this.turnos.unshift({
                esJugador: false,
                text:'El monstruo golpea al jugador por ' + danio
            });

            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
            return Math.max(Math.floor(Math.random()*rango[1]),rango[0]);

        },
        verificarGanador: function () {
            if(this.saludMonstruo <=0){
                if(confirm("Ganaste!! ¿Jugar de nuevo?")){
                    this.empezarPartida();
                    location.reload();
                }else{
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }else if(this.saludJugador <=0){
                if(confirm("Perdiste ¿Jugar de nuevo?")){
                    this.empezarPartida();
                    location.reload();
                }else{
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});
