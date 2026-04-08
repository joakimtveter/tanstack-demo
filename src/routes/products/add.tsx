import { useAddProduct } from "#/api/useApi";
import { Button } from "#/components/ui/button";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { addProductSchema } from "#/schemas/product.schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/add")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Add Product mutation example | Tanstack Query Demo" }],
  }),
});

function RouteComponent() {
  const { mutate } = useAddProduct();

  const form = useForm({
    defaultValues: { title: "", description: "", price: 0 },
    validators: {
      onSubmit: addProductSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value, {
        onSuccess: (data) => {
          form.reset();
          alert(JSON.stringify(data, null, 2));
        },
      });
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
                <FieldError>{field.state.meta.errors.map((e) => e?.message).join(", ")}</FieldError>
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>
              <Textarea
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Product description"
              />
              {field.state.meta.errors.length > 0 && (
                <FieldError>{field.state.meta.errors.map((e) => e?.message).join(", ")}</FieldError>
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="price">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Price</FieldLabel>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id={field.name}
                  type="number"
                  step="0.01"
                  min="0"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(Math.round(e.target.valueAsNumber * 100) / 100)
                  }
                  onBlur={field.handleBlur}
                  placeholder="0.00"
                  className="pl-7"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <FieldError>{field.state.meta.errors.map((e) => e?.message).join(", ")}</FieldError>
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
