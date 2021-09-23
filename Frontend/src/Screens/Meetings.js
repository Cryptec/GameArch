import React, { useState } from 'react'
import styled from 'styled-components'
import { MarkedInput } from '../components/MarkdownEditor/markedInput'
import { Result } from '../components/MarkdownEditor/result'
import EditorContext from '../editorContext'
import { showMd, hideMd } from '../components/handler'

import '../css/meetings.css'


const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default function Meetings() {
  const [markdownText, setMarkdownText] = useState("");

  const contextValue = {
    markdownText,
    setMarkdownText
  };

    return (
    
        <div id="contentpage">
          <div className="markdownPress" id="markdownPress" onClick={showMd}>
            + Add new meeting note
          </div>
          <div onClick={hideMd} className="markdownPressClose" id="back">  
            - Close editor
          </div>
 
        <div id="mdEditor">
          <EditorContext.Provider value={contextValue}>
       
              <br />
              <br />
              <EditorContainer>
                <MarkedInput />
                <Result />
              </EditorContainer>
        
          </EditorContext.Provider>
          <button className="submitNotesButton">Send</button>
        </div>
        </div>
 
    );
  }