function mainSearch() {

    $("#results").empty();

    var eventName = $("#eventName").val().trim();
    eventName = eventName.toLowerCase();
    var date = $("#date");
    var eventWhen = date.val();
    eventWhen = moment(eventWhen).format("MM-DD-YYYY");

    var eventWhere = $("#city").val().trim();
    eventWhere = eventWhere.toLowerCase();
    console.log("eventName: " + eventName);
    console.log("eventWhen: " + eventWhen);
    console.log("eventWhere: " + eventWhere);
    var queryURL = "https://api.seatgeek.com/2/events/?client_id=MTU4NDczMDN8MTU1MzEyNzc0Ny42OA&client_secret=dda067dbe95284017c0a01a3ef629be429e1fb11f9a8317ad3a8ea50ac4f6e58&q=" + eventName + "&per_page=100";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $('#results').html('<tbody></tbody>');

        var results = response.events;
        console.log(results.length);
        if (!results.length || !eventName) {
            $("#results").html("Your search has 0 results.  Please try again.");
            $("#eventName").val("");
            $("#date").val("");
            $("#city").val("");
            return;
        }

@@ -44,130 +46,161 @@ $("#submitbtn").on("click", function (evt) {
            var where = results[i].venue.display_location;

            var whereValidation = results[i].venue.city;
            whereValidation = whereValidation.toLowerCase();

            var when = results[i].datetime_local;
            when = moment(when).format("MM-DD-YYYY @ h:mm A");

            var whenValidation = moment(when).format("MM-DD-YYYY");
            console.log(whenValidation);
            var ticketLink = $("<a>");
            ticketLink.attr("href", results[i].url);
            var ticketImage = $("<img src = seatgeek.png>");
            ticketImage.addClass("seatgeek");
            ticketLink.html(ticketImage);

            if (eventMainTitle.indexOf(eventName) > -1 && whereValidation.indexOf(eventWhere) > -1 && whenValidation.indexOf(eventWhen) > -1) {
                console.log("if statement: " + whenValidation);
                var newRow = $("<tr>").append(
                    $("<td>").append(eventShortTitle),
                    $("<td>").append(where),
                    $("<td>").append(when),
                    $("<td>").append(ticketLink)
                )
                $('#results tbody').append(newRow);
            }

            else if (whenValidation.indexOf(eventWhen) > -1 && !eventWhere) {
                console.log("else when statement: " + whenValidation);
                var newRow = $("<tr>").append(
                    $("<td>").append(eventShortTitle),
                    $("<td>").append(where),
                    $("<td>").append(when),
                    $("<td>").append(ticketLink)
                )
                $('#results tbody').append(newRow);
            }
            else if (whereValidation.indexOf(eventWhere) > -1 && eventWhen === "Invalid date") {
                console.log("else where statement: " + whereValidation);
                var newRow = $("<tr>").append(
                    $("<td>").append(eventShortTitle),
                    $("<td>").append(where),
                    $("<td>").append(when),
                    $("<td>").append(ticketLink)
                )
                $('#results tbody').append(newRow);