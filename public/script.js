const key = "963fac04-be73-4bd4-96be-e74185fe5c1d";
var upcount = 0
var banner = document.getElementById("msg");
var pron = {};
var allSyllables = []
var input = document.getElementById("senc");
var lim = document.getElementById("count");
var rep = document.getElementById("rep");
var nun = document.getElementById("nun");
var tab = document.getElementById('table');
var syllables = {};
var sylCount = 0;
var sentence = "";
var words = [];
var bare = "";
var guid;
var dt = {};
var uuid = window.localStorage.getItem('uuid') || window.localStorage.setItem('uuid', guid = uuidv4()) || guid;
var prefix = "";
var suffix = "";
//var temp = "";
if (window.location.href.includes("Page_2")) {

    cah();
    setTimeout(() => pls(), 1000)
    setTimeout(() => tableau(), 1100)
    setTimeout(() => clearFolder(), 1150)
    setTimeout(() => listn(), 1200)
}

async function tableau() {
    allSyllables = []
    sylCount = 0
    //make a table for each word
    words.forEach(word => {
        var t = document.createElement("div");
        t.setAttribute("id", "table" + word);
        t.setAttribute("class", "table");
        document.getElementById('tabcont').appendChild(t);
        document.getElementById('tabcont').appendChild(document.createElement("hr"));
        var arr = syllables[word]
        arr.forEach(syl => {
            allSyllables.push(syl)
            sylCount++
            var r = document.createElement("div");
            r.setAttribute("id", "tr" + syl);
            r.setAttribute("class", "tr");
            document.getElementById("table" + word).appendChild(r);

            var ds = document.createElement("div");
            ds.setAttribute('id', "d" + syl)
            ds.setAttribute('class', "syl")
            ds.innerText = syl;



            //var sp = document.createElement("DIV");
            //sp.setAttribute('')


            var vv = document.createElement("INPUT");
            vv.setAttribute("id", "in" + syl);
            vv.setAttribute("type", "file");
            vv.setAttribute("multiple", "true");
            vv.setAttribute("accept", "audio/*, video/*");

            const cvv = document.createElement('div')
            cvv.setAttribute('class', 'cv')
            cvv.appendChild(vv)

            document.getElementById("tr" + syl).appendChild(ds);
            document.getElementById("tr" + syl).appendChild(cvv);
            document.getElementById('tabcont').appendChild(document.createElement("br"));


        })

    })
    document


}


function canUpload() {
    let can = true;
    allSyllables.forEach(syl => {
        if (document.getElementById('in' + syl).files.length == 0) can = false
    })
    return can
}

function listn() {
    allSyllables.forEach(syl => {
        const i = document.getElementById('in' + syl).onchange = () => {
            const u = document.getElementById('ups')
            if (canUpload()) {
                u.style.background = 'green';
                u.onclick = () => {
                    allSyllables.forEach(syl => {
                        sendUp(syl)
                    })
                }
            }

        }
    })
}

async function cah() {

    sentence = new URLSearchParams(window.location.search).get('q').slice(0, 26);
    rep.innerText = sentence;
    bare = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    sentence = sentence.trim();
    words = sentence.split(' ');
    console.log(words);
    await silly(sentence);
    // await pls()
    // await tableau()

}



function charli(ev) {
    lim.innerText = "(" + input.value.length + "/26)";
    if (ev == 13) {
        document.getElementById("nxt").click();
    }
}

async function pls() {

    for (k in dt) {

        here = dt[k]

        console.log(here)
        if (here.ins == undefined) {
            try {
                syllables[k] = (here.hwi.hw.split('*'));
                // allSyllables.concat(here.hwi.hw.split('*'))
            } catch (TypeError) {
                syllables[k] = [k];
                // allSyllables.concat(k)
            }
        } else {

            var sting = []
            for (f of here.ins) sting.push(f.if)
            //console.log(sting)

            if (replaceAll(sting.toString(), '*', '').includes(k)) {
                here.ins.forEach(ina => {
                    inta = ina.if.replace('*', '')
                    if (inta == k) {
                        syllables[k] = (ina.if.split('*'));
                        // allSyllables.concat(ina.if.split('*'))
                        prefix = inta.slice(0, inta.indexOf(k));
                        suffix = inta.slice(inta.indexOf(k) + k.length, inta.length);

                    }

                })
            } else {
                syllables[k] = [k];
                // allSyllables.concat(k);


            }

        }


    }
    for (w of words) {
        nun.innerText += pron[w];
        nun.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

    }


    console.log(syllables)
    console.log(pron)
    // sylCount = allSyllables.length
    console.log(sylCount)
}

async function silly() {
    try {


        words.forEach(word => {
            var url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=" + key;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    dt[word] = data[0];
                })

            fetch("https://api.datamuse.com/words?sp=" + word + "&md=r&ipa=1")
                .then(response => response.json())
                .then(data => {
                    pron[word] = data[0].tags[1].replace('ipa_pron:', '');
                })


        });
        //console.log(syllables)

    } catch (error) {
        dt[word] = word;
        pron[word] = word;
    }
}








function up() {
    const s = document.getElementById("stort").style
    const n = ((100 - window.scrollY / 3) / 100)
    s.opacity = n

    if (n < 0.0) {
        s.cursor = 'default'
        document.getElementById("stort").onclick = () => { }
    } else {
        s.cursor = 'pointer';
        document.getElementById("stort").onclick = () => location.href = "Page_1.html";
    }
    //console.log((100-window.scrollY/3)/100);
}



function replaceAll(tat, s, r) {
    var sss = "";
    for (c of tat) {
        if (c == s) sss += r;
        else sss += c;
    }
    return sss.trim();
};



// var rdy = true
// document.getElementById('upload').onclick = () => { uploadImage() }

function clearFolder() {
    const ref = firebase.storage().ref()
    ref.child(uuid).listAll().then(r => {
        r.items.forEach(a => {
            ref.child(a.location.path_).delete()
        })
    })
}


function sendUp(syl) {
    if (upcount < allSyllables.length) {
        upcount++
        document.getElementById('ups').style.background = 'var(--dark)'
        const ref = firebase.storage().ref()
        const el = document.getElementById('in' + syl)

        for (let i = 0; i < el.files.length; i++) {
            const file = el.files[i]
            const name = uuid + '/' + syl//new Date() + ' - ' + file.name
            const metadata = {
                contentType: file.type
            }
            const task = ref.child(name).put(file, metadata)

            task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
                document.getElementById('tr' + syl).style.background = 'green'
                console.log(url)
            })

        }
    }
}





function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
