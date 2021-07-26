function isOnline() {
    return window.navigator.onLine;
}

const connectionStatus = isOnline()

window.onload = async () => {
    if (connectionStatus) {
        let existing = localStorage.getItem('newsItem') ? JSON.parse(localStorage.getItem('newsItem')) : []
        localStorage.clear();
        if (existing.length > 0) {
            let news = await fetch('http://localhost:3000/news', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(existing[0])
            });
        } else {
            let news = await fetch('http://localhost:3000/news', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            news = await news.json();
            loadNews(news)
        }
    }
}



function loadNews(arr) {
    arr.forEach(el => {
        el.date = new Date(el.date).toLocaleString();
        document.getElementsByClassName("card-deck")[0].insertAdjacentHTML('afterbegin', `
      <div class="card">
          <div class="card-body">
          <h5 class="card-title">${el.title}</h5>      
          <p class="card-text">${el.description}</p>
          <p class="card-text"><small class="text-muted">${el.date}</small></p>
        </div>
      </div>
    `);
    })
}

