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
  subtitle,
  children,
  ...props
}: {
  value: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <RadioGroup.Item
      value={value}
      className="rounded-[10px] p-4 h-full text-cherry font-semibold data-[state='checked']:bg-cherry w-full data-[state='unchecked']:bg-cherry/50 transition data-[state='checked']:text-cream group hover:data-[state='unchecked']:bg-cherry hover:data-[state='unchecked']:text-cream focus:ring-2 focus:ring-cherry/50 focus:ring-offset-2 focus:ring-offset-cherry/50  focus:outline-none"
      {...props}
      // type="submit"
    >
      <div className="max-w-[16ch] mx-auto">
        <div className="uppercase text-2xl">Rapidly</div>
        {subtitle && (
          <span className="text-cherry/60 group-data-[state='checked']:text-cream/50 group-hover:group-data-[state='unchecked']:text-cream/50 leading-tight block">
            It&apos;s going faster than I&apos;d like it to.
          </span>
        )}
      </div>
      {/* {children} */}
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
                className="grid grid-cols-2 gap-2 h-full"
                onValueChange={field.onChange}
                value={field.value}
              >
                {options.map((option) => {
                  return (
                    <FormItem key={option.text}>
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
