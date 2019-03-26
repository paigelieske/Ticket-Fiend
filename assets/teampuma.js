$(".pure-button").on("click", function (event) {
    event.preventDefault();


    var ticketEvent = $("#name").val().trim();
    ticketEvent = ticketEvent.replace(/\s+/g, "-")
    console.log(ticketEvent)

    //Additional code for the jquery date selector dropdown
    var dateSelector = $("#dateselect").datepicker()

    var queryURL = 'https://api.seatgeek.com/2/events/?client_id=MTU4NDczMDN8MTU1MzEyNzc0Ny42OA&client_secret=dda067dbe95284017c0a01a3ef629be429e1fb11f9a8317ad3a8ea50ac4f6e58&performers.slug=' + ticketEvent;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.events;
        for (var i = 0; i < results.length; i++) {
            var eventTitle = $("<div>");
            var event = $("<p>").text(results[i].short_title);
            var where = $("<p>").text(results[i].venue.display_location);
            var when = $("<p>").text(results[i].datetime_local);
            var tickets = $("<a>").text(results[i].url);
            tickets.attr("href", results[i].url);
            // var image = $("<img>").attr("src", results[i].performers[i]);
            eventTitle.html(event);
            eventTitle.append(where);
            eventTitle.append(when);
            eventTitle.append(tickets);
            // eventTitle.append(image);
            $(".pure-form").append(eventTitle);
        }
    })
    // this is where i created a function to load my images
var Image; 
onload = function createImage() {
    // load images into this div and cycle thru 90 times
    for (var i = 1; i < 90; i++) {
    //    creating image in the div and loading url into it
        Image = $("<img>");
        url =  "assets/images/Golden_Tix_Idea/Falling_Tickets/Falling_Tickets_" + i + ".png";
        Image.attr("src", url);
        Image.attr("class", "animated");
        $("#animation").append(Image);
//    starting the animation function
    } startAnimation();
};


// this function cycles thru the animation and getting the children and loading it into the variable
function startAnimation() {
    var frames = document.getElementById("animation").children;
    var frameCount = frames.length;
    var i = 0;
    // this function is taking the frames and setting each one to display at the current time in the background image of the body
    setInterval(function () {
        // created a mod to start over each time it reaches the number of frames we loaded in
        frames[i % frameCount].style.display = "none";
        frames[++i % frameCount].style.display = "none";
        var bgimage = frames[i % frameCount].src;
        var UR = "url(" + bgimage + ")";
        $('#Bdy').css("background-image", UR); 
        
    }, 33.33333333333333);
}
});
