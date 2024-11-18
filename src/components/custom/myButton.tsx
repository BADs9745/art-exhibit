import { Button } from "@nextui-org/button";
import { extendVariants } from "@nextui-org/system";
export const MyButton = extendVariants(Button, {
	variants: {
		color: {
			space1: "bg-space-1",
			space2: "bg-space-2",
			space3: "bg-space-3",
			space4: "bg-space-4",
		},
	},
});
