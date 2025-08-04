import React, { FC, useState, useMemo, useCallback, memo } from 'react';
import { Dialog, Button, Flex } from '@radix-ui/themes';
import { parseTableHeader } from '@/src/components/shared/lib/utils';
import EditableField from './EditableField';

interface EditRowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  row: Record<string, unknown>;
  onSave: (updatedRow: Record<string, unknown>) => void;
}

const { Root: DialogRoot, Title: DialogTitle, Content, Close } = Dialog;

const EditRowDialog: FC<EditRowDialogProps> = memo(
  ({ isOpen, onClose, row, onSave }) => {
    const [formData, setFormData] = useState(row);

    const flattenObject = useCallback(
      (
        obj: Record<string, unknown>,
        prefix = ''
      ): Array<{ key: string; value: unknown; label: string }> => {
        try {
          const fields: Array<{ key: string; value: unknown; label: string }> =
            [];

          Object.keys(obj).forEach((key) => {
            try {
              if (key === 'id') return; // Skip id field

              const fullKey = prefix ? `${prefix}.${key}` : key;
              const value = obj[key];

              if (
                value &&
                typeof value === 'object' &&
                !Array.isArray(value) &&
                !(value instanceof Date)
              ) {
                // Recursively process nested objects
                fields.push(
                  ...flattenObject(value as Record<string, unknown>, fullKey)
                );
              } else {
                // Use only the last part of the key for the label
                const label = parseTableHeader(key);
                fields.push({ key: fullKey, value, label });
              }
            } catch (error) {
              console.error(error, { key, prefix });
            }
          });

          return fields;
        } catch (error) {
          console.error(error, { obj, prefix });
          return [];
        }
      },
      []
    );

    // Get flat list of fields
    const fields = useMemo(() => {
      try {
        return flattenObject(row);
      } catch (error) {
        console.error(error, {
          row,
        });
        return [];
      }
    }, [row, flattenObject]);

    // Function to get value by path
    const getNestedValue = useCallback(
      (obj: Record<string, unknown>, path: string): unknown => {
        return path.split('.').reduce((current: unknown, key: string) => {
          return current && typeof current === 'object' && current !== null
            ? (current as Record<string, unknown>)[key]
            : undefined;
        }, obj as unknown);
      },
      []
    );

    // Function to set value by path
    const setNestedValue = useCallback(
      (
        obj: Record<string, unknown>,
        path: string,
        value: unknown
      ): Record<string, unknown> => {
        const keys = path.split('.');
        const result = { ...obj };
        let current: Record<string, unknown> = result;

        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
          } else {
            current[key] = { ...(current[key] as Record<string, unknown>) };
          }
          current = current[key] as Record<string, unknown>;
        }

        current[keys[keys.length - 1]] = value;
        return result;
      },
      []
    );

    const handleFieldChange = useCallback(
      (key: string, value: unknown) => {
        setFormData((prev) => setNestedValue(prev, key, value));
      },
      [setNestedValue]
    );

    const handleSave = useCallback(() => {
      onSave(formData);
      onClose();
    }, [formData, onSave, onClose]);

    return (
      <DialogRoot open={isOpen} onOpenChange={onClose}>
        <DialogTitle className="invisible">Edit Row</DialogTitle>
        <Content maxWidth="500px">
          <Flex direction="column" gap="3">
            {fields.map((field) => (
              <EditableField
                key={field.key}
                field={field}
                currentValue={getNestedValue(formData, field.key)}
                row={row}
                onChange={handleFieldChange}
              />
            ))}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Close>
              <Button
                className="hover:cursor-pointer"
                variant="soft"
                color="gray"
              >
                Cancel
              </Button>
            </Close>
            <Button className="hover:cursor-pointer" onClick={handleSave}>
              Save Changes
            </Button>
          </Flex>
        </Content>
      </DialogRoot>
    );
  }
);

EditRowDialog.displayName = 'EditRowDialog';

export default EditRowDialog;
