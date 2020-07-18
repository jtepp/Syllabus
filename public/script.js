var rdy = true
document.getElementById('upload').onclick = () => { uploadImage() }

function uploadImage() {
    if (rdy) {
        rdy = false
        const ref = firebase.storage().ref()
        const file = document.getElementById('file').files[0]
        const name = new Date() + '-' + file.name
        const metadata = {
            contentType: file.type
        }
        const task = ref.child(name).put(file, metadata)

        task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
            console.log(url);
            const img = new Image()
            img.src = url
            document.body.appendChild(img)
            rdy = true
        })
    }
}





const key = "963fac04-be73-4bd4-96be-e74185fe5c1d";
var banner = document.getElementById("msg");
var stort = document.getElementById("stort");
var pron = {};
var vv = document.documentElement.style;
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
var dt = {};
var prefix = "";
var suffix = "";
//var temp = "";

if (window.location.href.includes("Page_2")) {
    cah();
    setTimeout(() => pls(), 1000)
    setTimeout(() => tableau(), 1100)

}
function playsound(idd, wordd) {
    var ddd = document.getElementById(idd);
    ddd.innerHTML = tts.innerHTML = "<audio autplay='autoplay' src='" + "http://api.voicerss.org/?key=deb7fe38b565429d8821eba9fb313173&hl=en-us&src=" + word + "'></audio>"

}
function tableau() {
    //make a table for each word
    words.forEach(word => {
        var t = document.createElement("TABLE");
        t.setAttribute("id", "table" + word);
        document.body.appendChild(t);
        document.body.appendChild(document.createElement("hr"));
        var arr = syllables[word]
        arr.forEach(syl => {
            var r = document.createElement("TR");
            r.setAttribute("id", "tr" + word);
            document.getElementById("table" + word).appendChild(r);

            var ds = document.createElement("TD");
            ds.setAttribute('id', "d" + word)
            ds.innerText = syl;

            var tts = document.createElement("TD");
            tts.setAttribute('id', "tts" + word);
            tts.setAttribute('onclick', "playsound('tts'," + syl + ")");



            //var sp = document.createElement("DIV");
            //sp.setAttribute('')


            var vv = document.createElement("INPUT");
            vv.setAttribute("id", "in" + word);
            vv.setAttribute("type", "file");
            vv.setAttribute("multiple", "true");
            vv.setAttribute("accept", "audio/*, video/*");
            document.getElementById("table" + word).appendChild(ds);
            document.getElementById("table" + word).appendChild(tts);
            document.getElementById("table" + word).appendChild(vv);
            document.body.appendChild(document.createElement("br"));


        })

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

}



function charli(ev) {
    lim.innerText = "(" + input.value.length + "/26)";
    if (ev == 13) {
        document.getElementById("nxt").click();
    }
}

function pls() {

    for (k in dt) {

        here = dt[k]

        console.log(here)
        if (here.ins == undefined) {
            try {
                syllables[k] = (here.hwi.hw.split('*'));
            } catch (TypeError) {
                syllables[k] = [k];
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
                        prefix = inta.slice(0, inta.indexOf(k));
                        suffix = inta.slice(inta.indexOf(k) + k.length, inta.length);

                    }

                })
            } else {
                syllables[k] = [k];

            }

        }


    }
    for (w of words) {
        nun.innerText += pron[w];
        nun.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

    }
    var totsyl = [];
    for (a in syllables) totsyl.push(syllables[a])


    console.log(syllables)
    console.log(pron)
    sylCount = totsyl.flat().length
    console.log(sylCount)
}

function silly() {
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
    vv.setProperty("--y", (100 - window.scrollY / 3) / 100);

    if (document.documentElement.style.getPropertyValue("--y") < 0.0) {
        stort.classList.remove("pointer");
    } else if (!stort.classList.contains("pointer")) {
        stort.classList.add("pointer");
    }
    //console.log((100-window.scrollY/3)/100);
}

function clock() {
    if (document.documentElement.style.getPropertyValue("--y") < 0.0) {
    } else {
        location.href = "Page_1.html";
    }
}


function replaceAll(tat, s, r) {
    var sss = "";
    for (c of tat) {
        if (c == s) sss += r;
        else sss += c;
    }
    return sss.trim();
};