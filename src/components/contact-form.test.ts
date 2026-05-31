import { readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { getSubmitCursorClass, isContactFormComplete } from "./contact-form";

function makeFormData(fields: Record<string, string>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }

  return formData;
}

const completeFields = {
  name: "Anula Bacalso",
  email: "anula@example.com",
  projectType: "Business website",
  message: "I need a polished website for my services.",
};

describe("isContactFormComplete", () => {
  it("returns false until every visible contact field has content", () => {
    expect(
      isContactFormComplete(makeFormData({ ...completeFields, message: "" })),
    ).toBe(false);

    expect(
      isContactFormComplete(makeFormData({ ...completeFields, email: "   " })),
    ).toBe(false);
  });

  it("returns true when every visible contact field has content", () => {
    expect(isContactFormComplete(makeFormData(completeFields))).toBe(true);
  });
});

describe("getSubmitCursorClass", () => {
  it("returns pointer only when the form is complete and not pending", () => {
    expect(
      getSubmitCursorClass({ isComplete: false, pending: false }),
    ).toBe("cursor-default");
    expect(getSubmitCursorClass({ isComplete: true, pending: true })).toBe(
      "cursor-default",
    );
    expect(getSubmitCursorClass({ isComplete: true, pending: false })).toBe(
      "cursor-pointer",
    );
  });
});

describe("submit button completion refresh handlers", () => {
  it("do not forward React event objects as form elements", () => {
    expectRefreshCompletionWrapper("onFocus");
    expectRefreshCompletionWrapper("onPointerEnter");
  });
});

function expectRefreshCompletionWrapper(attributeName: string) {
  const { attribute, sourceFile } = getButtonAttribute(attributeName);

  if (
    !attribute?.initializer ||
    !ts.isJsxExpression(attribute.initializer) ||
    !attribute.initializer.expression ||
    !ts.isArrowFunction(attribute.initializer.expression)
  ) {
    throw new Error(`${attributeName} must wrap refreshCompletion in an arrow`);
  }

  const handlerBody = attribute.initializer.expression.body;

  if (!ts.isCallExpression(handlerBody)) {
    throw new Error(`${attributeName} must call refreshCompletion directly`);
  }

  expect(handlerBody.expression.getText(sourceFile)).toBe("refreshCompletion");
  expect(handlerBody.arguments).toHaveLength(0);
}

function getButtonAttribute(attributeName: string) {
  const sourceFile = ts.createSourceFile(
    "contact-form.tsx",
    readFileSync(
      path.join(process.cwd(), "src", "components", "contact-form.tsx"),
      "utf8",
    ),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let button: ts.JsxOpeningLikeElement | undefined;

  function visit(node: ts.Node) {
    if (
      !button &&
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      node.tagName.getText(sourceFile) === "button"
    ) {
      button = node;
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  const attribute = button?.attributes.properties.find(
    (property): property is ts.JsxAttribute =>
      ts.isJsxAttribute(property) && property.name.text === attributeName,
  );

  return { attribute, sourceFile };
}
