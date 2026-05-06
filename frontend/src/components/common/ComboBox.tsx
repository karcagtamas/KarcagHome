import { Dropdown, Option } from '@fluentui/react-components';

type Props<T> = {
  data: T[];
  value?: string;
  identifierProvider: (d: T) => string;
  displayTextProvider: (d: T) => string;
  optionFilter?: (d: T) => boolean;
  onValueChange: (v: string | undefined) => void;
  disabled?: boolean;
};

export const ComboBox = <T,>({
  data,
  value,
  identifierProvider,
  displayTextProvider,
  optionFilter,
  onValueChange,
  disabled = false,
}: Props<T>) => {
  const selected = data.find((d) => identifierProvider(d) === value);

  return (
    <Dropdown
      value={selected ? displayTextProvider(selected) : ''}
      selectedOptions={value ? [value] : []}
      onOptionSelect={(_, data) => onValueChange(data.optionValue)}
      disabled={disabled}
    >
      {data
        .filter((d) => optionFilter && optionFilter(d))
        .map((d) => (
          <Option key={identifierProvider(d)} value={identifierProvider(d)}>
            {displayTextProvider(d)}
          </Option>
        ))}
    </Dropdown>
  );
};
