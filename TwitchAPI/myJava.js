$(document).ready(function() {
    // var chan = "";
    var channels = ["BuffaloPinball", "freecodecamp", "ESL_SC2", "ImperiumNews", "realkraftyy", "RimGreeper", "timballs", "TheArrrrrcade"];
    var i = 0;

    function getTwitchData(x) { //x = chan
        $.ajax({
            type: 'Get',
            url: 'https://wind-bow.gomix.me/twitch-api/streams/' + x,
            // data: { channel: chan },
            // headers: { 'Client-ID': 'ekr9rr6hwa4zrcgbk00jhx8zjujeks', 'Accept': 'application/vnd.twitchtv.v5+json' },
            dataType: 'json',
            success: function(data) {
                // alert("Success");
                displayResults(data, x);
            },
            error: function(xhr, textStatus, errorThrown) {
                // alert(xhr + " " + textStatus + " " + errorThrown);
                // alert(JSON.stringify(xhr));
            }
        });
    }

    function displayResults(x, chan) {
        if (x.stream === null) { //if x.stream exists, then result null = no live stream
            createOffline(x, chan);
        } else {
            createOnline(x, chan);
        }
    }

    function createOffline(x, chan) {
        var newDiv = "<div id=" + chan + "></div>";
        var titleHTML = "<h3><a href='https://www.twitch.tv/" + chan + "'>" + chan + "</a></h3>";
        var status = "<h4 class='blinkme'>offline</h4>";
        $(".streamer-container").append(newDiv);
        $("#" + chan).append(titleHTML);
        $("#" + chan).append(status);
        $("#" + chan).css("background-color", "rgba(121,119,136,0.6)");
        $("#" + chan).css("height", "100px");
    }

    function createOnline(x, chan) {
        var displayName = x.stream.channel.display_name;
        var game = x.stream.channel.game;
        var logo = x.stream.channel.logo;
        var status = x.stream.channel.status;
        var newDiv = "<div id=" + chan + "></div>";
        var infoHTML = "<span id='" + chan + "-info'> Playing: " + game + "</span>";
        var titleHTML = "<h3><a id='" + chan + "-name' href='https://www.twitch.tv/" + chan + "'>" + displayName + "</a></h3>";
        var statusHTML = "<h4 id='" + chan + "-status'>ONLINE</h4>";
        var smallInfo = "<p id='" + chan + "-small-info'>" + status + "</p>";
        var image = "<img id='" + chan + "-logo' src='" + logo + "'>";
        $(".streamer-container").append(newDiv);
        $("#" + chan).append(titleHTML);
        $("#" + chan).append(infoHTML);
        $("#" + chan).append(statusHTML);
        $("#" + chan).append(smallInfo);
        $("#" + chan).append(image);
        $("#" + chan).css("background-color", "rgb(51, 204, 51)");
        $("#" + chan).css("position", "relative");
        $("#" + chan).css("height", "100px");
        $("#" + chan + "-name").css({
            "position": "absolute",
            "left": "100px"
        });
        $("#" + chan + "-info").css({
            "position": "absolute",
            "right": "0",
            "white-space": "pre-wrap"
        });
        $("#" + chan + "-status").css({
            "position": "absolute",
            "right": "0",
            "bottom": "0"
        });
        $("#" + chan + "-small-info").css({
            "position": "absolute",
            "left": "100px",
            "bottom": "25%"
        });
        $("#" + chan + "-logo").css({
            "position": "absolute",
            "left": "0px",
            "top": "0px",
            "z-index": "1",
            "height": "100px",
            "width": "100px"
        });
    }

    function main() {
        var len = channels.length;
        for (i = 0; i < len; i++) {
            var chan = channels[i];
            getTwitchData(chan);
        }
    }
    main();
});