import React, { FC, useState, useEffect } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { FilterConfig } from '../../lib/filterHelpers';

interface TextFilterProps {
  config: FilterConfig;
  value: string;
  onChange: (value: string) => void;
}

const TextFilter: FC<TextFilterProps> = ({ config, value, onChange }) => {
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

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {config.label}
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={`Search ${config.label.toLowerCase()}...`}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-9.5"
      />
    </div>
  );
};

export default TextFilter; 