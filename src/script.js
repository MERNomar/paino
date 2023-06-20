const audioContext = new AudioContext()

const NOTE_DETAILS = [
{note : "C" , key : "Z" , frequency : 261.626 },
{note : "Db" , key : "S" , frequency : 277.786 },
{note : "D" , key : "X" , frequency : 293.841 },
{note : "Eb" , key : "D" , frequency : 311.456 },
{note : "E" , key : "C" , frequency : 329.6453 },
{note : "F" , key : "V" , frequency : 449.789 },
{note : "Gb" , key : "G" , frequency : 465.467 },
{note : "G" , key : "B" , frequency : 490.245 },
{note : "Ab" , key : "H" , frequency : 510.785 },
{note : "A" , key : "N" , frequency : 530.786 },
{note : "Bb" , key : "J" , frequency : 560.648 },
{note : "B" , key : "M" , frequency : 590.645 },
]

document.addEventListener('keydown' , e =>{
    if (e.repeat) return
    const keyCode = e.code
    const noteDetail = getNoteDetail(keyCode)
    if (noteDetail == null) return
    noteDetail.active = true
    playNote()


})

document.addEventListener('keyup' , e =>{
    if (e.repeat) return
    const keyCode = e.code
    const noteDetail = getNoteDetail(keyCode)
    if (noteDetail == null) return
    noteDetail.active = false
    playNote()
    
 
})

function getNoteDetail(keyboardKey){
    return NOTE_DETAILS.find(n => `Key${n.key}` === keyboardKey )
}
function playNote() {
    NOTE_DETAILS.forEach(n => {
const keyElement = document.querySelector(`[data-keys="${n.note}"]`)
keyElement.classList.toggle("active" , n.active || false)
if (n.oscillator != null){
    n.oscillator.stop()
    n.oscillator.disconnect()


}
    })
    const activeNotes = NOTE_DETAILS.filter(n => n.active)
    activeNotes.forEach(n => {
        startNote(n)
    })
}
function startNote(noteDetail) {
    const oscillator = audioContext.createOscillator()
    oscillator.frequency = noteDetail.frequency
    oscillator.type = 'sine'
    oscillator.connect(audioContext.destination)
    oscillator.start()
    noteDetail.oscillator = oscillator
}
