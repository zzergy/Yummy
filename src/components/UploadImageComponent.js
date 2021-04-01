import React, { useRef } from 'react';
import { Button } from "@material-ui/core";

export default function UploadImageComponent() {
    const inputRef = useRef();

    function handleClick() {
        inputRef.current.click();
    }

    return (
        <>
            <input type="file" ref={inputRef} style={{display: "none"}}/>
            <Button onClick={handleClick}>Upload Image</Button>
        </>
    );
}