import { useContext } from "react";
import { CalContext } from "../providers/calPaint";

const usePaint = () => {

    const { resultCalc, Comodos, Paredes, sendMeasure, sendCalComodo, sendComodo, sendBuscarComodo } = useContext(
        CalContext
    );

    return { resultCalc, Comodos, Paredes, sendMeasure, sendCalComodo, sendComodo, sendBuscarComodo };
};

export default usePaint;