type FilterProps = {
  classes?: string;
  options: string[];
  handleChange: (option: string) => void;
};

export default function Filter({
  classes,
  handleChange,
  options,
}: FilterProps) {
  return (
    <select onChange={(e) => handleChange(e.target.value)} className={classes}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
