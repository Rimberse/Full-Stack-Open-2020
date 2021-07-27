import React from 'react';

// ex. 2.1
// Course component
const Course = props => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    );
};

// Header component
const Header = props => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    );
};

// Content component
// forEach won't work because it doesn't return anything, so .map function is the only choice, since it returns an array
// each component should be provided with a key in React (key=...)
const Content = props => {
    return (
        <>
            {props.parts.map(part => <Part name={part.name} count={part.exercises} key={part.id} />)}
        </>
    );
};

// Part component (ex. 1.2)
const Part = props => {
    return (
        <>
            <p>
                {props.name} {props.count}
            </p>
        </>
    );
};

// ex. 2.2, 2.3
// Total component
const Total = props => {
    return (
        <>
            <h3>Total of {props.parts.reduce((acc, current) => acc + current.exercises, 0)} exercises</h3>
        </>
    );
};

// ex. 2.5
export default Course;