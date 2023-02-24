export const INITIAL_STATE = {
    count: 0,
    inputsTop: [],
    inputsBot: [],
    valuesTop: [],
    valuesBot: [],
    textTop: [],
    textBot: [],
    visited: [],
    activeRungs: []
};

export const layoutReducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state, 
                count: state.count + 1,
                inputsTop: [...state.inputsTop, 
                    action.inputTop],
                inputsBot: [...state.inputsBot, 
                    action.inputBot],
                textTop: [...state.textTop, ""],
                textBot: [...state.textBot, ""],
                valuesTop: [...state.valuesTop, <></>],
                valuesBot: [...state.valuesBot, <></>]
            };
        case "DECREMENT":
            return {
                ...state, 
                count: state.count - 1,
                inputsTop: state.inputsTop.slice(0, -1),
                inputsBot: state.inputsBot.slice(0, -1),
                textTop: state.textTop.slice(0, -1),
                textBot: state.textBot.slice(0, -1),
                valuesTop: state.valuesTop.slice(0, -1),
                valuesBot: state.valuesBot.slice(0, -1)
            }
        case "SETTEXTTOP":
            return {
                ...state,
                textTop: state.textTop.map(
                    (el, i) => {
                        return (action.index === i) ? action.value : el
                    }
                )
            }
        case "SETTEXTBOT":
            return {
                ...state,
                textBot: state.textBot.map(
                    (el, i) => {
                        return (action.index === i) ? action.value : el
                    }
                )
            }
        case "SETLABELS":
            return {
                ...state,
                valuesTop: state.valuesTop.map(
                    (_, i) => {
                        return <div key={i} className="inputsText" >
                            <p 
                                key={i}
                                className="text" 
                                onClick={() => action.fn(i)}
                            >
                                {state.textTop.at(i)}   
                            </p>
                        </div>
                    }
                ),
                valuesBot: state.valuesBot.map(
                    (_, i) => {
                        return <div key={i} className="inputsText" >
                            <p key={i}>{state.textBot.at(i)}</p>
                        </div>
                    }
                )
            }
        case "GENRUNGS":
            const numRungs = Math.floor(Math.random() * 
                (20 - (state.count + 3) + 1) + (state.count + 3))

            const nums = new Set()
            while (nums.size < numRungs) {
                nums.add(Math.floor(Math.random() * 49))
            }
            
            let temp = []
            for (const num of nums.values()) {
                const idx = Math.floor(Math.random() * (state.count - 1)) 
                temp.push([num, idx])
            }

            return {
                ...state,
                activeRungs: temp
            }
        case "ADDMATCHTOP":
            return {
                ...state,
                valuesTop: state.valuesTop.map(
                    (_, i) => {
                        return <div key={i} className="inputsText" >
                                <p 
                                    className="text" 
                                    onClick={() => action.fn(i)}
                                    style={{color: action.index === i ? "red" : "black"}}
                                >
                                    {state.textTop[i]}
                                </p>
                            </div> 
                    }
                ),
                valuesBot: state.valuesBot.map(
                    (el, i) => {
                        return <div key={i} className="inputsText" >
                                <p 
                                    key={i}
                                    style={{color: "black"}}
                                >
                                    {state.textBot.at(i)}
                                </p>
                            </div>
                    }
                )
            }
        case "ADDMATCHBOT":
            return {
                ...state,
                valuesBot: state.valuesBot.map(
                    (el, i) => {
                        return <div key={i} className="inputsText" >
                                <p 
                                    key={i}
                                    style={{color: action.index === i ? "red" : "black"}}
                                >
                                    {state.textBot.at(i)}
                                </p>
                            </div>
                    }
                )
            }
    }
}