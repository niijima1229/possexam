'use strict';

{
  // 回答一覧
  const CORRECT_ANSWERS = [
    {
      index: 1,
      value: 'マレーシア'
    },
    {
      index: 1,
      value: '「自分史上最高」を仲間と'
    },
    {
      index: 2,
      value: '10分'
    },
    {
      index: 1,
      value: 'まきこ'
    },
    {
      index: 0,
      value: 'JADE'
    },
    {
      index: 1,
      value: 'ワークシフト'
    }
  ];

  // すべての問題を取得
  const allQuiz  = document.querySelectorAll('.js-quiz');

  // buttonタグにdisabledを付与
  const setDisabled = answers => {
    answers.forEach(answer => {
      answer.disabled = true;
    })
  }
  // trueかfalseで出力する文字列を出し分ける
  const setTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? '正解！' : '不正解...';
  }
  const setClassName = (target, isCorrect) => {
    target.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
  }

  let answeredTimes = 0;
  let correctedTimes = 0;

  // 各問題の中での処理
  allQuiz.forEach((quiz, quizIndex) => {
    const answers = quiz.querySelectorAll('.js-answer');
    const selectedQuiz = Number(quiz.getAttribute('data-quiz'));
    const answerBox = quiz.querySelector('.js-answerBox');
    const answerTitle = quiz.querySelector('.js-answerTitle');
    const answerText = quiz.querySelector('.js-answerText');

    answers.forEach(answer => {
      answer.addEventListener('click', () => {
        answer.classList.add('is-selected');
        const selectedAnswer = Number(answer.getAttribute('data-answer'));

        // 全てのボタンを非活性化
        setDisabled(answers);

        // 正解ならtrue, 不正解ならfalseをcheckCorrectに格納
        const isCorrect = CORRECT_ANSWERS[selectedQuiz].index === selectedAnswer;

		answeredTimes++;
		if (isCorrect) correctedTimes++;

        // 回答欄にテキストやclass名を付与
        answerText.innerText = CORRECT_ANSWERS[selectedQuiz].value;
        setTitle(answerTitle, isCorrect);
        setClassName(answerBox, isCorrect);

		if (answeredTimes == allQuiz.length) {
			document.getElementById('totalResult').innerHTML = `${allQuiz.length}問中${correctedTimes}問正解です！`
			if (answeredTimes == correctedTimes) {
				document.getElementById('totalResultNote').innerHTML = `あなたはPOSSEマスターです!`
			} else if (correctedTimes/answeredTimes > 0.5) {
				document.getElementById('totalResultNote').innerHTML = `あなたはかなりPOSSEに詳しいです!`
			} else {
				document.getElementById('totalResultNote').innerHTML = `あなたはPOSSEについてもっと知る必要があります!`
			}
			document.getElementById('totalResultBox').style.display = 'block'
		}
      })
    })
  })
}