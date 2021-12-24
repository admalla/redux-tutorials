import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({ onChange, text, onCheck, onBox, addTask }) => {
  const handleChangeText = (e) => {
    onChange(e.target.value);
  };

  const handleChangeChecked = (e) => {
    onCheck(e.target.checked);
  };

  return (
    <div className="field">
      <Checkbox
        checked={onBox}
        onChange={handleChangeChecked}
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField
        value={text}
        onChange={handleChangeText}
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
      />
      <Button onClick={addTask}>
        <AddIcon />
      </Button>
    </div>
  );
};
