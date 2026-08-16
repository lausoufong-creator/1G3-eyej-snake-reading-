/* =========================
   Passage Audio
========================= */

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


/* =========================
   Read One Paragraph
========================= */

function readParagraph(index) {

  stopSpeech();

  const text = paragraphs[index];

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "zh-CN";
  utterance.rate = 0.85;
  utterance.pitch = 1;

  const translation =
    document.getElementById("translation" + index);

  const status =
    document.getElementById("readingStatus");

  if (translation) {
    translation.classList.remove("show");
  }

  status.textContent =
    "🔊 正在朗读第 " + (index + 1) + " 段……";

  utterance.onend = function () {

    if (translation) {
      translation.classList.add("show");
    }

    status.textContent =
      "✅ 第 " + (index + 1) + " 段朗读完成。";
  };

  window.speechSynthesis.speak(utterance);
}


/* =========================
   Read Entire Passage
========================= */

document
  .getElementById("readAllBtn")
  .addEventListener("click", function () {

    stopSpeech();

    const fullText = paragraphs.join(" ");

    const status =
      document.getElementById("readingStatus");

    status.textContent =
      "🔊 正在朗读全文……";

    const utterance =
      new SpeechSynthesisUtterance(fullText);

    utterance.lang = "zh-CN";
    utterance.rate = 0.85;
    utterance.pitch = 1;

    utterance.onend = function () {

      status.textContent =
        "✅ 全文朗读完成。你可以查看 Word Bank。";

      document
        .getElementById("wordBank")
        .scrollIntoView({
          behavior: "smooth"
        });
    };

    window.speechSynthesis.speak(utterance);
  });


/* =========================
   Stop Speech
========================= */

function stopSpeech() {

  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}


/* =========================
   Word Bank
========================= */

function showWord(chinese, pinyin, english) {

  stopSpeech();

  const display =
    document.getElementById("wordDisplay");

  display.innerHTML = `
    <div class="chinese">${chinese}</div>
    <div class="pinyin">${pinyin}</div>
    <div class="english">${english}</div>
  `;

  display.classList.add("show");

  const utterance =
    new SpeechSynthesisUtterance(chinese);

  utterance.lang = "zh-CN";
  utterance.rate = 0.75;

  window.speechSynthesis.speak(utterance);
}


/* =========================
   Check Answers
========================= */

document
  .getElementById("checkAnswersBtn")
  .addEventListener("click", function () {

    const q26 =
      document.querySelector(
        'input[name="q26"]:checked'
      );

    const q27 =
      document.querySelector(
        'input[name="q27"]:checked'
      );

    const q28 =
      document.querySelector(
        'input[name="q28"]:checked'
      );

    const feedback =
      document.getElementById("feedback");

    if (!q26 || !q27 || !q28) {

      feedback.textContent =
        "📖 请完成所有三道题目，再检查答案。";

      return;
    }


    let score = 0;

    if (q26.value === "C") {
      score++;
    }

    if (q27.value === "B") {
      score++;
    }

    if (q28.value === "B") {
      score++;
    }


    if (score === 3) {

      feedback.textContent =
        "🎉 太棒了！3 道题全部正确！你已经理解文章的主要内容。";

    } else if (score === 2) {

      feedback.textContent =
        "👍 很好！你答对了 2 道题。请回到文章找一找另一题的证据。";

    } else if (score === 1) {

      feedback.textContent =
        "💡 你答对了 1 道题。请回到文章，再读一读相关段落。";

    } else {

      feedback.textContent =
        "📚 请回到文章，找一找支持答案的证据，再试一次。";
    }

  });
