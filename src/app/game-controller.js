async function validateGuess(letter, list){
    for (let i = 0; i < list.length; i++){
        if (list[i].guess === letter){
            return false
        }
    }
    return true
}

async function isGameComplete(list, word){
    let count = 0
    let wordCount = word.length
    for (let i = 0; i < list.length; i++){
        if (list[i].correct === true){
            count += 1
        }
    }
    if(count === wordCount){
        alert("Game over")
        return true
    }else{
        return false
    }
}

function splitWord(word, list){
    //{letter:, display: true/false}
    let split = word.split('')
    let letters = []
    let arr = []

    for (let i = 0; i < list.length; i++){
        letters.push(list[i].guess)
    }

    if (list.length === 0){
        for (let j = 0; j < split.length; j++){
            let elm = {'letter': split[j], 'display': false}
            arr.push(elm)
        }
    }else{
        for (let i = 0; i < split.length; i++){
                if (letters.includes(split[i])){
                    let elm = {'letter': split[i], 'display': true}
                    arr.push(elm)
                }else{
                    let elm = {'letter': split[i], 'display': false}
                    arr.push(elm)
                }
        }
    }
    return arr
}



module.exports = {
    validateGuess,
    isGameComplete,
    splitWord
}