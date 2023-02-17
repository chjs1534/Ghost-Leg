import { useEffect, useState } from "react";
import './styles.css';
import Setter from "./components/Setter";
import Box from "./components/Box";

const App = () => {
    return (
		<div>
			<Setter />
			{/* <Box count={count} inputsTop={inputsTop} inputsBot={inputsBot} setInputsTop={setInputsTop}
				setInputsBot={setInputsBot} topValues={topValues} botValues={botValues}
				visited={visited} grid={grid} setGrid={setGrid} /> */}
			{/* <Result inputsMatch={inputsMatch} /> */}
		</div>
    )
}

export default App;