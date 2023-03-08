import API_KEY from '/api.js'

const API = API_KEY.api_voicers
let joke = ""

const audio = document.getElementById("audio")
const button = document.getElementById("button")
const repeater = document.getElementById("button_repeat")


const textVoice = () => {
    fetch(`https://api.voicerss.org/?key=${API}&hl=en-us&c=MP3&src=${joke}`)
    .then((response) => {
        audio.src = response.url
        audio.play()
        DisableEnable("set")
    })
	.catch(err => console.error(err)) 
}

async function getJokes() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?format=json&type=single&blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        if(data.joke) {
            joke = data.joke
            textVoice()
        } else {
            getJokes()
        }   
       
    } catch (error) {
        console.log('Whoops', error);
    }
}

// Disable or enable function 

const DisableEnable = (action) => {
    if(action == "set") {
        button.setAttribute('disabled', true)
        repeater.setAttribute('disabled', true)
    } else if(action == "remove"){
        button.removeAttribute('disabled')
        repeater.removeAttribute('disabled')
    }
    
}

// Event listener when clicking on button

    // Play the joke

button.addEventListener('click', getJokes)

    // Repeat the joke
repeater.addEventListener('click', () => {
    audio.play()
    DisableEnable("set")
})

    // Enable the button when audio is finish
audio.addEventListener('ended', () => {
    DisableEnable("remove")
})
