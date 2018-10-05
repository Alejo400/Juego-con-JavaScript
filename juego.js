const celeste = document.getElementById('celeste')
    const violeta = document.getElementById('violeta')
    const naranja = document.getElementById('naranja')
    const verde = document.getElementById('verde')
    const btnEmpezar = document.getElementById('btnEmpezar')
    const ULTIMO_NIVEL = 10

    class Juego{

      constructor(){



          this.iniciar()
          this.generarSecuencia()
                  setTimeout(this.siguienteNivel, 500)



      }

      iniciar(){

        var self = this
        this.elegirColor = this.elegirColor.bind(self) //esto ata al juego el this, para que this sea el juego y no cada un ode los botones
        this.siguienteNivel = this.siguienteNivel.bind(self) 

        btnEmpezar.classList.add('hide') //Ocultamos el boton de empezar una vez hemos iniciado
        this.nivel = 1
        this.colores = {

          //si lleva el mismo nombre, js por si solo asigna los valores sin tener que hacer por ejemplo: celeste: celeste
          celeste,
          violeta,
          naranja,
          verde

        }

      }

      generarSecuencia(){

        //llamar a la funcion fill xq luego queremos llamar a la funcion map y el map no va a funcionnar cuando tengamos elementos q no estan definidos
        // dentro de un array, al menos debe tener el valor 0. n es 0. math.random retorna un valor entre 0 y 1 y al multiplicarlo * 4 obtendremos un valor entre
        // 0 y 4 pero nunca llegara a ser 4. Math.floor redondeo el numero hacia abajo
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor( (Math.random() * 4 ) ) )

      }

      //transformar el numero obtenido del array random a color
        numToColor(num){

          switch(num){

            case 0:
              return 'celeste'
            case 1:
              return 'violeta'
            case 2:
              return 'naranja'
            case 3:
              return 'verde'

          }

        }

      //Transformar color a numeros

        ColorToNum(color){

          switch(color){

            case 'celeste':
              return 0
            case 'violeta':
              return 1
            case 'naranja':
              return 2
            case 'verde':
              return 3

          }

        }

        //Iluminar los colores utilizando la secuencia por los valores contenidos en el array de acuerdo al nivel en el que se encuentra el usuario

        iluminarSecuencia(){

          for (let i = 0; i < this.nivel; i++) {

          
           //const
            let color = this.numToColor(this.secuencia[i])
            setTimeout( () => this.iluminarColor(color), 1000 * i)

          };

        }

        //Agregar y quitar el light a los div, es decir, este funcion permite que los colores se iluminen

        iluminarColor(color){

          //Iluminamos los colores usando los valores que contienen el llamado a los div de los colores
          this.colores[color].classList.add('light')
          //Apagar la ilumincion (el light) cierta cantidad de tiempo
          setTimeout( () => this.apagarColor(color),350 )

        }

        //funcion para quitar el light

        apagarColor(color){

          this.colores[color].classList.remove('light')

        }

        siguienteNivel(){

          this.subNivel = 0
          this.iluminarSecuencia()
          this.agregarEventosClick()

        }

        agregarEventosClick(){

          this.colores.celeste.addEventListener('click', this.elegirColor) 
          this.colores.violeta.addEventListener('click', this.elegirColor)
          this.colores.naranja.addEventListener('click', this.elegirColor)
          this.colores.verde.addEventListener('click', this.elegirColor)

        }

        eliminarEventosClick(){

          this.colores.celeste.removeEventListener('click', this.elegirColor) 
          this.colores.violeta.removeEventListener('click', this.elegirColor)
          this.colores.naranja.removeEventListener('click', this.elegirColor)
          this.colores.verde.removeEventListener('click', this.elegirColor)

        }

        elegirColor(ev){

                          //  Parametro del eventListener.objetivo.dataset.elcolor al cual se le ha hecho click
          const nombreColor = ev.target.dataset.color
          const numeroColor = this.ColorToNum(nombreColor)
          this.iluminarColor(nombreColor)

          //si el numero de color es igual al numero contenido en nuestro array que contiene la respuesta el cual lo podemos deducir a partir
          // del subNivel en el cual se encuentra nuestro usuario, entonces aumentamos el nivel en el q este se encuentra
          if( numeroColor === this.secuencia[this.subNivel] ){

            this.subNivel++

            //Si el nivel del usuario y el nivel del juego son iguales, es decir, si el usuario alcanzo el nivel, aumentamos el nivel
            if(this.subNivel === this.nivel){

              this.nivel++
              this.eliminarEventosClick()

            if(this.nivel === (ULTIMO_NIVEL + 1)){

              //Gano

            }else{

              setTimeout( this.siguienteNivel, 1500 )

            }

          }

          }else {

            //perdio

          }

        }

    }


    function empezarJuego(){

      var juego = new Juego()

    }
