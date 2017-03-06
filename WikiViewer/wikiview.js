// https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=butter&namespace=0&limit=10
// https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=butter   $('#search-input').val()
function wikiSearch() {
    var x = document.getElementById("search-input").value;
    $.ajax({
        url: 'http://en.wikipedia.org/w/api.php?',
        data: { action: 'opensearch', search: x, format: 'json' },
        dataType: 'jsonp',
        success: displayResults(data)
    });
}
// $('#myForm').on('submit', wikiSearch);

function displayResults(x) {
    alert(JSON.stringify(y[1][1]));
}

$("#search-input").keydown(function(event) {
    if (event.keyCode == 13 || event.which == 13) {
        $("#search-button").click();
    }
});