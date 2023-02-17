import { useRef } from "react";

export const INITIAL_STATE = {
    count: 0,
    inputsTop: [],
    inputsBot: [],
    valuesTop: [],
    valuesBot: []
};

export const layoutReducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count + 1,
                inputsTop: [...state.inputsTop, 
                    action.inputTop],
                inputsBot: [...state.inputsBot, 
                    action.inputBot],
                valuesTop: [...state.valuesTop, ""],
                valuesBot: [...state.valuesBot, ""]
            };
        case "DECREMENT":
            return {
                count: state.count - 1,
                inputsTop: state.inputsTop.slice(0, -1),
                inputsBot: state.inputsBot.slice(0, -1),
                valuesTop: state.valuesTop.slice(0, -1),
                valuesBot: state.valuesBot.slice(0, -1)
            }
        case "SETVALUETOP":
            return {
                ...state,
                valuesTop: state.valuesTop.map(
                    (el, i) => {
                        return (action.index === i) ? action.value : el
                    }
                )
            }
        case "SETVALUEBOT":
            return {
                ...state,
                valuesBot: state.valuesBot.map(
                    (el, i) => {
                        return (action.index === i) ? action.value : el
                    }
                )
            }
        case "SETLABELS":
            console.log("BRO")
            console.log(state.valuesTop)
            return {
                ...state,
                valuesTop: state.valuesTop.map(
                    (el, i) => {
                        return <div 
                            key={i} 
                            className="inputsText" 
                            onClick={action.fn(i)}
                        >{el}</div>
                    }
                ),
                valuesBot: state.valuesBot.map(
                    (el, i) => {
                        return <div 
                            key={i} 
                            className="inputsText" 
                            // onClick={action.fn(i)}
                        >{el}</div>
                    }
                )
            }
    }
}