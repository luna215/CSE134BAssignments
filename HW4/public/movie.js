var customDialog = (function() {
    var dialog = document.getElementById('favDialog');
    var label = document.getElementById('label');
    var outputBox = document.getElementById('output');
    var movieList = document.getElementById('movieList');
    var selectedMovie;
    var editingMovie;

    for(i=0; i<localStorage.length;i++){
        movie = JSON.parse(localStorage.getItem(localStorage.key(i)));
        movieItem = document.createElement('li');
        movieItem.setAttribute('id', movie.title);
        movieItem.innerHTML = `${movie.title} (${movie.year}) - Rated: ${movie.rating} 
                                <span onClick="deleteMovieDialog('${movie.title}')">Delete</span> 
                                <span onClick="editMovieDialog('${movie.title}')">Edit</span>`;
        movieList.appendChild(movieItem);
    }

    addMovieDialog = function () {
      outputBox.innerHTML = '';
      label.innerHTML = `<label>Title: <label><input id="title" type="text"><br>
                         <label>Year of Release: </label> <input id="year" type="text"><br>
                         <lable>Rating: </label> <select id="rating">
                                                    <option value="G">G</option>
                                                    <option value="PG">PG</option>
                                                    <option value="PG-13">PG-13</option>
                                                    <option value="R">R</option>
                                                 </select>`;
      this.menu.innerHTML = `<button>Cancel</button> <button onClick="addMovie()">Save</button>`
      dialog.showModal();
    }

    addMovie = function () {
        title = DOMPurify.sanitize(document.getElementById('title').value);
        year = DOMPurify.sanitize(document.getElementById('year').value);
        rating = document.getElementById('rating').value;
        movie = {title: title, year: year, rating: rating};
        localStorage.setItem(title, JSON.stringify(movie));
        tag = document.getElementById('areThereMovies');
        tag.innerHTML = '';
        addMovieToDOM(movie);
    }
  
    addMovieToDOM = function (movie) {
        movieItem = document.createElement('li');
        movieItem.setAttribute('id', movie.title);
        movieItem.innerHTML = `${movie.title} (${movie.year}) - Rated: ${movie.rating} 
                               <span onClick="deleteMovieDialog('${movie.title}')">Delete</span> 
                               <span onClick="editMovieDialog('${movie.title}')">Edit</span>`;
        movieList.appendChild(movieItem);
    }

    deleteMovieDialog = function (title) {
        selectedMovie = title;
        customConfirm('You sure you want to delete?');
    }

    editMovieDialog = function (movieTitle) {
        movie = JSON.parse(localStorage.getItem(movieTitle));
        editingMovie = movieTitle;
        outputBox.innerHTML = '';
        label.innerHTML = `<label>Title: <label><input id="title" value="${movie.title}"type="text"><br>
                            <label>Year of Release: </label> <input id="year" value="${movie.year}" type="text"><br>
                            <lable>Rating: </label> <select value="${movie.rating}" id="rating">
                                                        <option id="G" value="G">G</option>
                                                        <option id="PG" value="PG">PG</option>
                                                        <option id="PG-13" value="PG-13">PG-13</option>
                                                        <option id="R" value="R">R</option>
                                                    </select>`;
        this.menu.innerHTML = `<button>Cancel</button> <button onClick="editMovie()">Save</button>`
        document.getElementById(movie.rating).selected = true;
        dialog.showModal();
    }  

    editMovie = function () {
        title = DOMPurify.sanitize(document.getElementById('title').value);
        year = DOMPurify.sanitize(document.getElementById('year').value);
        rating = document.getElementById('rating').value;
        movie = {title: title, year: year, rating: rating};
        localStorage.removeItem(editingMovie);
        localStorage.setItem(title, JSON.stringify(movie));
        oldMovieItem = document.getElementById(editingMovie);
        newMovieItem = document.createElement('li');
        newMovieItem.setAttribute('id', movie.title);
        newMovieItem.innerHTML = `${title} (${year}) - Rated: ${rating} 
                               <span onClick="deleteMovieDialog('${title}')">Delete</span> 
                               <span onClick="editMovieDialog('${title}')">Edit</span>`;
        oldMovieItem.replaceWith(newMovieItem);


    }

    dialog.addEventListener('close', function() {
        if(document.getElementsByTagName('output').length === 1){
            if(document.getElementsByTagName('output')[0].id === "true"){
                localStorage.removeItem(selectedMovie);
                child = document.getElementById(selectedMovie);
                movieList.removeChild(child);
            }
            
            if(localStorage.length === 0){
                tag = document.getElementById('areThereMovies');
                tag.innerHTML = 'No movies currently listed';
            }
        }
    })
}());