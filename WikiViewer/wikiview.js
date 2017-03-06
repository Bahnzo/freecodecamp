// https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=butter&namespace=0&limit=10
// https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=butter   $('#search-input').val()
function wikiSearch() {
    var x = document.getElementById("search-input").value;
    $.ajax({
        url: 'http://en.wikipedia.org/w/api.php?',
        data: { action: 'opensearch', search: x, format: 'json' },
        dataType: 'jsonp',
        success: function(data) {
            displayResults(data);
        }
    });
}
// $('#myForm').on('submit', wikiSearch);
function displayResults(x) {
    // alert(JSON.stringify(x[1][1]));
    var len = x[1].length;
    document.getElementById("random-page").style.display = 'none';
    document.getElementById("main").style.top = '20%';
    document.getElementById("main").style.height = '75px';
    var newDiv = document.querySelector('.second');
    var hold;

    for (var i = 0; i < len; i++) {
        var s = "<div id='new-div" + [i] + "' style='border-style: solid;border-radius:5px'><p id='title-text'></p><p id='desc-text'></p></div>";
        // var s = "<div id='new-div" + [i] + "' style='border-style: solid;border-radius:5px'><a href='#' id='title-text'></a><p id='desc-text'></p></div>";
        var div = document.createElement('div');
        div.innerHTML = s;
        document.getElementById("second").appendChild(div);

    }
    for (i = 0; i < len; i++) {
        var elem = '#new-div' + i;
        var z = document.querySelector(elem);
        var title = '<a href="' + x[3][i] + '">' + x[1][i] + '</a>';
        /*document.querySelector(elem + " #title-text").textContent = x[1][i];
        document.querySelector(elem + " #title-text").href = x[3][i];*/
        document.querySelector(elem + " #title-text").innerHTML = title;
        document.querySelector(elem + ' #desc-text').textContent = x[2][i];
        z.style.margin = '5px';
    }
    newDiv.style.width = '50%';
    newDiv.style.display = "block";
    newDiv.style.margin = '0 auto';



    /*document.body.appendChild(div);
    var txt = document.createTextNode("New Div I created");
    div.appendChild(txt);
    div.innerHTML = s;*/


}

$("#search-input").keydown(function(event) {
    if (event.keyCode == 13 || event.which == 13) {
        $("#search-button").click();
    }
});