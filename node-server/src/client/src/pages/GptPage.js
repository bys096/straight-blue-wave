import axios from "axios";
import React, { useState } from "react";

import Notification from "./notification";

const GptPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleMessageSubmit = async () => {
    // 사용자 입력과 대화 기록을 API 요청의 본문에 포함합니다.
    const data = {
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      n: 1,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: inputText },
      ],
    };

    try {
      // ChatGPT API 호출
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer Secret",
          },
        }
      );

      // 응답에서 모델의 답변을 추출하여 새로운 메시지로 추가합니다.
      const answer = response.data.choices[0].message.content;
      setMessages([...messages, { role: "assistant", content: answer }]);

      // 입력 필드를 초기화합니다.
      setInputText("");
    } catch (error) {
      console.error("API 요청 중 오류가 발생했습니다:", error);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const getInputStyle = () => {
    const lines = inputText.split("\n");
    const numberOfLines = lines.length;

    return {
      height: `${numberOfLines * 20}px`, // 각 줄의 높이를 20px로 가정
      width: "500px",
    };
  };

  return (
    <div>
      <Notification></Notification>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>{message.role}: </span>
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        style={getInputStyle()}
      />
      <button onClick={handleMessageSubmit}>전송</button>
    </div>
  );
};

export default GptPage;
