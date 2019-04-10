window.onload = function(){

    var questionArea = $('#question')[0];
    var answerArea = $('#answers')[0];
    var current = 0;
    var cAnswers = 0;
    var iAnswers = 0;
    var questions = {
        'What is Bulmas last name?' : ['Pratt', 'Briefs', 'Boxers', 1],
        'In the Saiyan Saga how did Goku travel to King Kais Planet?' : ['Using Instant Transmission', 'Traveling along Snake Way', 'By making a wish with the Dragon Balls', 1],
        'What does Korin grow?' : ['Power-Up Carrots', 'Senzu Beans', 'Dragon Fruit', 1],
        'Where is the Capsule Corporation headquarters located?' : ['East City', 'Capsule Town', 'West City', 2],
        'Who is the leader of the Ginyu Force?' : ['Lance Corporal Levi', 'Commisioner Gordon', 'Captain Ginyu', 2],
        'If one minute has passed outside of the Hyperbolic Time Chamber, how much time has passed inside the chamber?' : ['One Year, One Day and One Minute', 'Thirty Minutes', 'Six Hours and Five Minutes', 2],
        'Where did Goku learn Instant Transmission?' : ['Planet Yardrat', 'King Kais Planet', 'Planet Namek', 0],
        'Whats Gokus wifes name?' : ['Chi Chi', 'Chy Chy', 'Cho Cho', 0]
    };
    var time = 30;
    var intervalId;
    var answers;
    var correctAnswer;

    $("#timeRem").html("&nbsp" + time + "&nbsp");

    function loadQuestion(curr){
        var question = Object.keys(questions)[curr];
        questionArea.innerHTML = '';
        questionArea.innerHTML = question;
    };

    function loadAnswers(curr){
        answers = questions[Object.keys(questions)[curr]];
        answerArea.innerHTML = '';
        for(var i = 0; i < answers.length -1; i++){
            var createDiv = document.createElement('div');
            var text = document.createTextNode(answers[i])
            createDiv.appendChild(text);
            createDiv.addEventListener('click', checkAnswer(i, answers));
            answerArea.appendChild(createDiv)
        }
    };

    function resetBtn(){
        var btn = `<input class="resetButton" type="button" value="Restart">`;
        $("#answers").append(btn);
    };

    $(document).on("click", ".resetButton", reset);
    

    function reset(){
        current = 0;
        cAnswers = 0;
        iAnswers = 0;
        time = 30;
        $("#timeRem").html("&nbsp" + time + "&nbsp");
        loadQuestion(current);
        loadAnswers(current);
        run();
        console.log("hello")
    };

    function checker(){
        if(current < Object.keys(questions).length - 1){
            current++;
            loadQuestion(current);
            loadAnswers(current);
            time = 30;
            $("#timeRem").html("&nbsp" + time + "&nbsp");
        }else{
            clearInterval(intervalId);
            $("#time").html('');
            questionArea.innerHTML = 'You Scored&nbsp' + percent() + '&nbsppercent!';
            answerArea.innerHTML = 'Correct:&nbsp' + cAnswers + '&nbspIncorrect:&nbsp' + iAnswers;
            resetBtn();
        }
    }

    function checkAnswer(i, arr){
        return function(){
            var givenAnswer = i;
            correctAnswer = arr[arr.length -1];

            if(givenAnswer === correctAnswer){
                cAnswers++;
                time =4;
                $("#question").html('Correct!!');
                answerArea.innerHTML ='';
                setTimeout(checker, 3000);
            }else{
                iAnswers++;
                time = 4;
                answerArea.innerHTML = answers[correctAnswer];
                $("#question").html('False! The correct answer is:');
                setTimeout(checker, 3000);
            }

        }
    };

    function percent (){
        return (cAnswers/Object.keys(questions).length) * 100;
    };

    function run(){
        intervalId = setInterval(decrement, 1000);
    };
  
    function decrement() {
        time--;
        $("#timeRem").html("&nbsp" + time + "&nbsp");
        if (time === 0) {
            iAnswers++;
            time = 4;
            $("#question").html('Time Out! The correct answer is:');
            answerArea.innerHTML = answers[answers[answers.length-1]];
            setTimeout(checker, 3000);
        };
    };

    loadQuestion(current);
    loadAnswers(current);
    run();



























}