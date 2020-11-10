// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.

axios.get('http://numbersapi.com/8?json')
.then(resp => console.log(resp))
.catch(err => console.log(err))

// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

facts = document.querySelector('#num-facts')

min = 1
max = 5

axios.get(`http://numbersapi.com/${min}..${max}?json`)
.then(resp => {
    for (let i = min; i <= max; i++) {
        heading = document.createElement('h1')
        facts.appendChild(heading)
        heading.innerText = `Number: ${i}`
        numFact = document.createElement('p')
        facts.appendChild(numFact)
        numFact.innerText = `${resp.data[i]}`
    }
})

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
favNumFacts = []
for (let i = 0; i < 4; i++) {
    favNumFacts.push(axios.get('http://numbersapi.com/8?json'))
}

Promise.all(favNumFacts)
.then(respArr => {
    heading = document.createElement('h1')
    facts.appendChild(heading)
    heading.innerText = `4 Facts About the number 8`
    factsList = document.createElement('ul')
    facts.appendChild(factsList)

    for (let resp of respArr) {
        li = document.createElement('li')
        factsList.append(li)
        li.innerText = `${resp.data.text}`
    }
})