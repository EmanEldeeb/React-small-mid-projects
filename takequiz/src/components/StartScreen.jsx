function StartScreen({ questionsNum, dispatch, chosedQuestionsNum }) {
  return (
    <div className="start">
      <h1>Welcome to react quiz</h1>
      <h3>
        {!chosedQuestionsNum ? "start with default number " : ""}
        {chosedQuestionsNum || questionsNum} questions to test your react
        knowlage
      </h3>
      <div
        style={{
          display: "flex",
          fontSize: "14px",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <p>chose number to start with or start with default {questionsNum}</p>
        <select
          className="btn btn-ui"
          style={{ padding: "2px" }}
          value={chosedQuestionsNum === 0 ? -1 : chosedQuestionsNum}
          onChange={(e) => {
            console.log(e.target.value);
            dispatch({
              type: "chosequestionLength",
              payload: Number(e.target.value),
            });
          }}
        >
          {Array.from({ length: questionsNum }, (_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startquiz" })}
      >
        start quiz
      </button>
    </div>
  );
}

export default StartScreen;
