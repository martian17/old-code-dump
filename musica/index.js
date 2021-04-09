//require /lib/htmlgen0.js

var IDD = 0;
const ID = function(){
    IDD++;
    return String(IDD);
}

const Music = function(){
    //music sheet constructor
    var notes = [];
    var byId = {};
    //for each of the clicks, the note plays

    this.add = function(time,pitch,length){
        const id = ID();
        var note = {
            id,
            pitch,
            length,
            active:true,
        };
        notes[time] = notes[time] || {};
        notes[time][id] = note;
        for(var i = time+1; i < time+length; i++){
            var note1 = {
                id,
                pitch,
                length:length-(i-time),
                active:false
            };
            notes[i][id] = note1;
        }
        //garbage collection
        byId[id] = [];
        byId[id].push(note);
    }
    this.remove = function(id){
        const note = byId[id];
        for(var i = note.time; i < note.time+note.length; i++){
            delete notes[i][id];
        }
        delete byId[id];
    }
    this.play = function(){

    }
}