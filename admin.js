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
        console.log(newsItem)
        let news = await fetch('http://localhost:3000/news', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newsItem)
        });
        news = await news.json();
        document.querySelector('#title').value = '';
        document.querySelector('#text-news').value = '';
        window.location.href = "news.html";
    }
}

