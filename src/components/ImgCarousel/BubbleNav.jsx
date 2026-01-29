import Styles from "./BubbleNav.module.css";
import PropTypes from "prop-types";

function BubbleNav({bubbleShiftValue, currentShift, setShiftFunc}) {

    const shiftClickHandler = () => {
        setShiftFunc(bubbleShiftValue);
    }

    return(<button className={Styles.bubble + ` ${(currentShift === bubbleShiftValue) ? Styles.selected : "" }`} onClick={shiftClickHandler}></button>);
}

BubbleNav.propTypes = { 
    bubbleShiftValue: PropTypes.number.isRequired,
    currentShift: PropTypes.number.isRequired,
    setShiftFunc: PropTypes.func.isRequired,
};

export default BubbleNav;