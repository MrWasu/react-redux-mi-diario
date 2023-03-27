import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    // actualiza el estado si cambia el initialform
    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])

    
    const isFormValid = useMemo(() => {
        
        // importa el resultado de las validaciones, las comprueba, y luego exporta un boolean
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        
        return true;
    }, [formValidation])
    
    
    const onInputChange = ({ target }) => {
        // funcion que se encarga de cambiar el estado al escribri dentro del campo
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }
    
    const onResetForm = () => {
        setFormState(initialForm);
    }
    
    
    // funciones que se encargan de verificar las validaciones cada vez que el estado de los campos de texto cambien
    useEffect(() => {
        createValidators();
    }, [formState])

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        /*  const formValidations = { // 
             email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
             password: ... // código del componente que se esta iterando en esta función
           }
          */

        setFormValidation(formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}