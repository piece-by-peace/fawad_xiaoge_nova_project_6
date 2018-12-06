import React from 'react';

// this functional component will display the data on the screen
const Question = ({ data }) => {
    if (data == null) {
        return null;
    }

    // randomly pick defition 0 or 1

    return <div>{JSON.stringify(data)}</div>;
};

export default Question;
