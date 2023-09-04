import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { cx } from "class-variance-authority";

const RadioItem = ({
  value,
  subtitle,
  heading,

  ...props
}: {
  value: string;
  subtitle?: string;
  heading: string;
}) => {
  return (
    <RadioGroup.Item
      value={value}
      className="rounded-[10px] p-4 h-full text-cherry font-semibold data-[state='checked']:bg-cherry w-full data-[state='unchecked']:bg-cherry/50 transition data-[state='checked']:text-cream group hover:data-[state='unchecked']:bg-cherry hover:data-[state='unchecked']:text-cream focus:ring-2 focus:ring-cherry/50 focus:ring-offset-2 focus:ring-offset-cherry/50  focus:outline-none"
      {...props}
      // type="submit"
    >
      <div className={cx(subtitle && "max-w-[16ch]", "max-w-[22ch] mx-auto")}>
        <div className={cx(subtitle && "uppercase text-2xl")}>{heading}</div>
        {subtitle && (
          <span className="text-cherry/60 group-data-[state='checked']:text-cream/50 group-hover:group-data-[state='unchecked']:text-cream/50 leading-tight block">
            {subtitle}
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
  options: { text: string; score: number; subtitle: string }[];
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
                        <RadioItem
                          value={option.text}
                          subtitle={option.subtitle}
                          heading={option.text}
                        />
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
