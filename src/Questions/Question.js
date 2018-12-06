import React from 'react';

// data passed in here is the question object
// this functional component will display the data on the screen
const Question = ({ data }) => {
    if (data == null) {
        return null;
    }
    console.log(data);

    // <div> {JSON.stringify(data)}</div>;
    return (
        <div>
            <p>{data.definition}</p>
            {data.wordPosition == 0 ? (
                <div>
                    <button>{data.originalWord}</button>
                    <button>{data.homophone}</button>
                </div>
            ) : (
                <div>
                    <button>{data.homophone}</button>
                    <button>{data.originalWord}</button>
                </div>
            )}
        </div>
    );
};

export default Question;
