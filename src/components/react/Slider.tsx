import { cn } from "@/lib/utils/cn";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

interface SliderProps {
  rangeClassName?: string;
  thumbClassName?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & SliderProps
>(({ className, rangeClassName, thumbClassName, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("group relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-gray-400">
      <SliderPrimitive.Range
        className={cn(
          "group-hover absolute h-full bg-white transition-colors duration-300 group-hover:bg-green-400",
          rangeClassName
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "focus-visible:ring-ring block h-3 w-3 rounded-full border bg-white opacity-0 shadow transition-opacity duration-[5000ms]",
        "ease-out focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 group-hover:opacity-100",
        thumbClassName
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
