"use client";
import React from "react";

function Input({
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  required
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Input;

export interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  placeholder: string;
    required?: boolean;
}
