import * as React from "react";

const Add = (props) => {
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");

    return (
        <div style={{ position: "absolute", top: "50px", left: "50%" }}>
            <form>
                <input
                    type="text"
                    value={name}
                    placeholder="Name this spot... or leave blank to use generic name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    value={description}
                    placeholder="Spot details"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={(e) => props.addSpot(e, name, description)}>Add Spot!</button>
            </form>
        </div>
    );
};

export { Add };
