"use client";

import { useActionState, useCallback, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Send } from "lucide-react";
import type { ContactActionState } from "@/lib/contact";

type ContactFormProps = {
  action: (
    previousState: ContactActionState,
    formData: FormData,
  ) => Promise<ContactActionState>;
};

type RefreshCompletion = (form?: HTMLFormElement | null) => void;

const initialState: ContactActionState = {
  status: "idle",
  message: "",
};

const projectTypes = [
  "Business website",
  "Portfolio website",
  "Website refresh",
  "Landing page",
  "Not sure yet",
];

const requiredContactFields = ["name", "email", "projectType", "message"];

export function isContactFormComplete(formData: FormData) {
  return requiredContactFields.every((fieldName) => {
    const value = formData.get(fieldName);

    return typeof value === "string" && value.trim().length > 0;
  });
}

export function getSubmitCursorClass({
  isComplete,
  pending,
}: {
  isComplete: boolean;
  pending: boolean;
}) {
  return isComplete && !pending ? "cursor-pointer" : "cursor-default";
}

export function ContactForm({ action }: ContactFormProps) {
  const [state, formAction] = useActionState(action, initialState);
  const [isComplete, setIsComplete] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const refreshCompletion = useCallback<RefreshCompletion>(
    (form: HTMLFormElement | null = formRef.current) => {
      if (!form) {
        return;
      }

      setIsComplete(isContactFormComplete(new FormData(form)));
    },
    [],
  );

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-5"
      noValidate
      onInput={(event) => {
        refreshCompletion(event.currentTarget);
      }}
      onChange={(event) => {
        refreshCompletion(event.currentTarget);
      }}
    >
      <input
        className="hidden"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          placeholder="Your name"
          error={state.fieldErrors?.name?.[0]}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          error={state.fieldErrors?.email?.[0]}
        />
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-stone-200">
          Project type
        </span>
        <select
          name="projectType"
          defaultValue=""
          aria-invalid={Boolean(state.fieldErrors?.projectType?.[0])}
          className="h-12 w-full rounded-md border border-white/12 bg-white/[0.06] px-4 text-sm text-stone-100 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-300/25"
        >
          <option value="" disabled className="bg-zinc-950 text-stone-200">
            Choose one
          </option>
          {projectTypes.map((projectType) => (
            <option
              key={projectType}
              value={projectType}
              className="bg-zinc-950 text-stone-100"
            >
              {projectType}
            </option>
          ))}
        </select>
        <FieldError message={state.fieldErrors?.projectType?.[0]} />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-stone-200">
          Project details
        </span>
        <textarea
          name="message"
          rows={6}
          placeholder="Tell me what you want to build, who it is for, and what would make it successful."
          aria-invalid={Boolean(state.fieldErrors?.message?.[0])}
          className="w-full resize-y rounded-md border border-white/12 bg-white/[0.06] px-4 py-3 text-sm leading-6 text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/25"
        />
        <FieldError message={state.fieldErrors?.message?.[0]} />
      </label>

      <SubmitButton
        isComplete={isComplete}
        refreshCompletion={refreshCompletion}
      />

      {state.message ? (
        <p
          className={`rounded-md border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-teal-300/35 bg-teal-300/10 text-teal-100"
              : "border-amber-300/35 bg-amber-300/10 text-amber-100"
          }`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
};

function Field({ label, name, placeholder, type = "text", error }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-stone-200">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className="h-12 w-full rounded-md border border-white/12 bg-white/[0.06] px-4 text-sm text-stone-100 outline-none transition placeholder:text-stone-500 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/25"
      />
      <FieldError message={error} />
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <span className="mt-2 block text-sm text-amber-200">{message}</span>;
}

function SubmitButton({
  isComplete,
  refreshCompletion,
}: {
  isComplete: boolean;
  refreshCompletion: RefreshCompletion;
}) {
  const { pending } = useFormStatus();
  const cursorClass = getSubmitCursorClass({ isComplete, pending });

  return (
    <button
      type="submit"
      disabled={pending}
      onFocus={() => refreshCompletion()}
      onPointerEnter={() => refreshCompletion()}
      className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-teal-300 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:bg-stone-500 sm:w-auto ${cursorClass}`}
    >
      <Send aria-hidden="true" size={17} />
      {pending ? "Sending..." : "Send inquiry"}
    </button>
  );
}
