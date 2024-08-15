function InputText(props) {
    return (
        <div>
            <div>
                <label htmlFor="" style={{ color: "red", fontWeight: "bold" }}>
                    {props.message}
                </label>
                <input type="text"  onChange={(e) => props.setValue(e.target.value)} className="form-control"  value={props.value}/>
            </div>
        </div>
    )
}
export default InputText