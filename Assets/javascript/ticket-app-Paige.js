$("#submitbtn").on("click", function (evt) {
    evt.preventDefault();

    var queryURL;

    var eventName = $("#eventName").val().trim();
    eventName = eventName.toLowerCase();
    // eventName = eventName.replace(/\s+/g, "-")
    console.log("input: " + eventName)

    var queryURL = 'https://api.seatgeek.com/2/events/?client_id=MTU4NDczMDN8MTU1MzEyNzc0Ny42OA&client_secret=dda067dbe95284017c0a01a3ef629be429e1fb11f9a8317ad3a8ea50ac4f6e58&q=' + eventName + "&per_page=50";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.events;
        $(".results").empty();
        for (var i = 0; i < results.length; i++) {
            var eventResult = $("<table>");
            var eventMainTitle = results[i].title;
            eventMainTitle = eventMainTitle.toLowerCase();
            var eventShortTitle = $("<p>").text(results[i].short_title);
            var where = $("<p>").text(results[i].venue.display_location);
            var when = $("<p>").text(results[i].datetime_local);
            var ticketLink = $("<a>").text("Visit SeatGeek to View Tickets");
            ticketLink.attr("href", results[i].url);
            // $("#artist-div").append("<a href=" + response.url + "> Visit Bands in Town to see more information about " + response.name + "</a>");

            // var image = $("<img>").attr("src", results[i].performers[0].image);
            if (eventMainTitle.indexOf(eventName) > -1) {
                // $(".form").empty();
                // eventResult.html(eventShortTitle);
                // eventResult.append(where);
                // eventResult.append(when);
                // eventResult.append(ticketLink);
                // $(".row").prepend(eventResult);
                // var eventResult = $("<table>")
                var newRow = $("<tr>").append(
                    $("<td>").text(eventShortTitle),
                    $("<td>").text(where),
                    $("<td>").text(when),
                    $("<td>").text(ticketLink)
                )
                $("tbody").append(newRow);
                $(".row").prepend("table");

                // var tableData = $("tbody")
                // tableData.append(newRow)
            };
        

            // $(".results > tbody").append(newRow);
            // $("#bdy").append(".results");

        }
        // $(".imageDiv").append(image);
        // $(".pure-form").append(".imageDiv");
        $("#eventName").val("");
    })

});