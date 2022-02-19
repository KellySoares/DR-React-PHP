import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from "../services/api";

export const CalContext = createContext({
    Comodos: [],
    Paredes: []
});

const CalProvider = ({ children }) => {

    const [Comodos, setComodos] = useState({
        loading: false,
        messageNull: false,
        message: '',
        data: []
    });

    const [Paredes, setParedes] = useState({
        loading: false,
        messageNull: false,
        message: '',
        data: []
    });

    async function APIComodo() {
        const params = {
            folder: 'ComodosController'
        }
        const response = await api.get(``, { params });

        if (response.data !== '') {

            setComodos((prevState) => ({
                ...prevState,
                loading: true,
                data: response.data
            }));
            setTimeout(() => {
                setComodos((prevState) => ({
                    ...prevState,
                    messageNull: false,
                    message: '',
                }));
            }, 5000);
        }
    }
    useEffect(() => {
        APIComodo();
    }, []);


    const CreateComodo = (name) => {
        const body = {
            folder: 'ComodosController',
            dados: {
                name: name
            }
        }
        api.post(``, body)
            .then((response) => {
                if (response.status === 200) {
                    setComodos((prevState) => ({
                        ...prevState,
                        loading: false,
                        messageNull: true,
                        message: response.data.message,
                        data: response.data
                    }));

                    APIComodo();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const CreateMeasure = (info) => {

        const body = {
            folder: 'ParedesController',
            dados: info
        }
        api.post(``, body)
            .then((response) => {

                if (response.data !== '') {

                    setParedes((prevState) => ({
                        ...prevState,
                        loading: true,
                        messageNull: true,
                        message: response.data.message,
                        data: []
                    }));

                    setTimeout(() => {
                        setParedes((prevState) => ({
                            ...prevState,
                            messageNull: false,
                            message: '',
                        }));
                    }, 5000);
                } else {
                    setParedes((prevState) => ({
                        ...prevState,
                        loading: false,
                        messageNull: false,
                        message: '',
                        data: []
                    }));

                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const CalcPaint = async (id) => {
        const params = {
            folder: 'ComodosController',
            function: 'CalcPaint',
            id: id
        }
        const response = await api.get(``, { params });

        if (response.data !== '') {

            setParedes((prevState) => ({
                ...prevState,
                loading: true,
                messageNull: false,
                message: '',
                data: response.data
            }));
        } else {
            setParedes((prevState) => ({
                ...prevState,
                loading: false,
                messageNull: false,
                message: '',
                data: []
            }));

        }
    }
    const BuscarComodo = async (id) => {
        const params = {
            folder: 'ParedesController',
            id: id
        }
        const response = await api.get(``, { params });

        if (response.data !== '') {
            setParedes((prevState) => ({
                ...prevState,
                loading: true,
                messageNull: false,
                message: '',
                data: response.data
            }));
        } else {
            setParedes((prevState) => ({
                ...prevState,
                loading: false,
                messageNull: false,
                message: '',
                data: []
            }));

        }
    }

    const contextValue = {
        Comodos,
        Paredes,
        sendMeasure: useCallback((info) => CreateMeasure(info), []),
        sendComodo: useCallback((name) => CreateComodo(name), []),
        sendCalComodo: useCallback((id) => CalcPaint(id), []),
        sendBuscarComodo: useCallback((id) => BuscarComodo(id), [])
    };

    return (
        <CalContext.Provider value={contextValue}>
            {children}
        </CalContext.Provider>
    )
}

export default CalProvider;