import React, { useContext } from 'react'
import styled from 'styled-components'
import editorContext from '../../editorContext.js'

const Container = styled.div`
  width: 50%;
  height: 80%;
  padding: 13px;
  font-family: "Lato", sans-serif;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1em;
  padding: 8px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80%;
  resize: none;
  border: none;
  outline: none;
  font-size: 17px;
`;

export function MarkedInput(props) {
    const { setMarkdownText } = useContext(editorContext);

    const onInputChange = e => {
        const newValue = e.currentTarget.value;
        setMarkdownText(newValue);
    };

    return (
        <Container>
            <Title>Markdown Text</Title>
            <TextArea onChange={onInputChange} />
        </Container>
    );
}