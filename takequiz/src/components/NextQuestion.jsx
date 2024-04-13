function NextQuestion({
  answer,
  dispatch,
  index,
  questionsNum,
  chosedQuestionsNum,
}) {
  if (answer === null) return;

  if (index < (chosedQuestionsNum || questionsNum) - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        next
      </button>
    );

  if (index === (chosedQuestionsNum || questionsNum) - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        finish quiz
      </button>
    );
}

export default NextQuestion;
