interface Props {
  option: string;
  setColor: (color: string) => void;
  color: string;
}
const ColorPicker: React.FC<Props> = ({ option, setColor, color }) => {
  return (
    <div className="flex flex-col items-center">
      <input
        key={option}
        className="color-500 mb-1 h-20 w-20 cursor-pointer appearance-none rounded-lg opacity-20 checked:opacity-100"
        style={{ backgroundColor: option }}
        type="radio"
        name="color"
        value={option}
        onChange={(e) => setColor(e.target.value)}
        checked={color === option}
      />
      <p>{option}</p>
    </div>
  );
};

export default ColorPicker;
