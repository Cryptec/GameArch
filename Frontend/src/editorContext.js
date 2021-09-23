import React from 'react'

const defaultContext = {
    markdownText: "",
    setMarkdownText: () => { }
};

export default React.createContext(defaultContext);
