import * as React from "react";

const Add = (props) => {
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");

    return (
        <div className="actions__addSpot">
            <form className="addSpot">
                <div className="addSpot__inputBox">
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
                /></div>
                <div className="addSpot__btnBox">
                <button className="btn__primary" onClick={(e) => props.addSpot(e, name, description)}>Add Spot!</button>
                <button className="btn__secondary" onClick={props.cancelPlaceMarker}>Cancel</button></div>
            </form>
        </div>
    );
};

export { Add };
