window.onload = async () => {
    await getComments();
}

async function getComments() {
    let dbComments = await fetch('http://localhost:3000/comments', {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    })
    comments = await dbComments.json();
    loadComents(comments);
}

function loadComents(arr) {
    if (arr) {
        for (let i = 0; i < arr.length; i++) {
            let el = arr[i];
            el.date = new Date(el.date).toLocaleString();
            document.getElementById("coments").insertAdjacentHTML('afterbegin', `
      <div class="col-sm-10 coment" style="margin-top: 40px;">
        <h4 class="media-heading">${el.title}</h4><hr>
        <p style="overflow: hidden; word-wrap: normal">${el.description}</p>
        <div><i class="fa fa-calendar"></i>&nbsp;${el.date}</div>
      </div>`);
        }
    }
}

async function addComent() {

    let description = document.getElementById("new-coment").value;
    let title = document.getElementById("coment-header").value;

    if (description === '' || title === '') {
        alert("title and textfield aren't to be empty");
    } else if (title.length < 5) {
        alert('To short name')
    } else if (description.length < 20) {
        alert('Text must be more than 20 symbols')
    } else {
        let comment = {title, description};
        console.log(comment);
        let comments = await fetch('http://localhost:3000/comments', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        console.log(comments)
        comments = await comments.json();
        loadComents(comments);
        document.getElementById("new-coment").value = '';
        document.getElementById("coment-header").value = '';
        // window.scrollTo({ top: 100, left: 100, behavior: 'smooth' });
    }
}
