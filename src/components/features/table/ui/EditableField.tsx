import React, { FC, memo, useCallback } from 'react';
import { TextField, Text, Flex } from '@radix-ui/themes';
import * as Select from '@radix-ui/react-select';
import { DatePicker, Label, Group, DateInput, DateSegment, TimeField } from 'react-aria-components';
import { parseDate, getLocalTimeZone, Time, CalendarDate } from '@internationalized/date';
import { format, parseISO, setHours, setMinutes, setSeconds } from 'date-fns';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';
import { cn } from '@/src/components/shared/lib/utils';
import { detectFilterType } from '@/src/components/features/table/lib/filterHelpers';
import { isFieldEditable } from '@/src/components/features/table/lib/editableFields';

interface EditableFieldProps {
  field: {
    key: string;
    value: unknown;
    label: string;
  };
  currentValue: unknown;
  row: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

const { Root: SelectRoot, Trigger, Value, Icon, Content: SelectContent, Item, ItemText, ItemIndicator, Portal, Viewport } = Select;

const EditableField: FC<EditableFieldProps> = memo(({ field, currentValue, row, onChange }) => {
  const { key, label } = field;
  const fieldType = detectFilterType(field.value);
  const editable = isFieldEditable(key, row);

  const handleFieldChange = useCallback((value: unknown) => {
    onChange(key, value);
  }, [key, onChange]);

  const handleDateChange = useCallback((date: CalendarDate | null, timeValue: Time | null) => {
    if (!editable) return;
    if (date) {
      try {
        const currentTime = timeValue || new Time(0, 0, 0);
        const newDateTime = date.toDate(getLocalTimeZone());
        const updatedDateTime = setHours(
          setMinutes(
            setSeconds(newDateTime, currentTime.second),
            currentTime.minute
          ),
          currentTime.hour
        );
        handleFieldChange(format(updatedDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
      } catch {
        handleFieldChange('');
      }
    } else {
      handleFieldChange('');
    }
  }, [editable, handleFieldChange]);

  const handleTimeChange = useCallback((time: Time | null, dateValue: CalendarDate | null) => {
    if (!editable) return;
    if (time && dateValue) {
      try {
        const newDateTime = dateValue.toDate(getLocalTimeZone());
        const updatedDateTime = setHours(
          setMinutes(
            setSeconds(newDateTime, time.second),
            time.minute
          ),
          time.hour
        );
        handleFieldChange(format(updatedDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
      } catch {
        // Keep current value in case of error
      }
    }
  }, [editable, handleFieldChange]);

  // Boolean field renderer
  if (fieldType === 'boolean') {
    return (
      <div key={key}>
        <Text as="div" size="2" mb="1" weight="bold" className={cn(!editable && 'text-gray-500')}>
          {label}
        </Text>
        <SelectRoot 
          value={String(currentValue || false)} 
          onValueChange={(value) => editable && handleFieldChange(value === 'true')}
          disabled={!editable}
        >
          <Trigger className={cn(
            "w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:cursor-pointer inline-flex items-center justify-between h-9",
            !editable ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'hover:bg-gray-50'
          )}>
            <Value />
            <Icon asChild>
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </Icon>
          </Trigger>
          
          {editable && (
            <Portal>
              <SelectContent className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <Viewport className="p-1">
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
              </SelectContent>
            </Portal>
          )}
        </SelectRoot>
      </div>
    );
  }

  // Date/Time field renderer
  if (fieldType === 'date') {
    const dateString = String(currentValue || '');
    const dateValue = dateString ? parseDate(dateString.split('T')[0]) : null;
    const timeValue = dateString ? (() => {
      try {
        const parsedDate = parseISO(dateString);
        return new Time(parsedDate.getHours(), parsedDate.getMinutes(), parsedDate.getSeconds());
      } catch {
        return new Time(0, 0, 0);
      }
    })() : null;
    
    return (
      <div key={key}>
        <Text as="div" size="2" mb="1" weight="bold" className={cn(!editable && 'text-gray-500')}>
          {label}
        </Text>
        <Flex direction="column" gap="2">
          <DatePicker
            value={dateValue}
            isDisabled={!editable}
            onChange={(date) => handleDateChange(date, timeValue)}
          >
            <Label className="sr-only">Date</Label>
            <Group className={cn(
              "flex items-center border border-gray-300 rounded-md overflow-hidden h-9",
              !editable && 'bg-gray-50'
            )}>
              <DateInput className="p-2 flex-1 text-sm">
                {(segment) => (
                  <DateSegment 
                    segment={segment} 
                    className={cn(
                      "focus:outline-none pr-1 rounded",
                      !editable ? 'text-gray-500' : 'focus:bg-blue-100'
                    )}
                  />
                )}
              </DateInput>
            </Group>
          </DatePicker>
          
          <TimeField
            value={timeValue}
            isDisabled={!editable}
            onChange={(time) => handleTimeChange(time, dateValue)}
          >
            <Label className="sr-only">Time</Label>
            <DateInput className={cn(
              "flex items-center border border-gray-300 rounded-md p-2 h-9",
              !editable && 'bg-gray-50'
            )}>
              {(segment) => (
                <DateSegment 
                  segment={segment} 
                  className={cn(
                    "focus:outline-none pr-1 rounded",
                    !editable ? 'text-gray-500' : 'focus:bg-blue-100'
                  )}
                />
              )}
            </DateInput>
          </TimeField>
        </Flex>
      </div>
    );
  }

  // Text field renderer (default)
  return (
    <div key={key}>
      <Text as="div" size="2" mb="1" weight="bold" className={cn(!editable && 'text-gray-500')}>
        {label}
      </Text>
      <TextField.Root
        value={String(currentValue || '')}
        onChange={(e) => editable && handleFieldChange(e.target.value)}
        placeholder={editable ? `Enter ${label.toLowerCase()}` : 'Read only'}
        disabled={!editable}
        className={cn(!editable && 'opacity-60')}
      />
    </div>
  );
});

EditableField.displayName = 'EditableField';

export default EditableField; 