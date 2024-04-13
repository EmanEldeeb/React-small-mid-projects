import { useEffect, useReducer } from "react";
import Header from "./Header";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextQuestion from "./NextQuestion";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
const initialstate = {
  questions: [],
  chosedQuestionsNum: 0,
  status: "loading",
  index: 0,
  answer: null,
  scoure: 0,
  HighScore: +JSON.parse(localStorage.getItem("_HighScore")),
  totalScore: 0,
  quizTime: null,
};
const time_FOR_one_question = 20;
function Reducer(state, action) {
  switch (action.type) {
    case "dataredy":
      return { ...state, questions: action.payload, status: "ready" };
    case "fetcherror":
      return { ...state, status: "error" };
    case "startquiz":
      return {
        ...state,
        status: "active",
        quizTime:
          (state.chosedQuestionsNum || state.questions.length) *
          time_FOR_one_question,
      };
    case "giveAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        scoure:
          action.payload === question.correctOption
            ? state.scoure + question.points
            : state.scoure,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      if (state.scoure > state.HighScore) {
        localStorage.setItem("_HighScore", JSON.stringify(state.scoure));
      }
      return {
        ...state,
        status: "finish",
        HighScore:
          state.scoure > state.HighScore ? state.scoure : state.HighScore,
      };
    case "restart":
      return { ...initialstate, questions: state.questions, status: "ready" };
    case "timeupdate":
      return {
        ...state,
        quizTime: state.quizTime - 1,
        status: state.quizTime === 0 ? "finish" : state.status,
      };

    case "chosequestionLength":
      return {
        ...state,
        chosedQuestionsNum: action.payload,
      };
    case "setTotalScore":
      return { ...state, totalScore: action.payload };
    default:
      throw new Error("not vaild action");
  }
}
function Layout() {
  const [
    {
      status,
      questions,
      chosedQuestionsNum,
      index,
      answer,
      scoure,
      HighScore,
      quizTime,
      totalScore,
    },
    dispatch,
  ] = useReducer(Reducer, initialstate);

  useEffect(() => {
    fetch("http://localhost:1000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataredy", payload: data }))
      .catch((err) => dispatch({ type: "fetcherror" }));
  }, []);

  useEffect(() => {
    const total = questions.reduce((acc, cur, i) => {
      if (chosedQuestionsNum && chosedQuestionsNum - 1 < i) {
        return acc + 0;
      } else {
        return acc + cur.points;
      }
    }, 0);
    dispatch({ type: "setTotalScore", payload: total });
  }, [chosedQuestionsNum, questions]);

  return (
    <div className="app">
      <Header></Header>
      <main>
        {status === "error" && <Error></Error>}
        {status === "loading" && <Loader></Loader>}
        {status === "ready" && (
          <StartScreen
            questionsNum={questions.length}
            dispatch={dispatch}
            chosedQuestionsNum={chosedQuestionsNum}
          ></StartScreen>
        )}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              questionsNum={questions.length}
              scoure={scoure}
              answer={answer}
              chosedQuestionsNum={chosedQuestionsNum}
              totalScore={totalScore}
            ></ProgressBar>
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            ></Questions>
            <>
              <Timer quizTime={quizTime} dispatch={dispatch}></Timer>
              <NextQuestion
                answer={answer}
                dispatch={dispatch}
                index={index}
                questionsNum={questions.length}
                chosedQuestionsNum={chosedQuestionsNum}
              ></NextQuestion>
            </>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            dispatch={dispatch}
            scoure={scoure}
            totalScore={totalScore}
            HighScore={HighScore}
          ></FinishScreen>
        )}
      </main>
    </div>
  );
}

export default Layout;
