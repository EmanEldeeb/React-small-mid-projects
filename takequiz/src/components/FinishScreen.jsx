function FinishScreen({ scoure, totalScore, HighScore, dispatch }) {
  return (
    <>
      <p className="result">
        you scored {scoure} out of {totalScore}
      </p>
      <p className="highscore">HighScore:{HighScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
