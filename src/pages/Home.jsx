import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // 추가
import * as H from "../styles/styledHome";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const goSend = () => {
    navigate(`/send`);
  };

  // 추가
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출
        const response = await axios.get("/posts");
        setPostList(response.data); // API 응답으로 받은 데이터를 state에 저장
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // useEffect에서 fetchData 함수 호출
  }, []);

  return (
    <H.Container>
      <H.Line>
        <H.Logo>
          <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="logo" width="70px" />
        </H.Logo>
        <H.Title>
          🦁DWU x LIKELION🦁
          <br />
          LETTER
        </H.Title>
        <H.LetterWrapper>
          {/* 추가 */}
          {postList.map((e) => (
            <H.Letter key={e.id} onClick={() => navigate(`/detail/${e.id}`)}>
              {e.title}
            </H.Letter>
          ))}
        </H.LetterWrapper>

        <H.PostBox>
          <div id="postText">POST</div>
          <hr />
          <H.SendBtn onClick={goSend}>
            <div id="heart">❤️</div>
            <div id="goText">편지 보내러 가기</div>
          </H.SendBtn>
        </H.PostBox>
      </H.Line>
    </H.Container>
  );
};

export default Home;
