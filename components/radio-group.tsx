import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";

const RadioItem = ({
  value,
  children,
  ...props
}: {
  value: string;
  children: React.ReactNode;
}) => {
  return (
    <RadioGroup.Item
      value={value}
      {...props}
      className="bg-blue-600 p-4 rounded-md shadow font-medium data-[state='checked']:bg-indigo-900 transition"
    >
      {children}
    </RadioGroup.Item>
  );
};

export const FormRadio = ({
  form,
  name,
  label,
  options,
}: {
  form: any;
  name: string;
  label: string;
  options: { text: string; score: number }[];
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <RadioGroup.Root
                className="flex flex-wrap w-full gap-4"
                onValueChange={field.onChange}
                value={field.value}
              >
                {options.map((option) => {
                  return (
                    <FormItem className="w-full" key={option.text}>
                      <FormControl>
                        <RadioItem value={option.text}>{option.text}</RadioItem>
                      </FormControl>
                    </FormItem>
                  );
                })}
              </RadioGroup.Root>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export { RadioItem };
