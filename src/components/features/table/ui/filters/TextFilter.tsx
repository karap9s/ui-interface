import React, { FC, useState, useEffect, useCallback, memo } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { FilterConfig } from '@/src/components/features/table/lib/filterHelpers';

interface TextFilterProps {
  config: FilterConfig;
  value: string;
  onChange: (value: string) => void;
}

const TextFilter: FC<TextFilterProps> = memo(({ config, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1 dark:text-slate-300">
        {config.label}
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Search ${config.label.toLowerCase()}...`}
        className="p-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-9.5"
      />
    </div>
  );
});

TextFilter.displayName = 'TextFilter';

export default TextFilter;
