// Bu kısımda gelen veriyi GET ile movie.html'e gönderiyorum. Orada yazdırıyorum
function getMovie() {
    movieId = sessionStorage.getItem('movieId'); // Session da tuttuğum id'yi getirdim.
    console.log(movieId);
   var xhr = new XMLHttpRequest();
   xhr.open('GET', 'https://www.omdbapi.com?i=' + movieId + '&apikey=7a7bebc7', true);

   xhr.onload = function () {
       if (xhr.status == 200) {
           movie = JSON.parse(xhr.response); // Json parse ediyorum.

           let output = `

           <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
           aria-hidden="true">
           <div class="modal-dialog">
               <div class="modal-content">
                   <div class="modal-header">
                       <h5 class="modal-title" id="exampleModalLabel">Added Movies</h5>
                       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                       </button>
                   </div>
                   <div class="modal-body">
                       <ul class="list">
                          
                       </ul>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                       <button type="button" onclick="sessionStorage.removeItem('movies')" class="btn btn-primary">Remove Basket</button>
                   </div>
               </div>
           </div>
       </div>
       
       
       <div class="col-lg-5">
       <div class="detailImg">
           <img src="${movie.Poster}" alt="">
       </div>
        </div>
        <div class="col-lg-7 mt-lg-3">
            <div class="details">
                <div id="details__movie-list">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group__item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group__item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group__item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group__item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group__item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group__item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group__item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
                    <button class="btn addToStorageBtn" id="addToStorageBtn" onclick="onAddToStorageClick()">Add To
                        Basket</button>
                </div>
            </div>

            <div class="well">
                <a href="index.html" class="btn">Go Back To Search</a>

            </div>
        </div>
   `;
           document.getElementById('movie').innerHTML = output; //  Sayfayı Html formata çevirip veri aktarıyorum.
       }
   }
   xhr.send();

}

// Sepete ekleme işlemi ve sessionda tutma işlemi birlikte tek fonksiyon olarak ekledim.
function onAddToStorageClick() {
   document.querySelector(".list").innerHTML = '';
   movieId = sessionStorage.getItem('movieId');
   let moviesAsJsonString = sessionStorage.getItem('movies');
   let movies;
   if (!moviesAsJsonString) {
       movies = [];
   } else {
       console.log(moviesAsJsonString);
       movies = JSON.parse(moviesAsJsonString);
   }
   
   movies.push(movie);
   sessionStorage.setItem('movies', JSON.stringify(movies));
   movies.forEach(x => {
       let out = `
       <li>${x.Title}</li> 
       <li><img width="200px"; src="${x.Poster}" class="thumbnail"></li>
   `;
   document.querySelector(".list").innerHTML += out;
   });
}

// Sayfa değiştirip tekrar geldiğimde modal boş dönüyordu ilk aşamada bunu bu şekilde değiştirdim.
function onInıtModal() {
   document.querySelector(".list").innerHTML = '';
   let moviesAsJsonString = sessionStorage.getItem('movies');
   let movies;
   if (!moviesAsJsonString) {
       movies = [];
   } else {
       console.log(moviesAsJsonString);
       movies = JSON.parse(moviesAsJsonString);
   }

   movies.forEach(x => {
       let out = `
       <li>${x.Title}</li> 
       <li><img width="200px"; src="${x.Poster}" class="thumbnail"></li>
   `;
   document.querySelector(".list").innerHTML += out;
   });
}
