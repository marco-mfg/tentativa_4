import { generateReturnsArray } from "./objetivoInvestimento.js"


const form = document.getElementById('investiment-form')
//const calculateButton = document.getElementById('calculate-results')
const clearFormButton = document.getElementById('clearForm')


function renderProgression(evt){
    evt.preventDefault()
    if (document.querySelector('.error')) {//buscando no html (document), uma classe error existente. enquanto ela existir, não deixo o botão realizar o cálculo
        return                             //botão esse, que chama essa função.
    }
    //const startingAmount = Number(form['starting-amount'].value) //referência
    
    
    const startingAmount = Number(document.getElementById('starting-amount').value.replace(',','.'))
    const additionalContribution = Number(document.getElementById('additional-contribution').value.replace(',','.'))
    const timeAmount = Number(document.getElementById('time-amount').value.replace(',','.'))
    const timeAmountPeriod = document.getElementById('time-amount-period').value
    const returnRate = Number(document.getElementById('return-rate').value.replace(',','.'))
    const returnRatePeriod = document.getElementById('evaluation-period').value
    const taxRate = Number(document.getElementById('tax-rate').value).replace(',','.')   

    const returnsArray = generateReturnsArray(startingAmount,
                         timeAmount,
                         timeAmountPeriod, 
                         additionalContribution,
                         returnRate,
                         returnRatePeriod)

    console.log(returnsArray)                         
}

export function clearForm(){
    form['starting-amount'].value = ''
    form['additional-contribution'].value = ''
    form['time-amount'].value = ''
    form['return-rate'].value = ''
    form['return-rate'].value = ''
    form['tax-rate'].value = ''

    const errorInputsContainers = document.querySelectorAll('.error')

    for (const errorInputContainer of errorInputsContainers) {//Desse jeito, pega pai, filho, avô, etc
        errorInputContainer.classList.remove('error')//removendo a tag error do css
        errorInputContainer.parentElement.querySelector('p').remove() //removendo a mensagem de erro que está em uma tag <p> -> como pega tudo o for, achou a tag no avô
    }
}

export function validateInput(evt) {
    if (evt.target.value === '') {//target me mostra qual foi o elemento (input), que disparou o evento. podendo assim pegar todos os atributos e valores
        return
    }
    //fazendo referência ao elemento pai (parentElement) e ao elemento avô (granParentElement)
    /*
    granParentElement
   └── parentElement
        └── input (evt.target)
    */
    const { parentElement } = evt.target /*É o mesmo que escrever: const parentElement = evt.target.parentElement*/
    const granParentElement = evt.target.parentElement.parentElement

    const inputValue = evt.target.value.replace(',','.')

    if ((isNaN(inputValue) || Number(inputValue) <= 0) && !parentElement.classList.contains('error')) {//esse contains('error'), faz referência a adição acontecida logo abaixo
        const errorTextElement = document.createElement('p')//criei uma tag parágrafo                //parentElement.classList.add('error')
        errorTextElement.classList.add('text-red-500')//inseri uma classe nela
        errorTextElement.innerText = 'Insira uma valor numérico e maior que zero'//coloquei um texto nela

        //colocando dentro da div do html o parágrafo que acabamos de criar


        parentElement.classList.add('error')//inserindo a tag erro do css
        granParentElement.appendChild(errorTextElement)//inserindo a tag (elemento), na última linha da div avô (append)
    } else if (parentElement.classList.contains('error') && !isNaN(inputValue) && Number(inputValue) > 0)  {
        parentElement.classList.remove('error')
        granParentElement.querySelector('p').remove() //pesquise nos descendentes alguém que corresponde a essa classe
                                                      //como nesse caso, eu mesmo só inseri uma tag <p>, só me restou ela para ser retirada
    }
}

for (const formElement of form) {
    if (formElement.tagName === 'INPUT' && formElement.hasAttribute('name')){
        formElement.addEventListener('blur',validateInput)//ligando a função a um evento (blur), a função
                                                          //tem acesso a todas as características do evento
                                                          //blur -> quando o elemento perde o foco
                                                          //esse evento blur, gera uma target do elemento que está perdendo o foco
                                                          //podendo assim, ser utilizado seus atributos e valores
    }
}

form.addEventListener('submit',renderProgression)
//calculateButton.addEventListener('click',renderProgression)
clearFormButton.addEventListener('click',clearForm)