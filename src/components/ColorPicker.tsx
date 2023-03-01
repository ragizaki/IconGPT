interface Props {
  option: string;
  setColor: (color: string) => void;
  color: string;
}
const ColorPicker: React.FC<Props> = ({ option, setColor, color }) => {
  return (
    <div className="flex items-center">
      <label className="flex flex-col text-center">
        <input
          className="mb-2 h-28 w-28 cursor-pointer appearance-none rounded-lg opacity-20 checked:scale-110 checked:opacity-100"
          style={{ backgroundColor: option }}
          type="radio"
          name="color"
          value={option}
          onChange={(e) => setColor(e.target.value)}
          checked={color === option}
        />
        <p>{option}</p>
      </label>
    </div>
  );
};

export default ColorPicker;
