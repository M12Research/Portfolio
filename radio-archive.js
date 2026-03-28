let audioUnlocked = false
const audio = document.getElementById("audioPlayer")

document.addEventListener("pointerdown", () => {

if(!audioUnlocked){

audio.src = ""
audio.play().catch(()=>{})
audio.pause()

audioUnlocked = true

}

}, { once: true })

const songs = [

/* WEEK 6 */
{
cover:"songs/Week 6/Covers/Cover6.jpg",
file:"songs/Week 6/Villagers of Ioannina City - Father Sun.mp3",
artist:"Villagers of Ioannina City",
title:"Father Sun",
person:"Isidoris",
week:"Week 6"
},

{
cover:"songs/Week 6/Covers/Cover5.jpg",
file:"songs/Week 6/Jack Kays - SLEEP WHEN I'M DEAD.mp3",
artist:"Jack Kays",
title:"SLEEP WHEN I'M DEAD",
person:"Robin",
week:"Week 6"
},

{
cover:"songs/Week 6/Covers/Cover4.jpg",
file:"songs/Week 6/Sef - De Machine.mp3",
artist:"Sef",
title:"De Machine",
person:"Jelmer",
week:"Week 6"
},

{
cover:"songs/Week 6/Covers/Cover3.jpg",
file:"songs/Week 6/aya - heat death.mp3",
artist:"aya",
title:"heat death",
person:"Hannah",
week:"Week 6"
},

{
cover:"songs/Week 6/Covers/Cover2.jpg",
file:"songs/Week 6/Bad Bunny - LO QUE LE PASÓ A HAWAii.mp3",
artist:"Bad Bunny",
title:"LO QUE LE PASÓ A HAWAii",
person:"Simone",
week:"Week 6"
},

{
cover:"songs/Week 6/Covers/Cover.jpg",
file:"songs/Week 6/02 - Oh Frustration.mp3",
artist:"AJ Fullerton",
title:"Oh Frustration",
person:"Sam",
week:"Week 6"
},

    /* WEEK 5 */

{
cover:"songs/Week 5/Covers/Cover7.jpg",
file:"songs/Week 5/Ruby Jackson - Simplicities.mp3",
artist:"Ruby Jackson",
title:"Simplicities",
person:"Simone",
week:"Week 5"
},

{
cover:"songs/Week 5/Covers/Cover6.jpg",
file:"songs/Week 5/Damon Albarn - Mr Tembo.mp3",
artist:"amon Albarn",
title:"Mr Tembo",
person:"Jelmer",
week:"Week 5"
},

{
cover:"songs/Week 5/Covers/Cover5.jpg",
file:"songs/Week 5/Thee Sacred Souls - Running Away.mp3",
artist:"Thee Sacred Souls",
title:"Running Away",
person:"Isidoris",
week:"Week 5"
},

{
cover:"songs/Week 5/Covers/Cover2.jpg",
file:"songs/Week 5/Paul Simon - 50 Ways to Leave Your Lover.mp3",
artist:"Paul Simon",
title:"50 Ways to Leave Your Lover",
person:"Giulia",
week:"Week 5"
},

{
cover:"songs/Week 5/Covers/Cover4.jpg",
file:"songs/Week 5/9days - AFRICAN GIRLS DO CRY.mp3",
artist:"9days",
title:"AFRICAN GIRLS DO CRY",
person:"Lara",
week:"Week 5"
},

{
cover:"songs/Week 5/Covers/Cover3.jpg",
file:"songs/Week 5/JK Flesh - DISAGREEABLE.mp3",
artist:"JK Flesh",
title:"DISAGREEABLE",
person:"Hannah",
week:"Week 5"
},

{
cover:"songs/Week 5/Covers/Cover.jpg",
file:"songs/Week 5/Sugaray Rayford - Homemade Disaster.mp3",
artist:"Sugaray Rayford",
title:"Homemade Disaster",
person:"Sam",
week:"Week 5"
},


/* WEEK 4 */

{
cover:"songs/Week 4/Covers/Cover2.jpg",
file:"songs/Week 4/Sam Cotton - Comment Tu T'appelles_.mp3",
artist:"Sam Cotton",
title:"Comment Tu T'appelles",
person:"Simone",
week:"Week 4"
},

{
cover:"songs/Week 4/Covers/Cover3.jpg",
file:"songs/Week 4/Breezy S - Dig In 97.mp3",
artist:"Breezy S",
title:"Dig In 97",
person:"Mees",
week:"Week 4"
},

{
cover:"songs/Week 4/Covers/Cover4.jpg",
file:"songs/Week 4/Andrew Nolan - Our Voices are Already the Wind.mp3",
artist:"Andrew Nolan",
title:"Our Voices are Already the Wind",
person:"Hannah",
week:"Week 4"
},

{
cover:"songs/Week 4/Covers/Cover5.jpg",
file:"songs/Week 4/The Cure - A Forest.mp3",
artist:"The Cure",
title:"A Forest",
person:"Koen",
week:"Week 4"
},

{
cover:"songs/Week 4/Covers/Cover6.jpg",
file:"songs/Week 4/Qlas - Waar Was Je_.mp3",
artist:"Qlas",
title:"Waar Was Je",
person:"Joost",
week:"Week 4"
},

{
cover:"songs/Week 4/Covers/Cover7.jpg",
file:"songs/Week 4/Julee Cruise - Rockin' Back Inside My Heart.mp3",
artist:"Julee Cruise",
title:"Rockin' Back Inside My Heart",
person:"Jens",
week:"Week 4"
},

{
cover:"songs/Week 4/Covers/Cover8.jpg",
file:"songs/Week 4/Lake Street Dive - Rich Girl.mp3",
artist:"Lake Street Dive",
title:"Rich Girl",
person:"Giulia",
week:"Week 4"
},

{
cover:"songs/Week 4/Covers/Cover9.jpg",
file:"songs/Week 4/Tom Misch - Red Moon.mp3",
artist:"Tom Misch",
title:"Red Moon",
person:"Jelmer",
week:"Week 4"
},

{
cover:"songs/Week 4/Covers/Cover.jpg",
file:"songs/Week 4/06 - Gator.mp3",
artist:"Jerry Reed",
title:"Gator",
person:"Sam",
week:"Week 4"
}

];

const container = document.getElementById("records-container")

const playerBox = document.getElementById("player")
const title = document.getElementById("songTitle")
const meta = document.getElementById("songMeta")

let currentRecord = null
let currentAudio = null

const weekGroups = {}

songs.forEach(song => {
if(!weekGroups[song.week]) weekGroups[song.week] = []
weekGroups[song.week].push(song)
})

const weeks = Object.keys(weekGroups)

songs.forEach((song, index) => {

const div = document.createElement("div")
div.classList.add("record")

// find week index
const weekIndex = weeks.indexOf(song.week)

// horizontal zones per week
const zoneWidth = window.innerWidth / weeks.length

const baseX = weekIndex * zoneWidth
const x = baseX + Math.random() * (zoneWidth - 150)
const y = Math.random() * (window.innerHeight - 150)

div.style.left = x + "px"
div.style.top = y + "px"

const img = document.createElement("img")
img.src = song.cover

div.appendChild(img)
container.appendChild(div)

let offsetX, offsetY

div.addEventListener("pointerdown", e => {

div.setPointerCapture(e.pointerId)

offsetX = e.offsetX
offsetY = e.offsetY

div.classList.add("dragging")

function move(e){

div.style.left = e.pageX - offsetX + "px"
div.style.top = e.pageY - offsetY + "px"

checkProximity(div)

}

function up(e){

div.releasePointerCapture(e.pointerId)

div.classList.remove("dragging")
document.body.classList.remove("center-active")

document.removeEventListener("pointermove", move)
document.removeEventListener("pointerup", up)

// 🔥 THIS is the only moment we decide
checkCenter(div, song, index)

}

document.addEventListener("pointermove", move)
document.addEventListener("pointerup", up)

})

})

// ===== CHECK CENTER =====

function checkCenter(el, song, index){

const rect = el.getBoundingClientRect()

const cx = window.innerWidth/2
const cy = window.innerHeight/2

const ex = rect.left + rect.width/2
const ey = rect.top + rect.height/2

const dist = Math.hypot(cx-ex, cy-ey)

if(dist < 160){
activateRecord(el, song, index)
}else{
randomize(el)
}

}

document.addEventListener("keydown", e => {

if(e.code === "Space"){

e.preventDefault()

if(!currentRecord) return

if(audio.paused){
audio.play()
currentRecord.classList.remove("paused")
}else{
audio.pause()
currentRecord.classList.add("paused")
}

}

})

// ===== ACTIVATE =====

function activateRecord(el, song, index){

highlightPerson(song.person)

// eject old
if(currentRecord && currentRecord !== el){
randomize(currentRecord)
}

if(currentRecord === el){
return
}

// snap + visual
el.classList.add("playing-record")
el.style.animation = "none"

currentRecord = el

// 🔥 AUDIO (reliable now)
audio.src = song.file
audio.currentTime = 0

audio.play().then(()=>{
el.classList.remove("paused")
}).catch(()=>{
console.log("play failed")
})

// UI
playerBox.style.display = "block"

title.innerText = song.artist + " — " + song.title
meta.innerText = song.person + " • " + song.week


// next song
audio.onended = () => playNext(index)

}

function highlightPerson(person){

const records = document.querySelectorAll(".record")

records.forEach((rec, i) => {

if(songs[i].person === person){
rec.classList.add("same-person")
rec.classList.remove("dimmed")
}else{
rec.classList.remove("same-person")
rec.classList.add("dimmed")
}

})

}

// ===== RANDOMIZE =====

function randomize(el){

el.classList.remove("playing-record")

// 🔥 RESTORE FLOATING
el.style.animation = "float 20s ease-in-out infinite"

el.style.left = Math.random()*(window.innerWidth - 150)+"px"
el.style.top = Math.random()*(window.innerHeight - 150)+"px"

}

// ===== NEXT =====

function playNext(index){

let nextIndex = (index + 1) % songs.length
let nextEl = container.children[nextIndex]

activateRecord(nextEl, songs[nextIndex], nextIndex)

}

// ===== CLICK TO PAUSE =====

container.addEventListener("click", e => {

const record = e.target.closest(".record")
if(!record) return

if(record === currentRecord){

if(currentAudio.paused){
currentAudio.play()
record.classList.remove("paused")
}else{
currentAudio.pause()
record.classList.add("paused")
}

function checkProximity(el){

const rect = el.getBoundingClientRect()

const cx = window.innerWidth / 2
const cy = window.innerHeight / 2

const ex = rect.left + rect.width/2
const ey = rect.top + rect.height/2

const dist = Math.hypot(cx-ex, cy-ey)

if(dist < 180){
document.body.classList.add("center-active")
}else{
document.body.classList.remove("center-active")
}

}

}

}
)