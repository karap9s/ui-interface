import React, { FC, useState, useMemo, useCallback, memo } from 'react';
import { Dialog, Button, TextField, Text, Flex } from '@radix-ui/themes';
import * as Select from '@radix-ui/react-select';
import { DatePicker, Label, Group, DateInput, DateSegment, TimeField } from 'react-aria-components';
import { parseDate, getLocalTimeZone, Time } from '@internationalized/date';
import { format, parseISO, setHours, setMinutes, setSeconds } from 'date-fns';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';
import { detectFilterType } from '@/src/components/shared/lib/filterHelpers';
import { parseTableHeader } from '@/src/components/shared/lib/utils';
import { isFieldEditable } from '@/src/components/shared/lib/editableFields';
import { cn } from '@/src/components/shared/lib/utils';

interface EditRowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  row: Record<string, unknown>;
  onSave: (updatedRow: Record<string, unknown>) => void;
}

const { Root: DialogRoot, Title: DialogTitle, Content, Close } = Dialog;
const { Root: SelectRoot, Trigger, Value, Icon, Content: SelectContent, Item, ItemText, ItemIndicator, Portal, Viewport } = Select;

const EditRowDialog: FC<EditRowDialogProps> = memo(({ isOpen, onClose, row, onSave }) => {
  const [formData, setFormData] = useState(row);

  // Function for flattening nested objects into flat fields
  const flattenObject = useCallback((obj: Record<string, unknown>, prefix = ''): Array<{key: string, value: unknown, label: string}> => {
    const fields: Array<{key: string, value: unknown, label: string}> = [];
    
    Object.keys(obj).forEach(key => {
      if (key === 'id') return; // Skip id field

      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        // Recursively process nested objects
        fields.push(...flattenObject(value as Record<string, unknown>, fullKey));
      } else {
        // Use only the last part of the key for the label
        const label = parseTableHeader(key);
        fields.push({ key: fullKey, value, label });
      }
    });

    return fields;
  }, []);

  // Get flat list of fields
  const fields = useMemo(() => flattenObject(row), [row, flattenObject]);

  // Function to get value by path
  const getNestedValue = useCallback((obj: Record<string, unknown>, path: string): unknown => {
    return path.split('.').reduce((current: unknown, key: string) => {
      return current && typeof current === 'object' && current !== null ? 
        (current as Record<string, unknown>)[key] : undefined;
    }, obj as unknown);
  }, []);

  // Function to set value by path
  const setNestedValue = useCallback((obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> => {
    const keys = path.split('.');
    const result = { ...obj };
    let current: Record<string, unknown> = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      } else {
        current[key] = { ...current[key] as Record<string, unknown> };
      }
      current = current[key] as Record<string, unknown>;
    }

    current[keys[keys.length - 1]] = value;
    return result;
  }, []);

  const handleFieldChange = useCallback((key: string, value: unknown) => {
    setFormData(prev => setNestedValue(prev, key, value));
  }, [setNestedValue]);

  const handleSave = useCallback(() => {
    onSave(formData);
    onClose();
  }, [formData, onSave, onClose]);

  const renderField = useCallback((field: {key: string, value: unknown, label: string}) => {
    const { key, label } = field;
    const currentValue = getNestedValue(formData, key);
    const fieldType = detectFilterType(field.value);
    
    // Check field editability
    const editable = isFieldEditable(key, row);

    switch (fieldType) {
      case 'boolean':
        return (
          <div key={key}>
            <Text as="div" size="2" mb="1" weight="bold" className={cn(!editable && 'text-gray-500')}>
              {label}
            </Text>
            <SelectRoot 
              value={String(currentValue || false)} 
              onValueChange={(value) => editable && handleFieldChange(key, value === 'true')}
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

      case 'date':
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
                onChange={(date) => {
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
                      handleFieldChange(key, format(updatedDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
                    } catch {
                      handleFieldChange(key, '');
                    }
                  } else {
                    handleFieldChange(key, '');
                  }
                }}
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
                onChange={(time) => {
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
                      handleFieldChange(key, format(updatedDateTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"));
                    } catch {
                      // Keep current value in case of error
                    }
                  }
                }}
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

      default:
        return (
          <label key={key}>
            <Text as="div" size="2" mb="1" weight="bold" className={cn(!editable && 'text-gray-500')}>
              {label}
            </Text>
            <TextField.Root
              value={String(currentValue || '')}
              onChange={(e) => editable && handleFieldChange(key, e.target.value)}
              placeholder={editable ? `Enter ${label.toLowerCase()}` : 'Read only'}
              disabled={!editable}
              className={cn(!editable && 'opacity-60')}
            />
          </label>
        );
    }
  }, [formData, row, getNestedValue, handleFieldChange]);

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogTitle className='invisible'>Edit Row</DialogTitle>
      <Content maxWidth="500px">
        <Flex direction="column" gap="3">
          {fields.map((field) => renderField(field))}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Close>
            <Button className='hover:cursor-pointer' variant="soft" color="gray">
              Cancel
            </Button>
          </Close>
          <Button className='hover:cursor-pointer' onClick={handleSave}>
            Save Changes
          </Button>
        </Flex>
      </Content>
    </DialogRoot>
  );
});

EditRowDialog.displayName = 'EditRowDialog';

export default EditRowDialog; 