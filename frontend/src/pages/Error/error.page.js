import React from "react";
import PublicLayout from "../../layouts/Public/Public.layout";

const ErrorPage = ({ message, code }) => {
    return <PublicLayout child={
        <>
            <h1>{message}</h1>
            <h2>{code}</h2>
        </>}>
    </PublicLayout>
}

export default ErrorPage;