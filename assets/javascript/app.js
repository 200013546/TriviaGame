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
    ans: ["Andrina", "Alana", "Attina", "Adora"],
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
    giffy: "aladin+rajah"
},
{
    ques: "In \"Peter Pan\", Captain Hook had a hook on which one of his hands?",
    ans: ["Right", "Left", "Both", "None"],
    name: "peterpan",
    correct: "Left",
    divClass: ".peterpan",
    giffy: "peter+pan+disney"
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
    ques: "In \"Beauty and the Beast\", how many eggs does Gaston eat for breakfast?",
    ans: ["2 eggs", "1 Dozen", "5 Dozen", "8 Dozen"],
    name: "beutybeast",
    correct: "5 Dozen",
    divClass: ".beutybeast",
    giffy: "beuty+and+the+beast+gaston+disney"
},
{
    ques: "In \"The Sword in the Stone\", what does Merlin call The Greatest Force on Earth?",
    ans: ["Knowledge", "Royalty", "The Sword", "Love"],
    name: "swordstone",
    correct: "Love",
    divClass: ".swordstone",
    giffy: "sword+in+the+stone+disney"
},
{
    ques: "In \"Robin Hood\", what animal is Little John?",
    ans: ["Wolf", "Fox", "Bear", "Lion"],
    name: "robinhood",
    correct: "Bear",
    divClass: ".robinhood",
    giffy: "robin+hood+little+john+disney"
},
{
    ques: "Who does \"Pocahontas\" go to for advice?",
    ans: ["The river", "Nokoma", "Meeko", "Grandmother Willow"],
    name: "pocahontas",
    correct: "Grandmother Willow",
    divClass: ".pocahontas",
    giffy: "pocahontas+Grandmother+Willow+disney"
},
{
    ques: "Who killed \"Tarzans\" family?",
    ans: ["Sabor", "Clayton", "Kerchak", "Tantor"],
    name: "tarzan",
    correct: "Sabor",
    divClass: ".tarzan",
    giffy: "tarzan+sabor+disney"
}
];

var j = 0;
var timer = 0;
var counter = 10;
var correct = 0;
var incorrect = 0;
var notguessed = 0;

// click to start then display quesions
var startGame = $("#start-btn").on('click', function () {
    $(this).parent().hide();
    questionDisplay(j);
});

// Show questions and answers here
var questionDisplay = function (j) {

    // Clear old question
    $('.questions').text('');

    // hide intermission
    $('#intermissionScreen').hide();

    // Now show question screen
    $('.container').show();

    // build answers here
    $('.questions').prepend('<div class="' + questions[j].name + '"></div>');
    $(questions[j].divClass).append('<div class ="ques-title">' + questions[j].ques + '</div>');
    // loops through answers for each radio button
    for (var i = 0; i < 4; i++) {
        var answers = $("<div>");
        answers.addClass("answer");
        answers.attr("answervalue", questions[j].ans[i]);
        answers.text(questions[j].ans[i]);
        $(".questions").append(answers);
    }
    countdown(counter);
};

// Wait for response to question here
$(document).on("click", ".answer", function () {
    clearInterval(timer);
    if (questions[j].correct === $(this).text()) {
        correct++;
        $("#ansResult").html("CORRECT!!");
        $("#correctGuess").html('');
    } else {
        incorrect++;
        $("#ansResult").html("NOPE!!");
        $("#correctGuess").html("The correct answer is: " + questions[j].correct);
    }
    intermission();
});

// Set interval here
var countdown = function (seconds) {
    timer = setInterval(function () {
        if (seconds <= 0) {
            notguessed++;
            $("#ansResult").html("TIMES UP!!");
            $("#correctGuess").html("The correct answer is: " + questions[j].correct);
            clearInterval(timer);
            intermission();
        } else {
            seconds--;
            $("#time-remain").html(seconds);
        }
    }, 1000)
};


// Intermission here - show score, right answer, and little video    
var intermission = function () {
    $('.container').hide();
    $(".correctScreen").html("Correct Answers: " + correct);
    $(".wrongScreen").html("Wrong Answers: " + incorrect);
    $(".ngScreen").html("Not Guessed: " + notguessed);

    // $("#correctGuess").html("The correct Guess is: " + questions[j].correct);
    $('#intermissionScreen').show();

    // stay for 5 seconds then move to questionDisplay
    $("#giffyHere").text('');
    // var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" + questions[j].giffy + "&rating=pg&api_key=dc6zaTOxFJmzC&limit=1";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + questions[j].giffy + "&rating=pg&api_key=dc6zaTOxFJmzC&limit=10";
    console.log("question1 ", j);
    console.log(queryURL);

    // Give a random gif based on search criteria
    var gifnum = Math.floor(Math.random() * 10);

    // Use giphy to insert a short video
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("question2 ", j);
        console.log("RESPONSE", response);
        console.log("RESPONSE2", response.data[gifnum].embed_url);
        var imageGif = $("<iframe>");
        imageGif.attr("src", response.data[gifnum].embed_url);
        // imageGif.attr("alt", questions[j].giffy);
        $("#giffyHere").html(imageGif);
        //    $("#giffyHere").html("<img src=\"" + response.embed_url + "\"></img>");
    });

    j++;
    if (j >= questions.length) {
        setTimeout(function () {
            finale();
        }, 5000);
    } else {
        setTimeout(function () {
            counter = 10;
            questionDisplay(j)
        }, 5000);
    }
}

var finale = function () {
    $('#intermissionScreen').hide();
    $('#answerScreen').show();
    // $('.container').hide();
    if (correct > 9) {
        var congrats = 'PERFECT!!!';
    } else if (correct > 7) {
        var congrats = 'Great Job!!';
    } else if (correct > 5) {
        var congrats = 'Good Job!!';
    } else if (correct > 2) {
        var congrats = 'Better Luck next time!!';
    } else {
        var congrats = 'Hmm, Try again!!';
    }
    $(".congrats").html(congrats);
    $(".correctScreen").html("Correct Answers: " + correct);
    $(".wrongScreen").html("Wrong Answers: " + incorrect);
    $(".ngScreen").html("Not Guessed: " + notguessed);

}



