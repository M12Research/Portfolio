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


/* WEEK 13 */

{
cover:"songs/Week 13/Covers/Cover.jpg",
file:"songs/Week 13/Soundgarden - Rhinosaur.mp3",
artist:"Soundgarden",
title:"Rhinosaur",
person:"Sam",
week:"Week 13"
},

/* WEEK 12 */

{
cover:"songs/Week 12/Covers/Cover4.jpg",
file:"songs/Week 12/Shining - My Dying Drive.mp3",
artist:"Shining",
title:"My Dying Drive",
person:"Hannah",
week:"Week 12"
},

{
cover:"songs/Week 12/Covers/Cover3.jpg",
file:"songs/Week 12/Baby Keem - family ties.mp3",
artist:"Baby Keem",
title:"Family Ties",
person:"Jelmer",
week:"Week 12"
},

{
cover:"songs/Week 12/Covers/Cover2.jpg",
file:"songs/Week 12/Willem - Honderdduizend graden.mp3",
artist:"Willem & Sef",
title:"Honderdduizend Graden",
person:"Giulia",
week:"Week 12"
},

{
cover:"songs/Week 12/Covers/Cover.jpg",
file:"songs/Week 12/05 - Raindance.mp3",
artist:"Jazzbois",
title:"Raindance",
person:"Sam",
week:"Week 12"
},

/* WEEK 11 */

{
cover:"songs/Week 11/Covers/Cover7.jpg",
file:"songs/Week 11/Ulver - They're Coming! The Birds!.mp3",
artist:"Ulver",
title:"They're Coming! The Birds!",
person:"Hannah",
week:"Week 11"
},

{
cover:"songs/Week 11/Covers/Cover6.jpg",
file:"songs/Week 11/Jackson 5 - ABC.mp3",
artist:"Jackson 5",
title:"ABC",
person:"Joost",
week:"Week 11"
},

{
cover:"songs/Week 11/Covers/Cover4.jpg",
file:"songs/Week 11/Florence + The Machine - Choreomania.mp3",
artist:"Florence + The Machine",
title:"Choreomania",
person:"Steef",
week:"Week 11"
},

{
cover:"songs/Week 11/Covers/Cover3.jpg",
file:"songs/Week 11/A Tribe Called Quest - Lyrics to Go.mp3",
artist:"A Tribe Called Quest",
title:"Lyrics to Go",
person:"Jelmer",
week:"Week 11"
},

{
cover:"songs/Week 11/Covers/Cover2.jpg",
file:"songs/Week 11/¿Téo_ - Belong in the Sun (feat. Lido).mp3",
artist:"¿Téo?",
title:"Belong in the Sun (feat. Lido)",
person:"Simone",
week:"Week 11"
},

{
cover:"songs/Week 11/Covers/Cover.jpg",
file:"songs/Week 11/poolfire - Radio Man (Official Audio).mp3",
artist:"Poolfire",
title:"Radio Man",
person:"Sam",
week:"Week 11"
},

/* WEEK 10 */

{
cover:"songs/Week 10/Covers/Cover5.jpg",
file:"songs/Week 10/Ravyn Lenae - Reputation (feat. Dominic Fike).mp3",
artist:"Ravyn Lenae",
title:"Reputation (feat. Dominic Fike)",
person:"Giulia",
week:"Week 10"
},

{
cover:"songs/Week 10/Covers/Cover2.jpg",
file:"songs/Week 10/Amy Winehouse - Back To Black.mp3",
artist:"Amy Winehouse",
title:"Back To Black",
person:"Joost",
week:"Week 10"
},

{
cover:"songs/Week 10/Covers/Cover3.jpg",
file:"songs/Week 10/ROSALÍA - Sexo, Violencia y Llantas.mp3",
artist:"ROSALÍA",
title:"Sexo, Violencia y Llantas",
person:"Jelmer",
week:"Week 10"
},

{
cover:"songs/Week 10/Covers/Cover4.jpg",
file:"songs/Week 10/Teardrinker - To the Ones Whose Bodies Shall Shake the Heavens.mp3",
artist:"Teardrinker",
title:"To the Ones Whose Bodies Shall Shake the Heavens",
person:"Hannah",
week:"Week 10"
},

{
cover:"songs/Week 10/Covers/Cover.jpg",
file:"songs/Week 10/Ze Roberto - Lotus 72 D.mp3",
artist:"Ze Roberto",
title:"Lotus 72 D",
person:"Sam",
week:"Week 10"
},

/* WEEK 9 */

{
cover:"songs/Week 9/Covers/Cover6.jpg",
file:"songs/Week 9/The Who - Baba O'Riley.mp3",
artist:"The Who",
title:"Baba O'Riley",
person:"Jelmer",
week:"Week 9"
},

{
cover:"songs/Week 9/Covers/Cover5.jpg",
file:"songs/Week 9/Karkossyn - Covered In Sand.mp3",
artist:"Karkossyn",
title:"Covered In Sand",
person:"Hannah",
week:"Week 9"
},

{
cover:"songs/Week 9/Covers/Cover4.jpg",
file:"songs/Week 9/Supershy - Keep It Rising.mp3",
artist:"Supershy",
title:"Keep It Rising",
person:"Lara #",
week:"Week 9"
},

{
cover:"songs/Week 8/Covers/Cover2.jpg",
file:"songs/Week 9/RAYE - Click Clack Symphony. (feat. Hans Zimmer).mp3",
artist:"RAYE",
title:"Click Clack Symphony. (feat. Hans Zimmer)",
person:"Simone",
week:"Week 9"
},

{
cover:"songs/Week 9/Covers/Cover2.jpg",
file:"songs/Week 9/Lily Allen - Trigger Bang (feat. Giggs).mp3",
artist:"Lily Allen",
title:"Trigger Bang (feat. Giggs)",
person:"Giulia",
week:"Week 9"
},

{
cover:"songs/Week 9/Covers/Cover.jpg",
file:"songs/Week 9/Novos Baianos - O samba da minha terra.mp3",
artist:"Novos Baianos",
title:"O Samba Da Minha Terra",
person:"Sam",
week:"Week 9"
},

// /* WEEK 8 */
// {
// cover:"songs/Week 8/Covers/Cover9.jpg",
// file:"songs/Week 8/Lily Allen - LDN.mp3",
// artist:"Lily Allen",
// title:"LDN",
// person:"Giulia",
// week:"Week 8"
// },

// {
// cover:"songs/Week 8/Covers/Cover7.jpg",
// file:"songs/Week 8/RUBII - BOTB.mp3",
// artist:"RUBII",
// title:"BOTB",
// person:"Anne",
// week:"Week 8"
// },

// {
// cover:"songs/Week 8/Covers/Cover8.jpg",
// file:"songs/Week 8/KIDS SEE GHOSTS - Kids See Ghosts.mp3",
// artist:"KIDS SEE GHOSTS",
// title:"Kids See Ghosts",
// person:"Jelmer",
// week:"Week 8"
// },

// {
// cover:"songs/Week 8/Covers/Cover6.jpg",
// file:"songs/Week 8/03 Planet Caravan.mp3",
// artist:"Black Sabbath",
// title:"Planet Caravan",
// person:"Isidoris",
// week:"Week 8"
// },

// {
// cover:"songs/Week 8/Covers/Cover5.jpg",
// file:"songs/Week 8/The Black Eyed Peas - GIRL LIKE ME.mp3",
// artist:"The Black Eyed Peas",
// title:"GIRL LIKE ME",
// person:"Joost",
// week:"Week 8"
// },

// {
// cover:"songs/Week 8/Covers/Cover4.jpg",
// file:"songs/Week 8/Snowy White - Midnight Blues.mp3",
// artist:"Snowy White",
// title:"Midnight Blues",
// person:"Lara #",
// week:"Week 8"
// },

// {
// cover:"songs/Week 8/Covers/Cover3.jpg",
// file:"songs/Week 8/Swarm Intelligence - Chromium Chambering.mp3",
// artist:"Swarm Intelligence",
// title:"Chromium Chambering",
// person:"Hannah",
// week:"Week 8"
// },

// {
// cover:"songs/Week 8/Covers/Cover2.jpg",
// file:"songs/Week 8/RAYE - I Will Overcome.mp3",
// artist:"RAYE",
// title:"I Will Overcome",
// person:"Simone",
// week:"Week 8"
// },

// {
// cover:"songs/Week 8/Covers/Cover.jpg",
// file:"songs/Week 8/Save Me.mp3",
// artist:"Marcus King",
// title:"Save Me",
// person:"Sam",
// week:"Week 8"
// },

// /* WEEK 7 */
// {
// cover:"songs/Week 7/Covers/Cover.jpg",
// file:"songs/Week 7/Madvillain - Meat Grinder.mp3",
// artist:"Madvillain",
// title:"Meat Grinder",
// person:"Jelmer",
// week:"Week 7"
// },

// {
// cover:"songs/Week 7/Covers/Cover2.jpg",
// file:"songs/Week 7/Ulver - The Future Sound of Music.mp3",
// artist:"Ulver",
// title:"The Future Sound of Music",
// person:"Hannah",
// week:"Week 7"
// },


// /* WEEK 6 */
// {
// cover:"songs/Week 6/Covers/Cover6.jpg",
// file:"songs/Week 6/Villagers of Ioannina City - Father Sun.mp3",
// artist:"Villagers of Ioannina City",
// title:"Father Sun",
// person:"Isidoris",
// week:"Week 6"
// },

// {
// cover:"songs/Week 6/Covers/Cover5.jpg",
// file:"songs/Week 6/Jack Kays - SLEEP WHEN I'M DEAD.mp3",
// artist:"Jack Kays",
// title:"SLEEP WHEN I'M DEAD",
// person:"Robin",
// week:"Week 6"
// },

// {
// cover:"songs/Week 6/Covers/Cover4.jpg",
// file:"songs/Week 6/Sef - De Machine.mp3",
// artist:"Sef",
// title:"De Machine",
// person:"Jelmer",
// week:"Week 6"
// },

// {
// cover:"songs/Week 6/Covers/Cover3.jpg",
// file:"songs/Week 6/aya - heat death.mp3",
// artist:"aya",
// title:"heat death",
// person:"Hannah",
// week:"Week 6"
// },

// {
// cover:"songs/Week 6/Covers/Cover2.jpg",
// file:"songs/Week 6/Bad Bunny - LO QUE LE PASÓ A HAWAii.mp3",
// artist:"Bad Bunny",
// title:"LO QUE LE PASÓ A HAWAii",
// person:"Simone",
// week:"Week 6"
// },

// {
// cover:"songs/Week 6/Covers/Cover.jpg",
// file:"songs/Week 6/02 - Oh Frustration.mp3",
// artist:"AJ Fullerton",
// title:"Oh Frustration",
// person:"Sam",
// week:"Week 6"
// },

    /* WEEK 5 */

// {
// cover:"songs/Week 5/Covers/Cover7.jpg",
// file:"songs/Week 5/Ruby Jackson - Simplicities.mp3",
// artist:"Ruby Jackson",
// title:"Simplicities",
// person:"Simone",
// week:"Week 5"
// },

// {
// cover:"songs/Week 5/Covers/Cover6.jpg",
// file:"songs/Week 5/Damon Albarn - Mr Tembo.mp3",
// artist:"amon Albarn",
// title:"Mr Tembo",
// person:"Jelmer",
// week:"Week 5"
// },

// {
// cover:"songs/Week 5/Covers/Cover5.jpg",
// file:"songs/Week 5/Thee Sacred Souls - Running Away.mp3",
// artist:"Thee Sacred Souls",
// title:"Running Away",
// person:"Isidoris",
// week:"Week 5"
// },

// {
// cover:"songs/Week 5/Covers/Cover2.jpg",
// file:"songs/Week 5/Paul Simon - 50 Ways to Leave Your Lover.mp3",
// artist:"Paul Simon",
// title:"50 Ways to Leave Your Lover",
// person:"Giulia",
// week:"Week 5"
// },

// {
// cover:"songs/Week 5/Covers/Cover4.jpg",
// file:"songs/Week 5/9days - AFRICAN GIRLS DO CRY.mp3",
// artist:"9days",
// title:"AFRICAN GIRLS DO CRY",
// person:"Lara",
// week:"Week 5"
// },

// {
// cover:"songs/Week 5/Covers/Cover3.jpg",
// file:"songs/Week 5/JK Flesh - DISAGREEABLE.mp3",
// artist:"JK Flesh",
// title:"DISAGREEABLE",
// person:"Hannah",
// week:"Week 5"
// },

// {
// cover:"songs/Week 5/Covers/Cover.jpg",
// file:"songs/Week 5/Sugaray Rayford - Homemade Disaster.mp3",
// artist:"Sugaray Rayford",
// title:"Homemade Disaster",
// person:"Sam",
// week:"Week 5"
// },


/* WEEK 4 */

// {
// cover:"songs/Week 4/Covers/Cover2.jpg",
// file:"songs/Week 4/Sam Cotton - Comment Tu T'appelles_.mp3",
// artist:"Sam Cotton",
// title:"Comment Tu T'appelles",
// person:"Simone",
// week:"Week 4"
// },

// {
// cover:"songs/Week 4/Covers/Cover3.jpg",
// file:"songs/Week 4/Breezy S - Dig In 97.mp3",
// artist:"Breezy S",
// title:"Dig In 97",
// person:"Mees",
// week:"Week 4"
// },

// {
// cover:"songs/Week 4/Covers/Cover4.jpg",
// file:"songs/Week 4/Andrew Nolan - Our Voices are Already the Wind.mp3",
// artist:"Andrew Nolan",
// title:"Our Voices are Already the Wind",
// person:"Hannah",
// week:"Week 4"
// },

// {
// cover:"songs/Week 4/Covers/Cover5.jpg",
// file:"songs/Week 4/The Cure - A Forest.mp3",
// artist:"The Cure",
// title:"A Forest",
// person:"Koen",
// week:"Week 4"
// },

// {
// cover:"songs/Week 4/Covers/Cover6.jpg",
// file:"songs/Week 4/Qlas - Waar Was Je_.mp3",
// artist:"Qlas",
// title:"Waar Was Je",
// person:"Joost",
// week:"Week 4"
// },

// {
// cover:"songs/Week 4/Covers/Cover7.jpg",
// file:"songs/Week 4/Julee Cruise - Rockin' Back Inside My Heart.mp3",
// artist:"Julee Cruise",
// title:"Rockin' Back Inside My Heart",
// person:"Jens",
// week:"Week 4"
// },

// {
// cover:"songs/Week 4/Covers/Cover8.jpg",
// file:"songs/Week 4/Lake Street Dive - Rich Girl.mp3",
// artist:"Lake Street Dive",
// title:"Rich Girl",
// person:"Giulia",
// week:"Week 4"
// },

// {
// cover:"songs/Week 4/Covers/Cover9.jpg",
// file:"songs/Week 4/Tom Misch - Red Moon.mp3",
// artist:"Tom Misch",
// title:"Red Moon",
// person:"Jelmer",
// week:"Week 4"
// },

// {
// cover:"songs/Week 4/Covers/Cover.jpg",
// file:"songs/Week 4/06 - Gator.mp3",
// artist:"Jerry Reed",
// title:"Gator",
// person:"Sam",
// week:"Week 4"
// }

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
const infoBtn = document.getElementById("infoButton")
const overlay = document.getElementById("infoOverlay")
const closeBtn = document.getElementById("closeInfo")

function openOverlay(){
overlay.classList.add("active")
document.body.style.overflow = "hidden"
}

function closeOverlay(){
overlay.classList.remove("active")
document.body.style.overflow = "hidden"
}

infoBtn.addEventListener("click", openOverlay)
closeBtn.addEventListener("click", closeOverlay)

overlay.addEventListener("click", (e) => {
if(e.target === overlay){
closeOverlay()
}
})