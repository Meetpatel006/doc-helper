import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown"
import Input from "./Input"

const SettingLabel = ({
  description,
  name,
  icon,
  inputProps,
  dropdownProps,
  checkboxProps,
  buttonProps
}: {
  description: string;
  name: string;
  icon?: React.ReactNode;
  inputProps?: any;
  dropdownProps?: any;
  checkboxProps?: any;
  buttonProps?: {
    onClick: () => void;
    text: string;
    className?: string;
  };
}) => {
  return (
    <div className="setting-label">
      <div className="setting-content">
        {icon && <div className="setting-icon-container">{icon}</div>}
        <div className="setting-text">
          <p className="name">{name}</p>
          <p className="description">{description}</p>
        </div>
      </div>
      <div className="setting-control">
        {inputProps && <Input {...inputProps} name={name} />}
        {dropdownProps && <Dropdown {...dropdownProps} name={name} />}
        {checkboxProps && <Checkbox {...checkboxProps} name={name} />}
        {buttonProps && (
          <button
            onClick={buttonProps.onClick}
            className={`setting-button ${buttonProps.className || ''}`}
          >
            {buttonProps.text}
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingLabel
