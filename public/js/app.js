
const form = document.querySelector("main section form")
const formInput = document.querySelector("main section form input")
const message1 = document.querySelector("main section p#message-1")
const message2 = document.querySelector("main section p#message-2")

form.addEventListener('submit', (event) => {

    event.preventDefault()

    let location = formInput.value

    message1.textContent = 'Loading forecast...'
    message2.textContent = ''

    fetch(`/weather?address=${encodeURIComponent(location)}`)

    .then( response => response.json() )

    .then( (body) => {
        
        if(body.error)
            [message1.textContent, message2.textContent] = ['Error', body.error]
        else
            [message1.textContent, message2.textContent] = [body.location, body.forecast]
        

    } )

    .catch( (error) => {
        [message1.textContent, message2.textContent] = ['Error', error]
    } )

})

