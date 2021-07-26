function isOnline() {
    return window.navigator.onLine;
}

const connectionStatus = isOnline()

window.onload = async () => {
    if (connectionStatus) {
        await getComments();
    }
}

async function getComments() {
    let comments
    let existing = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : []
    localStorage.clear();

    if (existing.length > 0) {
        const test = await fetch('http://localhost:3000/comments', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(existing[0])
        });
        loadComents(existing);
    } else {

        let dbComments = await fetch('http://localhost:3000/comments', {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        comments = await dbComments.json();
        loadComents(comments);
    }

}

function loadComents(arr) {
    if (arr) {
        for (let i = 0; i < arr.length; i++) {
            let el = arr[i];
            el.date = new Date(el.date).toLocaleString();
            document.getElementById("coments").insertAdjacentHTML('afterbegin', `
      <div class="col-sm-10 coment" >
        <h4 class="media-heading">${el.title}</h4><hr>
         <p >${el.description}</p>
        <div><i ></i>&nbsp;${el.date}</div>
      </div>`);
        }
    }
}

async function addComent() {

    let description = document.getElementById("new-coment").value;
    let title = document.getElementById("coment-header").value;
    let date = new Date().toLocaleString();

    if (description === '' || title === '') {
        alert("title and textfield aren't to be empty");
    } else if (title.length < 5) {
        alert('To short name')
    } else if (description.length < 20) {
        alert('Text must be more than 20 symbols')
    } else {
        let comment = {title, description, date};
        if (!connectionStatus) {
            let existing = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : []
            existing.push(comment)
            localStorage.setItem('comments', JSON.stringify(existing))
        } else {
            let comments = await fetch('http://localhost:3000/comments', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(comment)
            });
            loadComents(comments);
        }
        document.getElementById("new-coment").value = '';
        document.getElementById("coment-header").value = '';
    }
}

