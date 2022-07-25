/* INITIAL DATA */
//variável que vai armazenar a questão atual que vai ser exibida no momento
let currentQuestion = 0; //pois o array sempre começa do zero (ou seja, essa é a primeira questão)
let correctAnswers = 0;  //quantas respostas corretas foram dadas

showQuestion();

/* EVENTS */
//evento do botão de reset
document.querySelector(".scoreArea button").addEventListener("click", resetEvent);

/* FUNCTIONS */
//função que mostra a questão
function showQuestion() {
    //verificar se a current question existe
    if (questions[currentQuestion]) {
        //se existir, exibe (se não existir é porque ja acabaram as questões e não tem mais oque exibir)
        let q = questions[currentQuestion];

        //exibir a barra de progresso de acordo com a questão
        let pct = Math.floor((currentQuestion / questions.length) * 100)  //questão atual, dividido pelo total de questões, vezes 100
        //arredonda esse número para não dar problema com navegadores antigos, caso o número fique muito quebrado

        //agora que temos a porcentagem, devemos mudar a largura da barra de acordo com a porcentagem
        document.querySelector(".progress--bar").style.width = `${pct}%`;

        //para exibir, deve esconder a scorearea e mostrar a questionarea
        document.querySelector(".scoreArea").style.display = "none";  //só pra garantir que ela não seja exibiida
        document.querySelector(".questionArea").style.display = "block";

        //preenchendo a questionArea[question] com as informações do json (pergunta)
        document.querySelector(".question").innerHTML = q.question;

        //preencher as options com as alternativas
        let optionsHtml = "";
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
            //dentro da span (onde coloca-se o númeor da alternativa), aproveitamos o número do [i]
            //deve-se somar + 1, pois o i começa do zero
            //o parseint serve para transformar o i em inteiro (pois ele é uma string) e poder somar + 1 (para não começar do zero)
            //data-op serve para dizer que opção é essa (se é primeira, segunda ou etc) (visualemnete nada muda)
        };

        document.querySelector(".options").innerHTML = optionsHtml;

        //após adicionar os elementos na tela, eu preciso adicionar um evento de clique neles (para poder marcar a alternativa)
        document.querySelectorAll(".options .option").forEach(item => {
            item.addEventListener("click", optionClickEvent);
        });

    } else { //acabaram as questões
        finishQuiz();
    }
};

//função executada quando clica em uma das alternativas
function optionClickEvent(e) {
    //alternativa em que o usuário clicou:
    let clickedOption = parseInt(e.target.getAttribute("data-op"));
    //parseInt para transformar a string em inteiro o poder fazer a verificação

    //verificando se a alternativa que o usuário clicou foi a correta
    if (questions[currentQuestion].answer === clickedOption) { //se a resposta da questão atual é igual a aternativa clicada
        //a cada resposta correta, aumenta a variável correctAnswers
        correctAnswers++;
    } 

    //após responder a questão, deve aumentar o currentQuestion para poder passar para a próxima questão
    currentQuestion++;
    showQuestion();
};


//função que finaliza o quiz
function finishQuiz() {

    //preencher o score(precisa calcular a porcentagem de quantas questões acertou)
    let points = Math.floor((correctAnswers / questions.length) * 100) //respostas acertadas dividido pelo total de perguntas, vezes 100

    //modificando a área do score de acordo com a porcentagem de acertos

    if (points < 30) {
        document.querySelector(".scoreText1").innerHTML = `Tá ruim ein?!`;
        document.querySelector(".scorePct").style.color = "#F00";
    } else if (points >= 30 && points < 70) {
        document.querySelector(".scoreText1").innerHTML = `Muito bom!`;
        document.querySelector(".scorePct").style.color = "#FF0";
    } else if (points >= 70) {
        document.querySelector(".scoreText1").innerHTML = `Parabéns!`;
        document.querySelector(".scorePct").style.color = "#0D630D";
    }

    document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`;
    document.querySelector(".scoreText2").innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

    //esconde a área de questões e mostra a área de resultado
    document.querySelector(".scoreArea").style.display = "block"; 
    document.querySelector(".questionArea").style.display = "none";

    //completa a barra de progresso
    document.querySelector(".progress--bar").style.width = `100%`;
};

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
};