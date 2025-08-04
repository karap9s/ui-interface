import { FilterConfig } from '@/src/components/features/table/lib/filterHelpers';
import React, { FC, useCallback, memo, useMemo } from 'react';
import { DatePicker, Label, Group, DateInput, DateSegment, Button, Popover, Dialog, Calendar, CalendarGrid, CalendarCell, Heading, I18nProvider } from 'react-aria-components';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { parseDate } from '@internationalized/date';

interface DateFilterProps {
  config: FilterConfig;
  value?: string;
  onChange: (value: string) => void;
}

const DateFilter: FC<DateFilterProps> = memo(({ config, value = '', onChange }) => {
  const dateValue = useMemo(() => {
    if (!value) return null;
    try {
      return parseDate(value);
    } catch {
      return null;
    }
  }, [value]);

  const handleDateChange = useCallback((date: { toString(): string } | null) => {
    if (date) {
      try {
        const dateString = date.toString();
        const parsedDate = parseISO(dateString);
        const formattedDate = format(parsedDate, 'yyyy-MM-dd');
        onChange(formattedDate);
      } catch {
        onChange(date.toString());
      }
    } else {
      onChange('');
    }
  }, [onChange]);

  return (
    <I18nProvider locale="en-GB">
      <div className="flex flex-col">
        <Label className="text-sm font-medium text-gray-700 mb-1">
          {config.label}
        </Label>
        <DatePicker value={dateValue} onChange={handleDateChange}>
          <Group className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9.5">
            <DateInput className="p-2 flex-1 text-sm">
              {(segment) => (
                <DateSegment 
                  segment={segment} 
                  className="focus:outline-none focus:bg-blue-100 pr-1 rounded"
                />
              )}
            </DateInput>
            <Button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none hover:cursor-pointer">
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
    </I18nProvider>
  );
});

DateFilter.displayName = 'DateFilter';

export default DateFilter; 