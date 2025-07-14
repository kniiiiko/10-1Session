import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as S from "../styles/styledSend";
import axios from "axios";

const Send = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/`);
  };

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  const { title, content } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSaveBtn = () => {
    console.log("제목: ", title);
    console.log("내용: ", content);

    try {
      axios
        .post("/posts", {
          title: inputs.title,
          content: inputs.content,
        })
        .then(() => navigate(`/`));
    } catch (error) {
      console.error("Error creating new post:", error);
    }
  };

  return (
    <S.Container>
      <S.BackBtn onClick={goBack}>
        <img src={`${process.env.PUBLIC_URL}/images/backBtn.svg`} alt="back" width="35px" />
      </S.BackBtn>
      <S.TitleWrapper>
        <S.Title>편지 제목:</S.Title>
        <S.TitleInput name="title" value={title} onChange={onChange} />
      </S.TitleWrapper>
      <S.ContentBox placeholder="내용 입력 ✏️" name="content" value={content} onChange={onChange}></S.ContentBox>
      <S.SaveBtn onClick={handleSaveBtn}>전송하기</S.SaveBtn>
    </S.Container>
  );
};

export default Send;
