var questions = [{
    ques: "What Is Walt Disneys middle name?",
    ans: ["Edward", "Elias", "Edwin", "Elsa"],
    name: "midName",
    correct: "Elias",
    divClass: ".midName",
    giffy: "micky+mouse"
},
{
    ques: "In \"The Little Mermaid,\" who is NOT one of Triton’s daughter?",
    ans: ["Andrina", "Adora", "Attina", "Alana"],
    name: "littleMermaid",
    correct: "Adora",
    divClass: ".littleMermaid",
    giffy: "the+little+mermaid"
},
{
    ques: "In \"Aladdin,\" what is the name of Jasmine’s pet tiger?",
    ans: ["Rajah", "William", "Simba", "Spot"],
    name: "aladdin",
    correct: "Rajah",
    divClass: ".aladdin",
    giffy: "aladin"
},
{
    ques: "In \"Peter Pan\", Captain Hook had a hook on which one of his hands?",
    ans: ["Right", "Left", "Both", "None"],
    name: "peterpan",
    correct: "Left",
    divClass: ".peterpan",
    giffy: "peter+pan"
},
{
    ques: "In \"The Lion King\", where does Mufasa and his family live?",
    ans: ["The Cave", "Pride Rock", "The Valley", "The City"],
    name: "lionking",
    correct: "Pride Rock",
    divClass: ".lionking",
    giffy: "the+lion+king"
},
{
    ques: "In Beauty and the Beast, how many eggs does Gaston eat for breakfast?",
    ans: ["2 eggs", "1 Dozen", "5 Dozen", "8 Dozen"],
    name: "beutybeast",
    correct: "5 Dozen",
    divClass: ".beutybeast",
    giffy: "disney+beuty+and+the+beast+gaston"
},
{
    ques: "In The Sword in the Stone, what does Merlin call The Greatest Force on Earth?",
    ans: ["Knowledge", "Royalty", "The Sword", "Love"],
    name: "swordstone",
    correct: "Love",
    divClass: ".swordstone",
    giffy: "sword+in+the+stone"
},
{
    ques: "In \"Robin Hood\", what animal is Little John?",
    ans: ["Wolf", "Bear", "Fox", "Lion"],
    name: "robinhood",
    correct: "Bear",
    divClass: ".robinhood",
    giffy: "disney+robin+hood+little+john"
},
{
    ques: "Who does Pocahontas go to for advice?",
    ans: ["The river", "Nokoma", "Meeko", "Grandmother Willow"],
    name: "pocahontas",
    correct: "Grandmother Willow",
    divClass: ".pocahontas",
    giffy: "pocahontas+Grandmother+Willow"
},
{
    ques: "Who kills Tarzans family?",
    ans: ["Sabor", "Clayton", "Kerchak", "Tantor"],
    name: "tarzan",
    correct: "Sabor",
    divClass: ".tarzan",
    giffy: "disney+tarzan+sabor"
}
];

var j = 0;
var timer = 0;
var counter = 15;
var correct = 0;
var incorrect = 0;
var notguessed = 0;

// $('#intermissionScreen').hide();
// click to start then display quesions
var startGame = $("#start-btn").on('click', function() {
    $(this).parent().hide();
    questionDisplay(j);
});

var questionDisplay = function(j) {
    $('.questions').text('');
    $('#intermissionScreen').hide();
    $('.container').show();    

        $('.questions').prepend('<div class="' + questions[j].name + '"></div>');
        $(questions[j].divClass).append('<div class ="ques-title">' + questions[j].ques + '</div>');
        // loops through answers for each radio button
        for (var i = 0; i < 4; i++) {
            var answers = $("<div>");
            answers.addClass("answer");
            answers.attr("answervalue", questions[j].ans[i]);
            answers.text(questions[j].ans[i]);
            $(".questions").append(answers);
            console.log(questions[j].ans[i]);
        }
        countdown(counter);
    };  

    $(document).on("click", ".answer", function() {
        clearInterval(timer);
        if (questions[j].correct === $( this ).text()) {
            correct++;
            $("#ansResult").html("CORRECT!!");
            $("#correctGuess").html('');
        } else {
            incorrect++;
            $("#ansResult").html("NOPE!!");
            $("#correctGuess").html("The correct answer is: " + questions[j].correct);
        }
        console.log(correct);
        console.log(incorrect);
        console.log(questions[j].correct);
        console.log($( this ).text());
        intermission();
    });


    var countdown = function(seconds) {
        timer = setInterval(function() {
            if (seconds <= 0) {
                notguessed++;
                clearInterval(timer);
                intermission();
            } else {
                seconds--;
                console.log(seconds);
                $("#time-remain").html(seconds);
            }
        }, 1000)
    };
    
var intermission = function() {
    $('.container').hide();
    $("#correctScreen").html("Correct Answers: " + correct);
    $("#wrongScreen").html("Wrong Answers: " + incorrect);
    $("#ngScreen").html("Not Guessed: " + notguessed);
    // $("#correctGuess").html("The correct Guess is: " + questions[j].correct);
    $('#intermissionScreen').show();
    console.log("INTERMISSION");
    // stay for 3 seconds then move to questionDisplay
    $("#giffyHere").text('');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + questions[j].giffy + "&api_key=dc6zaTOxFJmzC&limit=1";
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log("RESPONSE", response);
        console.log("RESPONSE2", response.data["0"].embed_url);
        var imageGif = $("<iframe>");
        imageGif.attr("src", response.data["0"].embed_url);
        imageGif.attr("alt", questions[j].giffy);
        $("#giffyHere").html(imageGif);
    //    $("#giffyHere").html("<img src=\"" + response.embed_url + "\"></img>");
    });

    j++;
    if (j >= questions.length) {
        setTimeout(function() {
            finale();
            console.log("COMPLETE")
        }, 5000);
    } else {
        setTimeout(function() {
            counter = 15;
            questionDisplay(j) 
        }, 5000);
    }
}

var finale = function() {
    $('#intermissionScreen').hide();
    $('#finaleScreen').show();
    console.log("DONE")
}

  

