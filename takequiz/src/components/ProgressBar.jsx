function ProgressBar({
  index,
  questionsNum,
  scoure,
  answer,
  chosedQuestionsNum,
  totalScore,
}) {
  return (
    <header className="progress">
      <progress
        max={chosedQuestionsNum || questionsNum}
        value={answer !== null ? index + 1 : index}
      ></progress>
      <p>
        Question{index + 1}/{chosedQuestionsNum || questionsNum}
      </p>
      <p>
        {scoure}/{totalScore}Points
      </p>
    </header>
  );
}

export default ProgressBar;
