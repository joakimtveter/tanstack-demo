import { useAddProduct } from "#/api/useApi";
import { Button } from "#/components/ui/button";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/products/add")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Add Product mutation example | Tanstack Query Demo" }],
  }),
});

const addProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

function RouteComponent() {
  const { mutate } = useAddProduct();

  const form = useForm({
    defaultValues: { title: "" },
    validators: {
      onSubmit: addProductSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value.title);
    },
  });

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1 className="text-4xl font-bold mb-6">Add product</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4 max-w-md"
      >
        <form.Field name="title">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Product title"
              />
              {field.state.meta.errors.length > 0 && (
                <FieldError>
                  {field.state.meta.errors.map((e) => e?.message).join(", ")}
                </FieldError>
              )}
            </Field>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              Create Product
            </Button>
          )}
        </form.Subscribe>
      </form>
    </main>
  );
}
