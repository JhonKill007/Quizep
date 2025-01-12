import React, { useState } from "react";
import Question from "./components/Json/questions.json";

const App = () => {
  const [resultPoints, setResultPoints] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questionWrong, setQuestionWrong] = useState<any[]>([]);
  const [answering, setAnswering] = useState<boolean>(false);
  const [answer, setAnswer] = useState<boolean>(false);
  const [question, setQuestion] = useState<any>();
  const [review, setReview] = useState<boolean>(false);

  const getRandomIndices = (questionLength: any, indexCount: any) => {
    if (indexCount > questionLength) {
      console.error(
        "El número de elementos solicitados es mayor que los disponibles."
      );
      return [];
    }

    const indices = new Set();
    while (indices.size < indexCount) {
      const randomIndex = Math.floor(Math.random() * questionLength);
      indices.add(randomIndex);
    }

    return Array.from(indices);
  };

  const randomQuestions = getRandomIndices(Question.length, 30).map(
    (index: any) => Question[index]
  );

  const getLettle = (index: number) => {
    switch (index) {
      case 0:
        return "A: ";
      case 1:
        return "B: ";
      case 2:
        return "C: ";
      case 3:
        return "D: ";
    }
  };

  const getAnswer = (answer: boolean, question: any) => {
    setAnswering(true);
    setAnswer(answer);
    setQuestion(question);
    if (answer) {
      setResultPoints(resultPoints + 3.33333);
    } else {
      setQuestionWrong((prevQuestion) => [...prevQuestion, question]);
    }
  };

  const getStyledPoints = (points: number) => {
    let color = "red";

    if (points >= 70 && points < 80) {
      color = "orange";
    } else if (points >= 80 && points < 90) {
      color = "blue";
    } else if (points >= 90) {
      color = "green";
    }

    return (
      <h5
        style={{
          fontWeight: "bold",
          color: color,
          textAlign: "center",
        }}
      >
        {points} puntos
      </h5>
    );
  };

  const shuffleArray = (array: any) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const decimalToIntegerParse = (decimal: number) => {
    return parseInt(decimal.toString());
  };

  return (
    <div
      style={{
        // width: "80%",
        margin: "auto",
        padding: "20px",
      }}
      className="col-md-10"
    >
      <h1 style={{ textAlign: "center" }}>Quizep</h1>
      {!review ? (
        <>
          {randomQuestions.map((q, index: number) => {
            if (questionIndex == index) {
              return (
                <div
                  style={{
                    // width: "80%",
                    border: "1px solid blue",
                    margin: "auto",
                    padding: "30px",
                    marginTop: "50px",
                    borderRadius: "20px",
                  }}
                  className="col-md-10"
                >
                  {!answering ? (
                    <div>
                      <div
                        style={{
                          margin: "auto",
                          marginBottom: "30px",
                        }}
                      >
                        <b style={{ textAlign: "center" }}>{q.pregunta}</b>
                      </div>
                      <div>
                        {shuffleArray([...q.respuestas]).map(
                          (r: any, i: number) => (
                            <div
                              style={{
                                margin: "auto",
                                border: "1px solid purple",
                                marginBottom: "10px",
                                borderRadius: "10px",
                                padding: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => getAnswer(r.isCorrect, q)}
                            >
                              <b style={{ textAlign: "center" }}>
                                {getLettle(i)}
                                {r.opcion}
                              </b>
                            </div>
                          )
                        )}
                      </div>
                      <p style={{ textAlign: "center" }}>
                        {questionIndex + 1} / 30
                      </p>
                    </div>
                  ) : (
                    <div>
                      {answer ? (
                        <h5
                          style={{
                            fontWeight: "bold",
                            color: "green",
                            textAlign: "center",
                          }}
                        >
                          Correcto
                        </h5>
                      ) : (
                        <h5
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            textAlign: "center",
                          }}
                        >
                          Incoreccto
                        </h5>
                      )}

                      <div>
                        <p style={{ textAlign: "center" }}>
                          <b>La respuesta correcta es:</b>
                        </p>
                        <p style={{ textAlign: "center" }}>
                          {
                            question.respuestas.find((r: any) => r.isCorrect)
                              ?.opcion
                          }
                        </p>
                      </div>
                      <div
                        style={{
                          width: "100px",
                          margin: "auto",
                          border: "1px solid purple",
                          marginBottom: "10px",
                          borderRadius: "10px",
                          padding: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setAnswering(false);
                          setQuestionIndex(questionIndex + 1);
                        }}
                      >
                        <b style={{ textAlign: "center" }}>Continuar</b>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          })}
          {questionIndex > 29 && (
            <div
              style={{
                // width: "80%",
                border: "1px solid blue",
                margin: "auto",
                padding: "30px",
                marginTop: "50px",
                borderRadius: "20px",
              }}
              className="col-md-10"
            >
              <p style={{ textAlign: "center" }}>
                <b>Tu puntuaciona sido de:</b>
                {getStyledPoints(decimalToIntegerParse(resultPoints))}
              </p>
              <div
                style={{
                  width: "70px",
                  margin: "auto",
                  border: "1px solid purple",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  padding: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                <b style={{ textAlign: "center" }}>Volver</b>
              </div>
              <p
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "blue",
                }}
                onClick={() => setReview(true)}
              >
                Ver las preguntas donde que haz fallado
              </p>
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            // width: "80%",
            border: "1px solid blue",
            margin: "auto",
            padding: "30px",
            marginTop: "50px",
            borderRadius: "20px",
          }}
          className="col-md-10"
        >
          {questionWrong.map((q, index: number) => (
            <div
              style={{
                margin: "auto",
                marginBottom: "50px",
              }}
            >
              <div
                style={{
                  margin: "auto",
                  marginBottom: "30px",
                }}
              >
                <b style={{ textAlign: "center" }}>{q.pregunta}</b>
              </div>
              <div>
                {q.respuestas.map((r: any, i: number) => (
                  <div
                    style={{
                      margin: "auto",
                      border: r.isCorrect
                        ? "4px solid green"
                        : "1px solid purple",
                      marginBottom: "10px",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <b style={{ textAlign: "center" }}>
                      {getLettle(i)}
                      {r.opcion}
                    </b>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div
            style={{
              width: "70px",
              margin: "auto",
              border: "1px solid purple",
              marginBottom: "10px",
              borderRadius: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              setReview(false);
            }}
          >
            <b style={{ textAlign: "center" }}>Cerrar</b>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
