const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    moviesEl = document.getElementById('movies'),
    resultHeading = document.getElementById('result-heading'),
    single_movieEl = document.getElementById('single-movie');

function searchMovie(e) {
    e.preventDefault();

    // Temizleme
    single_movieEl.innerHTML = '';

    // Search değeri ile eşleştirdim
    const term = search.value;

    // Kontrol edip devam ediyorum.
    if (term.trim()) {
        fetch(`http://www.omdbapi.com/?s=${term}&apikey=2d073df8`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

                if (data.Response == 'False') {
                    resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
                } else {
                    moviesEl.innerHTML = data.Search // Map ile düzenli sıralama yapıyorum.
                        .map(
                            movie => `
                            <div class="col-md-3">
                                <div class="card">
                                    <a href="#" onclick="movieSelected('${movie.imdbID}')" class="card__cover">
                                        <img src="${movie.Poster}" alt="">
                                    </a>
                                    <span class="card__rating">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"></path></svg>
                                       
                                    </span>
                                    <h3 class="card__title">
                                        <a href="#" onclick="movieSelected('${movie.imdbID}')">${movie.Title}</a>
                                    </h3>
                                </div>
                            </div>
                            `
                        )
                        .join('');
                }
            });
        // Clear search text
        search.value = '';

    } else {
        alert('Please enter a search term');
    }
}
submit.addEventListener('submit', searchMovie); // Search fonksiyonunu çalıştırdım.

// idyi alıp localstoradege ' da tutup yönlendirme yapıyorum.
function movieSelected(imdbID) {
    sessionStorage.setItem('movieId', imdbID);
    window.location = 'movies.html';
    return false;
}