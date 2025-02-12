import React, { useEffect, useState } from "react";

function Basics() {
    const [select, setSelect] = useState("");
    const [selected, setSelected] = useState("");
    const [choice, setChoice] = useState({});
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setTimeout(() => { setMsg(""); }, 10000);
    }, [msg]);

    const juices = ["Orange Juice", "Apple Juice", "Mango Juice", "Grape Juice"];
    const chocolates = [
        "Dark Chocolate",
        "Milk Chocolate",
        "White Chocolate",
        "Hazelnut Chocolate",
    ];
    const chips = [
        "Potato Chips",
        "Nacho Chips",
        "Tortilla Chips",
        "Cheese Chips",
    ];

    const getList = () => {
        switch (select) {
            case "Juices":
                return juices;
            case "chocolate":
                return chocolates;
            case "chips":
                return chips;
            default:
                return [];
        }
    };

    const handleSelect = (e) => {
        const {value} = e.target;
        setSelect(value);
    };
    const handleSubSelect = (e) => {
        setSelected(e.target.value);
    };
    const handleChoiceSubmit = () => {
        if (choice[select] && choice[select].includes(selected)) {
            console.log("All ready present");
            setMsg("Item already present");
            return;
        }
        setChoice((prevState) => ({
            ...prevState,
            [select]: [...(prevState[select] || []), selected],
        }));
    };

    return (
        <>
            {select && selected && (
                <button onClick={handleChoiceSubmit}>Submit Choice</button>
            )}
            <br />
            {msg && <p style={{ fontSize: "large", color: "red" }}>{msg}</p>}
            <label htmlFor="select-option">Select Confectionery: </label>
            <select
                name="snack"
                value={select}
                onChange={handleSelect}
                id="select-option"
            >
                <option value="" disabled>
                    select
                </option>
                <option value="chips">chips</option>
                <option value="chocolate">chocolates</option>
                <option value="Juices">Juices</option>
            </select>
            {select && (
                <div>
                    <br />
                    <label htmlFor="select-option1">Select Your Favorite: </label>
                    <select
                        name="snack"
                        value={selected}
                        onChange={handleSubSelect}
                        id="select-option1"
                    >
                        <option value="" disabled>
                            select
                        </option>
                        {getList().map((item, index) => (
                            <option value={item} key={index}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </>
    );
}

export default Basics;
