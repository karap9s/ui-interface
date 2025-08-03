const BLOCKED_FIELDS_FOR_INACTIVE = ['name', 'title', 'description'];

export function isFieldEditable(fieldKey: string, row: Record<string, unknown>): boolean {
  if (fieldKey === 'id') {
    return false;
  }
  
  if (row.active === false) {
    const fieldName = fieldKey.split('.').pop()?.toLowerCase() || '';
    
   return !BLOCKED_FIELDS_FOR_INACTIVE.some(blockedField => 
      fieldName.startsWith(blockedField.toLowerCase())
    );
  }
  
  return true;
}
