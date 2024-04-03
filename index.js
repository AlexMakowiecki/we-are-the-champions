import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js"
import { getDatabase, push, ref, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-project-8ee15-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListRef = ref(database, "endorsements")

const endorsementInputEl = document.getElementById("endorsement-input")
const fromInputEl = document.getElementById("from-input")
const toInputEl = document.getElementById("to-input")
const publishButtonEl = document.getElementById("publish-button")
const endorsementsListEl = document.getElementById("endorsements-list")


publishButtonEl.addEventListener("click", function(){
    const endorsementValue = endorsementInputEl.value
    const fromValue = fromInputEl.value
    const toValue = toInputEl.value
    const endorsementInfo = {
        from: fromValue,
        to: toValue, 
        content: endorsementValue,
    }
    push(endorsementsListRef, endorsementInfo)
})


onValue(endorsementsListRef, function(snapshot){
    if (snapshot.exists()){
        let endorsementsListString = ""
        const endorsementsArray = Object.entries(snapshot.val())
        for (let i=endorsementsArray.length-1; i >= 0; i--){
            const endorsementInfo = endorsementsArray[i]
            const endorsementContent = endorsementInfo[1]
            endorsementsListString +=        
                `<li class='endorsement-el'>
                    <h3 class="endorsement-to">To ${endorsementContent.to}</h3>
                    <p class="endorsement-content">${endorsementContent.content}</p>
                    <p class="endorsement-from"><strong>From ${endorsementContent.from}</strong></p>
                </li>
                `
        }
        endorsementsListEl.innerHTML = endorsementsListString
    }
})