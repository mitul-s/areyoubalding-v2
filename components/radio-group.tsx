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
      className="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
      value={value}
      {...props}
    >
      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
      <label className="text-white text-[15px] leading-none pl-[15px]">
        {children}
      </label>
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
                className="flex w-full gap-x-4"
                onValueChange={field.onChange}
                value={field.value}
              >
                {options.map((option, index) => {
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
