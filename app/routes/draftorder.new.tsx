
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigation,
} from "@remix-run/react";

import TableTanstack from "~/components/orderTable";

export async function action({
  request,
}: ActionFunctionArgs) {
  const formData = await request.formData();

  console.log(formData);

  return redirect(`/order/1`);
  
  /*
  const errors = await validateErrors(formData);
  const draftOrder = await postDraftOrder(formData);

  if (errors) {
    return json({ errors });
  }

  return redirect(`/order/${draftOrder.id}`);
  */
}

export default function NewOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === "/order/1";

  return (
    <>
    <TableTanstack />

    <Form method="post">
      <button type="submit">
        {isSubmitting ? "Saving..." : "Create Order"}
      </button>
    </Form>
    </>
  );
}
