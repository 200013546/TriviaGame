    var questions = [{
        ques: "What Is Walt Disneys middle name?",
        ans: ["Edward", "Elias", "Edwin", "Elsa"],
        name: "midName",
        correct: "Elias",
        divClass: ".midName"
    },
    {
        ques: "In \"The Little Mermaid,\" who is NOT one of Triton’s daughter?",
        ans: ["Andrina", "Adora", "Attina", "Alana"],
        name: "littleMermaid",
        correct: "Adora",
        divClass: ".littleMermaid"
    },
    {
        ques: "In \"Aladdin,\" what is the name of Jasmine’s pet tiger?",
        ans: ["Rajah", "William", "Simba", "Spot"],
        name: "aladdin",
        correct: "Rajah",
        divClass: ".aladdin"
    },
    {
        ques: "In \"Peter Pan\", Captain Hook had a hook on which one of his hands?",
        ans: ["Right", "Left", "Both", "None"],
        name: "peterpan",
        correct: "Left",
        divClass: ".peterpan"
    },
    {
        ques: "In \"The Lion King\", where does Mufasa and his family live?",
        ans: ["The Cave", "Pride Rock", "The Valley", "The City"],
        name: "lionking",
        correct: "Pride Rock",
        divClass: ".lionking"
    },
    {
        ques: "In Beauty and the Beast, how many eggs does Gaston eat for breakfast?",
        ans: ["2 eggs", "1 Dozen", "5 Dozen", "8 Dozen"],
        name: "beutybeast",
        correct: "5 Dozen",
        divClass: ".beutybeast"
    },
    {
        ques: "In The Sword in the Stone, what does Merlin call The Greatest Force on Earth?",
        ans: ["Knowledge", "Royalty", "The Sword", "Love"],
        name: "swordstone",
        correct: "Love",
        divClass: ".swordstone"
    }
];

var labels = ["first", "second", "third", "forth"];

// click to start then display quesions
var startGame = $("#start-btn").on('click', function() {
    $(this).parent().hide();
    $('.container').show();
    countdown(120);
    // questionDisplay();
});

// function for displaying questions
var answerValue = '';
var questionDisplay = function(j) {
    $(".questions :not('#sub-but')").empty();
    // loops through the 10 questions 
    // for (var j = 0; j < 1; j++) {
        $('.questions').prepend('<div class="' + questions[j].name + '"></div>');
        $(questions[j].divClass).append('<div class ="ques-title">' + questions[j].ques + '</div>');
        // loops through answers for each radio button
        for (var i = 0; i <= 3; i++) {
            var answers = $("<div>");
            answers.addClass("answer");
            answers.attr("answerValue", questions[j].ans[i]);
            answers.text(questions[j].ans[i]);
            //    $(questions[j].divClass).append('<input type="radio"  name="' + questions[j].name + '" value="' + questions[j].ans[i] + '"/><label for="' + labels[i] + '">' + questions[j].ans[i] + '</label>');
            $(".questions").append(answers);
            console.log(questions[j].ans[i]);
            // countdown(120);
        }  
    // }  
            // EXIT here
/*            
            $(".answer").on("click", function() {
                var chosenValue = ($(this).attr("answerValue"));
                console.log(chosenValue);
                return;
              });
        $('.questions').prepend('<hr />');
    }
*/
}


// function for countdown timer
var countdown = function(seconds) {
    for (var i = 0; i < questions.length; i++) {


    questionDisplay(i);

    var timer = setInterval(function() {
        seconds = seconds - 1;
        $("#time-remain").html(seconds);
        if (seconds <= 0) {
            $('.container').fadeOut(500);
            var correctAnswers = 0;
            var wrongAnswers = 0;
            var unAnswered = 0;
/*
            // loop through correctArray & radioName to match html elements & answers
            for (var i = 0; i < questions.length; i++) {

                if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

                    correctAnswers++;
                    console.log("this is correct! number:" + i)
                } else {
                    wrongAnswers++;
                    console.log("this is wrong! number:" + i)
                };
            }
            $('#correctTimesUp').append(correctAnswers);
            // display wrongAnswers
            $('#wrongTimesUp').append(wrongAnswers);
            $('#timesUp').fadeIn(1000).show();
*/
            // alert("Times Up!");
                
            // clearInterval(timer);
            // return;
        }
        }, 1000);
            $('.answer').on('click', function() {
                console.log("DONE!");
                clearInterval(timer);
            })

    // click event for submit button to stop timer
    }
}; // end countdown


// function to grade quiz once submit button is clicked
var gradeQuiz = $('#sub-but').on('click', function() {

    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unAnswered = 0;

    // loop through correctArray & radioName to match html elements & answers
    for (var i = 0; i < questions.length; i++) {

        if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

            correctAnswers++;
        } else {
            wrongAnswers++;
        };
    };

    // once submit is clicked...
    // tests
    // stop timer
    countdown();
    // fade out questions
    $('.container').fadeOut();
    // show answerScreen
    $('#answerScreen').show();
    // display correctAnswers
    $('#correctScreen').append(correctAnswers);
    // display wrongAnswers
    $('#wrongScreen').append(wrongAnswers);

}); // end gradeQuiz