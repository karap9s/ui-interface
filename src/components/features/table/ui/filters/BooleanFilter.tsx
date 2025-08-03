import React, { FC, useCallback, memo } from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';
import { FilterConfig } from '@/src/components/features/table/lib/filterHelpers';

interface BooleanFilterProps {
  config: FilterConfig;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
}

const { Root, Trigger, Value, Icon, Content, Item, ItemText, ItemIndicator, Portal, Viewport } = Select;

const BooleanFilter: FC<BooleanFilterProps> = memo(({ config, value, onChange }) => {
  const handleValueChange = useCallback((selectedValue: string) => {
    if (selectedValue === 'all') {
      onChange(null);
    } else {
      onChange(selectedValue === 'true');
    }
  }, [onChange]);

  const currentValue = value === null ? 'all' : String(value);

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {config.label}
      </label>
      <Root value={currentValue} onValueChange={handleValueChange}>
        <Trigger className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:bg-gray-50 data-[placeholder]:text-gray-500 hover:cursor-pointer inline-flex items-center justify-between h-9.5">
          <Value placeholder="All" />
          <Icon asChild>
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          </Icon>
        </Trigger>
        
        <Portal>
          <Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-50">
            <Viewport className="p-1">
              <Item value="all" className="relative flex items-center px-8 py-2 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100 focus:bg-gray-100 outline-none data-[highlighted]:bg-gray-100">
                <ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon className="h-4 w-4" />
                </ItemIndicator>
                <ItemText>All</ItemText>
              </Item>
              
              <Item value="true" className="relative flex items-center px-8 py-2 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100 focus:bg-gray-100 outline-none data-[highlighted]:bg-gray-100">
                <ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon className="h-4 w-4" />
                </ItemIndicator>
                <ItemText>Yes</ItemText>
              </Item>
              
              <Item value="false" className="relative flex items-center px-8 py-2 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100 focus:bg-gray-100 outline-none data-[highlighted]:bg-gray-100">
                <ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon className="h-4 w-4" />
                </ItemIndicator>
                <ItemText>No</ItemText>
              </Item>
            </Viewport>
          </Content>
        </Portal>
      </Root>
    </div>
  );
});

BooleanFilter.displayName = 'BooleanFilter';

export default BooleanFilter; 