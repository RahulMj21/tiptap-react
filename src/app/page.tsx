"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/Tiptap";

const FormSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "This is not long enough.")
        .max(50, "This is too long."),
    price: z
        .string()
        .min(1, "This is a required field.")
        .refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "This is a required field",
        }),
    description: z
        .string()
        .min(5, "This is not long enough.")
        .max(500, "This is too long.")
        .trim(),
});
type TFormInputType = z.infer<typeof FormSchema>;

export default function Home() {
    const form = useForm<TFormInputType>({
        mode: "onChange",
        defaultValues: {
            title: "",
            price: "0",
            description: "",
        },
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<TFormInputType> = (values) => {
        console.log("values :", values);
        form.reset();
    };

    return (
        <main className="py-24">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-[30rem] max-w-[90%] mx-auto flex flex-col gap-6"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Add a title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Price"
                                        type="number"
                                        min={0}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Tiptap
                                        description=""
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="mt-4">
                        Submit
                    </Button>
                </form>
            </Form>
        </main>
    );
}
