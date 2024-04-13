import { useEffect } from "react";

function Timer({ quizTime, dispatch }) {
  let min = Math.floor(quizTime / 60);
  let sec = Math.floor(quizTime % 60);
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timeupdate" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {min}:{sec}
    </div>
  );
}

export default Timer;
