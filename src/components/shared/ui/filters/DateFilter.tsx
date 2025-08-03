import { FilterConfig } from '@/src/components/shared/lib/filterHelpers';
import React, { FC } from 'react';
import { DatePicker, Label, Group, DateInput, DateSegment, Button, Popover, Dialog, Calendar, CalendarGrid, CalendarCell, Heading } from 'react-aria-components';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateFilterProps {
  config: FilterConfig;
  onChange: (value: string) => void;
}

const DateFilter: FC<DateFilterProps> = ({ config, onChange }) => {
  const handleDateChange = (date: { toString(): string } | null) => {
    if (date) {
      onChange(date.toString());
    } else {
      onChange('');
    }
  };

  return (
    <div className="flex flex-col">
      <Label className="text-sm font-medium text-gray-700 mb-1">
        {config.label}
      </Label>
      <DatePicker onChange={handleDateChange}>
        <Group className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9.5">
          <DateInput className="px-3 py-2 flex-1 text-sm">
            {(segment) => (
              <DateSegment 
                segment={segment} 
                className="focus:outline-none focus:bg-blue-100 px-1 rounded"
              />
            )}
          </DateInput>
          <Button className="px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none hover:cursor-pointer">
            <CalendarIcon size={16} />
          </Button>
        </Group>
        <Popover className="bg-white border border-gray-300 rounded-md shadow-lg p-4 z-50">
          <Dialog>
            <Calendar>
              <header className="flex justify-between items-center mb-4">
                <Button slot="previous" className="p-2 hover:bg-gray-100 rounded hover:cursor-pointer">
                  <ChevronLeft size={16} />
                </Button>
                <Heading className="font-semibold" />
                <Button slot="next" className="p-2 hover:bg-gray-100 rounded hover:cursor-pointer">
                  <ChevronRight size={16} />
                </Button>
              </header>
              <CalendarGrid>
                {(date) => (
                  <CalendarCell 
                    date={date} 
                    className="w-8 h-8 text-sm flex items-center justify-center hover:bg-blue-100 rounded data-[selected]:bg-blue-500 data-[selected]:text-white hover:cursor-pointer"
                  />
                )}
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </DatePicker>
    </div>
  );
};

export default DateFilter; 