interface Props {
  option: string;
  setColor: (color: string) => void;
  color: string;
}
const ColorPicker: React.FC<Props> = ({ option, setColor, color }) => {
  return (
    <input
      key={option}
      className="color-500 h-20 w-20 appearance-none rounded-lg opacity-20 checked:opacity-100"
      style={{ backgroundColor: option }}
      type="radio"
      name="color"
      value={option}
      onChange={(e) => setColor(e.target.value)}
      checked={color === option}
    />
  );
};

export default ColorPicker;
