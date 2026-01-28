import Styles from "./BubbleNav.module.css";


function BubbleNav({bubbleShiftValue, currentShift, setShiftFunc}) {

    const shiftClickHandler = () => {
        setShiftFunc(bubbleShiftValue);
    }

    return(<button className={Styles.bubble + ` ${(currentShift === bubbleShiftValue) ? Styles.selected : "" }`} onClick={shiftClickHandler}></button>);
}

export default BubbleNav;