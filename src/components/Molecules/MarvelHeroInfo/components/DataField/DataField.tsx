import { BasicInput, DataView } from 'src/components/Atoms';

import type { DataFieldProps } from './DataFieldProps';

export const DataField = ({
  isEditable = true,
  isLoading,
  label,
  value,
}: DataFieldProps) => {

  if (!isEditable) {
    return (
      <DataView
        isLoading={isLoading}
        label={label}
        value={value || '-'}
      />
    );
  }

  return (
    <BasicInput
      isLoading={isLoading}
      label={label}
      value={value}
    />
  );
};
