import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import InitFormLogic from './Form.logic';
// ----------------------------------------------------------------------

export default function Form({ children, onSubmit, methods, message={} }) {

    const {setIsChanged} = InitFormLogic();

    const isValid = methods?.formState?.isValid;
    const dirtyField = methods?.formState?.dirtyFields;
    const isDirtyField = Object.keys(dirtyField).length !== 0;

    useEffect(()=>{
        if (isDirtyField  && isValid){
            setIsChanged(true)
        }else{
            setIsChanged(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isDirtyField , isValid])

    const handleSubmit = (e) => {
        setIsChanged(false)
        onSubmit(e)
    }

    return (
        <>
        <FormProvider {...methods}>
            <form onSubmit={(e)=>handleSubmit(e)}>{children}</form>
        </FormProvider>
        </>
    );
}