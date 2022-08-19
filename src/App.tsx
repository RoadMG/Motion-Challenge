import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #afb4ff;
`;

const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 2fr);
  width: 50vw;
  gap: 10px;
`;
const Box1 = styled(motion.div)`
  height: 30vh;
  background-color: #a66cff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Box = styled(motion.div)`
  height: 30vh;
  background-color: #a66cff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    transform-origin: bottom right;
  }
  &:nth-child(2) {
    transform-origin: bottom left;
  }
  &:nth-child(3) {
    transform-origin: top right;
  }
  &:last-child {
    transform-origin: top left;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 25px;
`;

const Button = styled(motion.button)`
  margin-top: -200px;
  height: 35px;
  border-color: rgba(0, 0, 0, 0);
  border-radius: 4px;
`;

////////////////styled componets////////////////

const overayVariants = {
  normal: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  visible: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  exit: {
    backgroundColor: "rgba(0,0,0,0)",
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.1,
      type: "tween",
    },
  },
  exit: {
    transformOrigin: "bottom right",
  },
};

//////////////////variants////////////////////
const boxArray = ["1", "2", "3", "4"];

function App() {
  const [id, setId] = useState<null | string>(null);
  console.log(id);
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked(!clicked);
  return (
    <Wrapper>
      <Grid>
        {boxArray.map((n) => (
          <Box
            onClick={() => {
              setId(n);
            }}
            key={n}
            initial="normal"
            transition={{ type: "tween" }}
            layoutId={n + ""}
            whileHover="hover"
            exit="exit"
            variants={boxVariants}
          >
            {n === "2" ? !clicked ? <Circle layoutId="cirlce" /> : null : null}
            {n === "3" ? clicked ? <Circle layoutId="cirlce" /> : null : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => {
              setId(null);
            }}
            variants={overayVariants}
            initial="normal"
            animate="visible"
            exit="exit"
          >
            <Box1 layoutId={id + ""} style={{ width: 500, height: 300 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Button
        style={clicked ? { color: "red", scale: 1.1 } : { color: "blue" }}
        onClick={toggleClicked}
        layout
      >
        Switch
      </Button>
    </Wrapper>
  );
}

export default App;
