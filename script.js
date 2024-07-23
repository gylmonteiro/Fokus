const html = document.querySelector('html')
const buttonFoco = document.querySelector('.app__card-button--foco')
const buttonShort = document.querySelector('.app__card-button--curto')
const buttonLong = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const textoH1 = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const tempoTela = document.querySelector('#timer')
const iconeMusica = document.querySelector('.app__card-primary-butto-icon')
const startOrPause = document.querySelector('#start-pause span')
const tocar_musica = document.querySelector('#alternar-musica')
const startTime = document.querySelector('#start-pause')
const musica = new Audio ('/sons/luna-rise-part-one.mp3')
const tocar = new Audio ('/sons/play.wav')
const pausar =  new Audio ('/sons/pause.mp3')
const beep = new Audio ('/sons/beep.mp3')

musica.loop = true

let intervaloId = null
let tempoEmSegundo = 1500


function alterarContexto(contexto) {
    mostrarTempo()

    botoes.forEach(function (botao){
        botao.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    
    switch (contexto) {
        case 'foco':
            textoH1.innerHTML = 'Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>'
            break;
        case 'descanso-curto':
            textoH1.innerHTML = 'Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta!.</strong>'
            break
        
        case 'descanso-longo':
            textoH1.innerHTML = 'Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa!.</strong>'
            break
    
        default:
            break;
    }

}
tocar_musica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

buttonFoco.addEventListener('click', () => {
    tempoEmSegundo = 1500
    alterarContexto('foco')
    buttonFoco.classList.add('active')
})

buttonShort.addEventListener('click', () => {
    tempoEmSegundo = 300
    alterarContexto('descanso-curto')
    buttonShort.classList.add('active')
})

buttonLong.addEventListener('click', (event) => {
    tempoEmSegundo = 900
    alterarContexto('descanso-longo')
    buttonLong.classList.add('active')
})

const contagemRegressiva = () => {
   

    if(tempoEmSegundo <= 0) {
        beep.play()
        alert ('tempo finalizado')
        zerar()
        return
    }

    tempoEmSegundo -= 1
    mostrarTempo()
  
}

startTime.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {

    
    if (intervaloId) {
        pausar.play()
        zerar()
        

        return
    }
    tocar.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    startOrPause.textContent = 'Pause'
    iconeMusica.setAttribute('src','/imagens/pause.png')
   
}


function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    startOrPause.textContent = 'Começar'
    iconeMusica.setAttribute('src', '/imagens/play_arrow.png')
   
}

function mostrarTempo() {
    const tempo = new Date(tempoEmSegundo * 1000)
    const tempoFormatdo = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timer.textContent = `${tempoFormatdo}`
}


mostrarTempo()