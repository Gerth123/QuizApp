let questions = [
    {
        "question": "Welcher Berg ist der höchste in den Alpen?",
        "answer_1": "Mont Blanc",
        "answer_2": "Matterhorn",
        "answer_3": "Großglockner",
        "answer_4": "Dolomiten",
        "right_answer": 1
    },
    {
        "question": "In welchem Land befindet sich der Nationalpark Plitvicer Seen?",
        "answer_1": "Italien",
        "answer_2": "Kroatien",
        "answer_3": "Schweiz",
        "answer_4": "Österreich",
        "right_answer": 2
    },
    {
        "question": "Welcher Wanderweg führt durch die Pyrenäen von Frankreich nach Spanien?",
        "answer_1": "Appalachian Trail",
        "answer_2": "Camino de Santiago",
        "answer_3": "GR20",
        "answer_4": "Tour du Mont Blanc",
        "right_answer": 2
    },
    {
        "question": "In welchem Land liegt der Berg Triglav, der höchste Gipfel der Julischen Alpen?",
        "answer_1": "Slowenien",
        "answer_2": "Kroatien",
        "answer_3": "Österreich",
        "answer_4": "Italien",
        "right_answer": 1
    },
    {
        "question": "Wie hoch ist der Berg Ben Nevis, der höchste Gipfel in Großbritannien?",
        "answer_1": "1,284 Meter",
        "answer_2": "1,344 Meter",
        "answer_3": "1,408 Meter",
        "answer_4": "1,512 Meter",
        "right_answer": 2
    },
    {
        "question": "Welches Gebirge erstreckt sich durch Norwegen, Schweden, Finnland und Russland?",
        "answer_1": "Karpaten",
        "answer_2": "Skanden",
        "answer_3": "Tatra",
        "answer_4": "Balkan",
        "right_answer": 2
    },
    {
        "question": "Welcher Berg ist der höchste in Schottland?",
        "answer_1": "Scafell Pike",
        "answer_2": "Snowdon",
        "answer_3": "Ben Macdui",
        "answer_4": "Ben Nevis",
        "right_answer": 4
    },
    {
        "question": "In welchem Land liegt der Nationalpark Hohe Tatra?",
        "answer_1": "Polen",
        "answer_2": "Slowakei",
        "answer_3": "Ungarn",
        "answer_4": "Tschechien",
        "right_answer": 2
    },
    {
        "question": "Welcher Wanderweg führt durch die italienischen Dolomiten?",
        "answer_1": "Tour du Mont Blanc",
        "answer_2": "Cinque Terre",
        "answer_3": "Alta Via 1",
        "answer_4": "GR20",
        "right_answer": 3
    },
    {
        "question": "Welcher Berg ist der höchste in Deutschland?",
        "answer_1": "Zugspitze",
        "answer_2": "Watzmann",
        "answer_3": "Feldberg",
        "answer_4": "Brocken",
        "right_answer": 1
    }
];

let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAILURE = new Audio('audio/failure.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    
    showQuestion();
}

function showQuestion() {
    if(gameIsOver()) {
        showEndscreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndscreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = `display: none`;

    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/trophy.png';
}

function updateProgressBar() {
    let percent = (currentQuestion + 1)  / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);

    let idOfRIghtAnswer = `answer_${question['right_answer']}`;

    if(rightAnswerSelected(selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRIghtAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAILURE.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber) {
    return selectedQuestionNumber == question['right_answer']
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();    
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = 'img/pencil.jpg';
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display: none';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
    


}