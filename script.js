/* =====================================================
   1G3 眼镜蛇 Interactive Reading
   Interactive Reading + Word Bank + 2 Attempts
===================================================== */


/* =====================================================
   PARAGRAPH READING
===================================================== */

const paragraphs = [
  `一天，有一位太太请客。大家围着桌子坐着，一面吃喝，一面说笑。
   忽然女主人把女佣叫来，低声吩咐了几句话。
   女佣听了脸色发白，急忙跑了出去。`,

  `不一会儿，女佣端了一碗热牛奶，匆匆穿过客厅，把牛奶放在了阳台上。
   客人们都觉得奇怪，可是女主人仍然有说有笑。
   又过了一会儿，女佣把阳台的门紧紧关住，大声地吐了一口气。
   女主人说：“好了，现在大家都安全了。”`,

  `客人们问女主人到底是怎么回事。
   她说：“刚才我们桌子底下有一条眼镜蛇，不过，我现在已经把它关在门外了。”`,

  `客人们都吓了一跳。
   女主人说：“眼镜蛇来的时候，我不敢惊动它，也不敢告诉你们，只好假装没有事。
   因为眼镜蛇最喜欢喝牛奶，所以我让女佣把一碗热牛奶放在阳台上。
   它一闻到牛奶味，就会跟去。
   女佣看见眼镜蛇到阳台上去喝牛奶了，就马上把门关起来了。”`,

  `一位客人说：“你怎么知道眼镜蛇就在我们桌子底下的？”
   她说：“我能不知道吗？眼镜蛇就盘在我的脚上呀！”`,

  `另一位客人说：“你为什么不喊我们帮忙呢？”
   她说：“我一喊，你们必定会慌乱起来。
   大家一动，蛇受了惊，只要咬一口，我的命就完了。”`
];


/* =====================================================
   READ ONE PARAGRAPH
===================================================== */

function readParagraph(index) {

  if (!paragraphs[index]) return;

  const text = paragraphs[index];

  speakChinese(text);

  const status = document.getElementById("readingStatus");

  if (status) {
    status.textContent = `🔊 正在朗读第 ${index + 1} 段……`;
  }

  /* 朗读结束后显示英文翻译 */

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "zh-CN";
  utterance.rate = 0.85;

  utterance.onend = function () {

    if (status) {
      status.textContent = `✅ 第 ${index + 1} 段朗读完成。`;
    }

    const translation =
      document.getElementById(`translation${index}`);

    if (translation) {
      translation.classList.add("show-translation");
    }

  };

  speechSynthesis.speak(utterance);
}


/* =====================================================
   SPEAK CHINESE
===================================================== */

function speakChinese(text) {

  speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.lang = "zh-CN";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  speechSynthesis.speak(utterance);
}


/* =====================================================
   READ ALL
===================================================== */

function readAllParagraphs() {

  let index = 0;

  const status =
    document.getElementById("readingStatus");

  function readNext() {

    if (index >= paragraphs.length) {

      if (status) {
        status.textContent =
          "✅ 全文朗读完成！现在可以查看 Word Bank。";
      }

      return;
    }

    if (status) {
      status.textContent =
        `🔊 正在朗读第 ${index + 1} 段……`;
    }

    const utterance =
      new SpeechSynthesisUtterance(paragraphs[index]);

    utterance.lang = "zh-CN";
    utterance.rate = 0.85;

    utterance.onend = function () {

      const translation =
        document.getElementById(
          `translation${index}`
        );

      if (translation) {
        translation.classList.add(
          "show-translation"
        );
      }

      index++;

      setTimeout(readNext, 300);
    };

    speechSynthesis.speak(utterance);
  }

  speechSynthesis.cancel();

  readNext();
}


/* =====================================================
   FULL READING BUTTON
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const readAllBtn =
    document.getElementById("readAllBtn");

  if (readAllBtn) {

    readAllBtn.addEventListener(
      "click",
      readAllParagraphs
    );

  }

});


/* =====================================================
   WORD BANK
===================================================== */

function showWord(word, pinyin, meaning) {

  const display =
    document.getElementById("wordDisplay");

  if (!display) return;


  display.innerHTML = `

    <div class="word-result">

      <div class="word-result-chinese">
        ${word}
      </div>

      <div class="word-result-pinyin">
        ${pinyin}
      </div>

      <div class="word-result-meaning">
        ${meaning}
      </div>

      <button
        class="word-audio-btn"
        onclick="speakChinese('${word}')">

        🔊 听读音

      </button>

    </div>

  `;


  /* 自动朗读词语 */

  speakChinese(word);
}


/* =====================================================
   CHECK MY UNDERSTANDING
   EACH QUESTION HAS 2 ATTEMPTS
===================================================== */


/*
   正确答案

   Q1 = C
   Q2 = B
   Q3 = B
*/

const questionData = {

  q1: {
    name: "q26",
    correct: "C",

    hint:
      "💡 Hint：回到第四段，看看女主人为什么要把热牛奶放在阳台。她想让谁跟着牛奶的味道走？",

    answer:
      "C. 引眼镜蛇到阳台",

    explanation:
      "📖 文章中的证据：眼镜蛇喜欢喝牛奶，所以女主人让女佣把热牛奶放在阳台，引眼镜蛇到阳台。"
  },


  q2: {
    name: "q27",
    correct: "B",

    hint:
      "💡 Hint：回到第四段，看看女佣看到眼镜蛇去了哪里以后，马上做了什么？",

    answer:
      "B. 眼镜蛇到了阳台",

    explanation:
      "📖 文章中的证据：女佣看见眼镜蛇到阳台上去喝牛奶了，就马上把门关起来了。"
  },


  q3: {
    name: "q28",
    correct: "B",

    hint:
      "💡 Hint：回到第六段，想一想，如果大家一起慌乱和移动，蛇可能会发生什么？",

    answer:
      "B. 怕大家慌乱，蛇会咬人",

    explanation:
      "📖 文章中的证据：女主人担心大家慌乱起来，大家一动，蛇受了惊，可能会咬人。"
  }

};


/* =====================================================
   ATTEMPT COUNTER

   每一道题独立计算
===================================================== */

const attempts = {

  q1: 0,
  q2: 0,
  q3: 0

};


/* =====================================================
   QUESTION STATUS
===================================================== */

const questionStatus = {

  q1: "unanswered",
  q2: "unanswered",
  q3: "unanswered"

};


/* =====================================================
   GET SELECTED ANSWER
===================================================== */

function getSelectedAnswer(questionName) {

  const selected =
    document.querySelector(
      `input[name="${questionName}"]:checked`
    );

  if (!selected) {
    return null;
  }

  return selected.value;
}


/* =====================================================
   DISABLE QUESTION
===================================================== */

function disableQuestion(questionName) {

  const radios =
    document.querySelectorAll(
      `input[name="${questionName}"]`
    );

  radios.forEach(function (radio) {

    radio.disabled = true;

  });

}


/* =====================================================
   CHECK ONE QUESTION
===================================================== */

function checkQuestion(questionKey) {

  const data =
    questionData[questionKey];

  const selected =
    getSelectedAnswer(data.name);

  const feedback =
    document.getElementById(
      `feedback-${questionKey}`
    );


  /* -----------------------------------------
     没有选择答案
  ----------------------------------------- */

  if (!selected) {

    feedback.innerHTML = `

      <div class="feedback-warning">

        ⚠️ 请先选择一个答案。

      </div>

    `;

    return;

  }


  /* -----------------------------------------
     如果已经完成，不再计算
  ----------------------------------------- */

  if (
    questionStatus[questionKey] === "correct" ||
    questionStatus[questionKey] === "completed"
  ) {

    return;

  }


  /* -----------------------------------------
     增加尝试次数
  ----------------------------------------- */

  attempts[questionKey]++;

  const currentAttempt =
    attempts[questionKey];


  /* =================================================
     ANSWER CORRECT
  ================================================= */

  if (selected === data.correct) {

    questionStatus[questionKey] = "correct";


    feedback.innerHTML = `

      <div class="feedback-correct">

        <strong>✅ 答对了！很好！</strong>

        <br><br>

        你用了
        <strong>第 ${currentAttempt} 次</strong>
        尝试答对。

      </div>

    `;


    /* 答对后不能再修改 */

    disableQuestion(data.name);

    return;

  }


  /* =================================================
     FIRST ATTEMPT WRONG
  ================================================= */

  if (currentAttempt === 1) {

    questionStatus[questionKey] =
      "try-again";


    feedback.innerHTML = `

      <div class="feedback-hint">

        <strong>❌ 这一次还不正确。</strong>

        <br><br>

        你目前用了：
        <strong>1 / 2 次</strong>

        <br><br>

        ${data.hint}

        <br><br>

        👉 请回到文章寻找证据，
        <strong>再尝试一次！</strong>

      </div>

    `;

    return;

  }


  /* =================================================
     SECOND ATTEMPT WRONG
  ================================================= */

  if (currentAttempt === 2) {

    questionStatus[questionKey] =
      "completed";


    feedback.innerHTML = `

      <div class="feedback-final">

        <strong>❌ 第二次还是不正确。</strong>

        <br><br>

        你已经用了
        <strong>2 / 2 次</strong>
        尝试。

        <hr>

        <strong>✅ 正确答案：</strong>

        <br>

        ${data.answer}

        <br><br>

        <strong>🔎 为什么？</strong>

        <br>

        ${data.explanation}

      </div>

    `;


    /* 第二次后不能再修改 */

    disableQuestion(data.name);

  }

}


/* =====================================================
   CHECK ALL THREE QUESTIONS
===================================================== */

function checkAllAnswers() {

  checkQuestion("q1");

  checkQuestion("q2");

  checkQuestion("q3");


  /* 更新整体答题情况 */

  updateOverallStatus();

}


/* =====================================================
   OVERALL STATUS
===================================================== */

function updateOverallStatus() {

  const feedback =
    document.getElementById("feedback");

  if (!feedback) return;


  let q1Status = getStatusText("q1");
  let q2Status = getStatusText("q2");
  let q3Status = getStatusText("q3");


  feedback.innerHTML = `

    <div class="overall-feedback">

      <h3>📊 我的答题情况</h3>

      <p>
        <strong>Q1：</strong>
        ${q1Status}
      </p>

      <p>
        <strong>Q2：</strong>
        ${q2Status}
      </p>

      <p>
        <strong>Q3：</strong>
        ${q3Status}
      </p>

    </div>

  `;

}


/* =====================================================
   GET QUESTION STATUS TEXT
===================================================== */

function getStatusText(questionKey) {

  const status =
    questionStatus[questionKey];

  const attempt =
    attempts[questionKey];


  if (status === "correct") {

    return `✅ 答对了！（第 ${attempt} 次）`;

  }


  if (status === "try-again") {

    return `💡 第一次答错，等待第 2 次尝试`;

  }


  if (status === "completed") {

    return `❌ 两次都没有答对`;

  }


  return "⏳ 尚未作答";

}


/* =====================================================
   CHECK ANSWERS BUTTON
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const button =
    document.getElementById(
      "checkAnswersBtn"
    );


  if (button) {

    button.addEventListener(
      "click",
      checkAllAnswers
    );

  }

});
