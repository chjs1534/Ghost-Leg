export const INITIAL_STATE = {
    count: 0,
    inputsTop: [],
    inputsBot: [],
    valuesTop: [],
    valuesBot: [],
    visited: [],
    activeRungs: [],
    match: [-1, -1]
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
                valuesTop: [...state.valuesTop, ""],
                valuesBot: [...state.valuesBot, ""]
            };
        case "DECREMENT":
            return {
                ...state, 
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
            return {
                ...state,
                valuesTop: state.valuesTop.map(
                    (el, i) => {
                        return <div key={i} className="inputsText" >
                            <p 
                                className="text" 
                                onClick={() => action.fn(i)}
                                style={{
                                    color: state.match[0] === i ? "red" : "black"
                                }}
                            >
                                {el}
                            </p>
                        </div>
                    }
                ),
                valuesBot: state.valuesBot.map(
                    (el, i) => {
                        return <div key={i} className="inputsText" >
                            <p 
                                style={{
                                    color: state.match[1] === i ? "red" : "black"
                                }}
                            >   
                                {el}
                            </p>
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
        case "ADDMATCH":
            return {
                ...state,
                match: [action.top, action.bot]
            }
    }
}