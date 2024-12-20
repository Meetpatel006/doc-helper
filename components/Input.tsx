interface InputProps {
  type: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
}

const Input: React.FC<InputProps> = ({type, handleChange, name}) => {
  return (
    <input type={type} onInput={handleChange} name={name} id={name} className="setting-input"></input>
  )
}

export default Input
