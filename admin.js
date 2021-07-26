function isOnline() {
    return window.navigator.onLine;
}

const connectionStatus = isOnline()

async function addNews() {
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#text-news').value;

    if(title === '' ||
        description === '')
    {
        alert ('title and text are not be empty!' );
    }else if( title.length < 5){
        alert('To short title')
    }else if( description.length < 20) {
        alert('Text must be more than 20 symbols')
    }else {
        let newsItem = { title, description};

        if (!connectionStatus) {
            let existing = localStorage.getItem('newsItem') ? JSON.parse(localStorage.getItem('newsItem')) : []
            existing.push(newsItem)
            localStorage.setItem('newsItem', JSON.stringify(existing))
        } else {
            let news = await fetch('http://localhost:3000/news', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newsItem)
            });
            window.location.href = "news.html";
        }


        document.querySelector('#title').value = '';
        document.querySelector('#text-news').value = '';

    }
}

