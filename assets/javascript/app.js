$(document).ready(function () {

    const defaultQuestionTime = 30;
    const defaultRandomGenerator = 100;
    const defaultGameQuestions = 10;
    const defaultTimeOut = 4000;
    var currentTime;
    var questionTimer;
    var resultTimeOut;
    var questions = [];
    var currentQuestion = {};
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var timeOutAnswers = 0;

    $('#start').on("click", startHandler);
    $('#startOver').on('click', initState);

    initState();

    function initState() {
        cleanInitDivs();
        $('#startContent').show();
    };

    function start() {
        currentTime = defaultQuestionTime;
        currentQuestion = {};
        correctAnswers = 0;
        wrongAnswers = 0;
        timeOutAnswers = 0;
        var array = createQuestions().questions;
        questions = sortArray(array).slice(array.length - defaultGameQuestions);
        initDisplay();
    }

    function startHandler() {
        $('#startContent').hide();
        start();
    }

    function cleanInitDivs() {
        $('#triviaContent').hide();
        $('#questionResultContent').hide();
        $('#endResultContent').hide();
    }

    function deleteQuestionFromArray(id) {
        return questions.filter(elem => {
            return elem.id !== id;
        });
    }

    function initDisplay() {
        getNextQuestion();
        drawQuestion(currentQuestion);
        modifyDisplay(defaultQuestionTime);
    }

    function getNextQuestion() {
        clearTimeout(resultTimeOut);
        currentQuestion = questions[0];
        questions = deleteQuestionFromArray(currentQuestion.id);
    }

    function drawQuestion(question) {
        $('#triviaContent').show();
        stopQuestionTimer();
        questionTimer = setInterval(questionTimerHandler, 1000);
        var answers = sortArray(question.answers);
        $('#questionContent').text(question.question);
        drawAnswers(answers);
    }

    function drawAnswers(answers) {
        answers.forEach((answer, index) => {
            var button = $(`#answer${index + 1}`);
            $(button).text(answer);
            $(button).unbind("click");
            $(button).bind('click', handleAnswerClick);
        });
    }

    function handleAnswerClick() {
        var response = $(this).text();
        commonTimerEndActions();
        var resultStatus = response === currentQuestion.correctAnswer
            ? 'correct' : 'wrong';
        drawQuestionResult(resultStatus);
    }

    function drawQuestionResult(resultStatus) {
        $('#triviaContent').hide();
        $('#questionResultContent').show();
        switch (resultStatus) {
            case 'correct':
                correctAnswers++;
                $('#answerResult').text('Correct Answer!')
                $('#imgResult').attr('src', `assets/images/${currentQuestion.image}`)
                break;
            case 'wrong':
                wrongAnswers++;
                $('#answerResult').text('Wrong Answer!');
                $('#imgResult').attr('src', 'assets/images/loose.gif');
                break;
            case 'timeout':
                timeOutAnswers++;
                console.log('Timeout answers:', timeOutAnswers);
                $('#answerResult').text('Out of time!');
                $('#imgResult').attr('src', 'assets/images/outTime.gif');
                break;
        }

        clearTimeout(resultTimeOut);
        resultTimeOut = setTimeout(timeoutHandler, defaultTimeOut);
    }

    function timeoutHandler() {
        $('#questionResultContent').hide();
        if (questions.length > 0) {
            getNextQuestion();
            drawQuestion(currentQuestion);
        } else {
            clearTimeout(resultTimeOut);
            drawEndResults();
        }
    }

    function drawEndResults() {
        $('#endResultContent').show();
        $('#correctCounter').text(`Correct answers: ${correctAnswers}`);
        $('#incorrectCounter').text(`Wrong answers: ${wrongAnswers}`);
        $('#timeOutCounter').text(`Unanswered: ${timeOutAnswers}`);
    }

    function modifyDisplay(currentTime) {
        $('#displayTime').text(`Time Remaining: ${currentTime} seconds`);
    }

    function sortArray(array) {
        var id = 0;
        var randomArray = array.map(() => {
            const randomNumber = Math.floor(Math.random() * defaultRandomGenerator);
            return {
                randomNumber: randomNumber,
                id: id++
            };
        });

        var sortedArray = randomArray.sort((elem1, elem2) => {
            return elem1.randomNumber - elem2.randomNumber;
        });

        return sortedArray.map(elem => {
            return array[elem.id];
        });
    }

    function createQuestions() {
        return {
            questions: [
                {
                    id: 1,
                    question: `Deity of ancient Mexico known as the "Feathered Serpent":`,
                    correctAnswer: `Quetzalcóatl`,
                    answers: ['Quetzalcóatl', 'Tlaloc', 'Mixcóatl', 'Cuauhtémoc'],
                    image: 'quetzalcoatl.jpg'
                },
                {
                    id: 2,
                    question: `Where are the pyramids of the Sun and the Moon?`,
                    correctAnswer: `Teotihuacan`,
                    answers: ['Teotihuacan', 'Tulum', 'Chichen-Itza', 'Main Temple'],
                    image: 'teotihuacan.jpg'
                },
                {
                    id: 3,
                    question: `Year in which the Spaniards conquered Mexico-Tenochtitlán:`,
                    correctAnswer: `1521`,
                    answers: ['1521', '1520', '1522', '1523'],
                    image: 'conquista.jpg'
                },
                {
                    id: 4,
                    question: `Name of Mexico during the colonial period:`,
                    correctAnswer: `New Spain`,
                    answers: ['New Spain', 'New Mexico', 'Mexico', 'Mejico'],
                    image: 'newspain.jpg'
                },
                {
                    id: 5,
                    question: `Name of the last Mexica emperor, whom the conquistadors tortured burning his feet:`,
                    correctAnswer: `Cuauhtémoc`,
                    answers: ['Cuauhtémoc', 'Moctezuma', 'Moctezuma II', 'Cuitlahuac'],
                    image: 'cuahutemoc.jpg'
                },
                {
                    id: 6,
                    question: `The highest civil authority in New Spain was:`,
                    correctAnswer: `Viceroy`,
                    answers: ['Viceroy', 'King', 'Emperor', 'President'],
                    image: 'viceroy.jpg'
                },
                {
                    id: 7,
                    question: `In wich olympic games Mexico won the gold medal in soccer?`,
                    correctAnswer: `London 2012`,
                    answers: ['London 2012', 'Mexico 1970', 'Spain 1982', 'Atlanta 1996'],
                    image: 'gold.jpg'
                },
                {
                    id: 8,
                    question: `The Mexican Independence struggle began in:`,
                    correctAnswer: `1810 `,
                    answers: ['1810 ', '1811', '1825', '1910'],
                    image: 'mexico2.jpg'
                },
                {
                    id: 9,
                    question: `Mexico lost half of its territory as a result of the confrontation with:`,
                    correctAnswer: `United States of America`,
                    answers: ['United States of America', 'France', 'England', 'Germany'],
                    image: 'lostusa.jpg'
                },
                {
                    id: 10,
                    question: `The War of Reform was between:`,
                    correctAnswer: `Liberals and conservatives`,
                    answers: ['Liberals and conservatives', 'America and Chivas', 'PRI and PAN', 'Mexicas and Spaniards'],
                    image: 'libsconservs.jpg'
                },
                {
                    id: 11,
                    question: `Name of the agrarian leader who headed the Mexican Revolution in the state of Morelos:`,
                    correctAnswer: `Emiliano Zapata`,
                    answers: ['Emiliano Zapata', 'Francisco Villa', 'Porfirio Díaz', 'Alvaro Obregón'],
                    image: 'zapata.jpg'
                },
                {
                    id: 12,
                    question: `The slogan "Effective suffrage, no reelection" was the political banner of:`,
                    correctAnswer: `Francisco I. Madero`,
                    answers: ['Francisco I. Madero', 'Emiliano Zapata', 'Benito Juarez', 'Porfirio Díaz'],
                    image: 'madero.jpg'
                },
                {
                    id: 13,
                    question: `The "Adelitas" accompanied their men to combat in:`,
                    correctAnswer: `The Revolution`,
                    answers: ['The Revolution', 'The Independence', 'Chapultepec War', 'The Pastry War'],
                    image: 'adelitas.png'
                },
                {
                    id: 14,
                    question: `Representative of Mexican muralism:`,
                    correctAnswer: `Diego Rivera`,
                    answers: ['Diego Rivera', 'Frida Kahlo', 'Dr. Atl', 'María Izquierdo'],
                    image: 'rivera.jpg'
                },
                {
                    id: 15,
                    question: `Name of the political party that governed for seven decades in the 20th century:`,
                    correctAnswer: `PRI`,
                    answers: ['PRI', 'PAN', 'PRD', 'Morena'],
                    image: 'pri.png'
                },
                {
                    id: 16,
                    question: `In what international armed conflict did the "201 Squadron" participate?`,
                    correctAnswer: `Second World War`,
                    answers: ['Second World War', 'Mexican Revolution', 'Mexican Independence', 'First World War'],
                    image: 'escuadron.jpg'
                },
                {
                    id: 17,
                    question: `Mexico has borders with:`,
                    correctAnswer: `USA, Guatemala, Belice`,
                    answers: ['USA, Guatemala, Belice', 'Belice, Salvador, Cuba', 'USA, Canada', 'USA, Cuba'],
                    image: 'borders.jpeg'
                },
                {
                    id: 18,
                    question: `The state of the Republic with greater territorial extension is:`,
                    correctAnswer: `Chihuahua`,
                    answers: ['Chihuahua', 'Chiapas', 'CDMX', 'Sonora'],
                    image: 'chihuahua.jpg'
                },
                {
                    id: 19,
                    question: `In what state of the Republic are the ruins of Palenque?`,
                    correctAnswer: `Chiapas`,
                    answers: ['Chiapas', 'Chihuahua', 'Sonora', 'Oaxaca'],
                    image: 'chiapas.jpg'
                },
                {
                    id: 20,
                    question: `With which countries did Mexico celebrate the trade known as NAFTA?`,
                    correctAnswer: `USA and Canada`,
                    answers: ['USA and Canada', 'Colombia, Argentina', 'Venezuela and Cuba', 'Canada'],
                    image: 'nafta.jpg'
                }
            ]
        }
    }

    function questionTimerHandler() {
        currentTime--;
        modifyDisplay(currentTime);
        if (currentTime < 0) {
            commonTimerEndActions();
            drawQuestionResult('timeout');
        }
    }

    function commonTimerEndActions() {
        stopQuestionTimer();
        currentTime = defaultQuestionTime;
        modifyDisplay(currentTime);
    }

    function stopQuestionTimer() {
        clearInterval(questionTimer);
    }

});

