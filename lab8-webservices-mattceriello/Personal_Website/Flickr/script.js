function makeApiCall(){
  var element = document.getElementById("fill");
  var num_options = parseInt(document.getElementById("options").value);
  var search_bar = document.getElementById("search_bar").value;
  var count = 0;
  var row;
  var key = 'a20313942f07286f2b8520b20b74f45a';


  $(document).ready(function(){
    console.log('sup');

    var url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + key+ '&tags='+search_bar+'&tag_mode=any&privacy_filter=&safe_search=&content_type=&extras=url_o&per_page='+num_options+'&format=json&nojsoncallback=1';
    $.ajax({
      url:url,
      dataType:'json'
    }).then(function(data){
      console.log(data);

      for(var i = 0; i < num_options; i++){
        //console.log("image title: " + data.current.title);

        if(count == 0){
          row = document.createElement("div");
          row.setAttribute("class", "row");
        }
        var cols = document.createElement("div");
        cols.setAttribute("class", "col-sm-3");
        //cols;
        var card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("style", "height: 300px");
        var card_body = document.createElement("div");
        card_body.setAttribute("class", "card-body");
        var image = document.createElement("img");
        image.setAttribute("class", "card-img-top");
        //if('url_o' in data.photos.photo[i]){
        image.setAttribute("src", data.photos.photo[i].url_o);
        //}
        image.setAttribute("alt", "Image not available.");
        var title = document.createTextNode(data.photos.photo[i].title);

        card.appendChild(image);
        card_body.appendChild(title);
        card.appendChild(card_body);
        cols.appendChild(card);
        row.appendChild(cols);
        count++
        if(count==4){
          element.appendChild(row)
          element.appendChild(document.createElement("br"));
          count = 0
        }

      }

    })

  })
}
