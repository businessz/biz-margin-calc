import React from 'react';

interface InputFieldProps {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
}) => {
  return (
    <div className="space-y-3">
      <label htmlFor={name} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-[#00C16A] focus:border-[#00C16A] text-lg transition-colors"
          placeholder={placeholder}
          min={type === 'number' ? "0" : undefined}
        />
      </div>
    </div>
  );
};

export default InputField;