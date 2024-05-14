import React, { useState } from 'react'

function FormInputDemo(props) {
    const [inputValue, setInputValue] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        console.group('Input value is ')
        console.log(inputValue)
        console.groupEnd()
    }
    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" value={inputValue} onChange={handleInputChange}></input>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default FormInputDemo
