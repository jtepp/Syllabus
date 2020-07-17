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