import { InputHTMLAttributes } from "react";
import { Input } from "./input";
import { Label } from "./label";

interface FormInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
}

export const CustomFormInput = ({ label, icon, ...props }: FormInput) => {
  return (
    <div>
      <Label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </Label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          {icon}
        </span>
        <Input
          name={label}
          className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...props}
        />
      </div>
    </div>
  );
};
