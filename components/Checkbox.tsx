const Checkbox = ({handleChange, name, checked}: {handleChange: any, name: any, checked: any}) => {
    return (
      <input type="checkbox" checked={checked} onChange={handleChange} name={name} id={name} className="setting-checkbox"></input>
    )
  }
  
  export default Checkbox
  
